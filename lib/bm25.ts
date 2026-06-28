import kb from "./knowledge-base.json";

export interface KBChunk {
  id: string;
  source: string;
  type: string;
  heading: string;
  body: string;
  tags: string[];
  mermaid?: string;
}

const chunks: KBChunk[] = kb.chunks as KBChunk[];

// ── Tokenizer ─────────────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  "a","an","the","is","are","was","were","be","been","being","have","has",
  "had","do","does","did","will","would","could","should","may","might",
  "shall","can","need","dare","ought","used","to","of","in","on","at","by",
  "for","with","about","against","between","into","through","during","before",
  "after","above","below","from","up","down","and","or","not","but","so","if",
  "this","that","these","those","it","its","i","me","my","you","your","he",
  "she","they","we","what","how","when","where","why","which","who","whom",
  "tell","explain","describe","show","me","please","want","know","like","just",
  "use","make","take","give","get","let","see","think","go",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+\-./]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP_WORDS.has(t));
}

// ── BM25 constants ────────────────────────────────────────────────────────────

const K1 = 1.5;
const B  = 0.75;

// ── Build IDF index at module load ────────────────────────────────────────────

function buildIndex() {
  const N = chunks.length;
  const df: Record<string, number> = {};
  const docTokens: string[][] = [];

  for (const chunk of chunks) {
    const text = `${chunk.heading} ${chunk.heading} ${chunk.body} ${chunk.tags.join(" ")}`;
    const tokens = tokenize(text);
    docTokens.push(tokens);
    const seen = new Set<string>();
    for (const t of tokens) {
      if (!seen.has(t)) {
        df[t] = (df[t] ?? 0) + 1;
        seen.add(t);
      }
    }
  }

  const avgdl = docTokens.reduce((s, t) => s + t.length, 0) / N;

  const idf: Record<string, number> = {};
  for (const [term, freq] of Object.entries(df)) {
    idf[term] = Math.log((N - freq + 0.5) / (freq + 0.5) + 1);
  }

  return { docTokens, avgdl, idf };
}

const { docTokens, avgdl, idf } = buildIndex();

// ── Search ────────────────────────────────────────────────────────────────────

export interface SearchResult {
  chunk: KBChunk;
  score: number;
}

export function search(query: string, topK = 5): SearchResult[] {
  const qTokens = tokenize(query);
  if (qTokens.length === 0) return [];

  const scores: number[] = chunks.map((_, idx) => {
    const tokens = docTokens[idx];
    const dl = tokens.length;
    const norm = 1 - B + B * (dl / avgdl);

    let score = 0;
    for (const qt of qTokens) {
      const termIdf = idf[qt] ?? 0;
      const tf = tokens.filter((t) => t === qt).length;
      score += termIdf * ((tf * (K1 + 1)) / (tf + K1 * norm));
    }

    // Tag boost: exact tag matches add bonus score
    for (const qt of qTokens) {
      if (chunks[idx].tags.some((tag) => tag.includes(qt))) {
        score += 0.5;
      }
    }

    // Type boost: case studies and architecture chunks are especially relevant
    if (chunks[idx].type === "case-study") score += 0.3;
    if (chunks[idx].type === "architecture") score += 0.1;

    return score;
  });

  return scores
    .map((score, idx) => ({ chunk: chunks[idx], score }))
    .filter((r) => r.score > 0.1)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

// ── Semantic fallback: try partial matches on tags if BM25 returns nothing ────

export function searchWithFallback(query: string, topK = 5): SearchResult[] {
  const results = search(query, topK);
  if (results.length > 0) return results;

  // Fuzzy fallback: substring match on any tag or heading word
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter((w) => w.length > 3);
  const fallback: SearchResult[] = [];

  for (const chunk of chunks) {
    const target = `${chunk.heading} ${chunk.tags.join(" ")} ${chunk.body.slice(0, 200)}`.toLowerCase();
    const hits = words.filter((w) => target.includes(w)).length;
    if (hits > 0) {
      fallback.push({ chunk, score: hits * 0.1 });
    }
  }

  return fallback
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

export { chunks };
