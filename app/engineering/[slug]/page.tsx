import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const dynamic = "force-dynamic";

// ✅ IMPORTANT: Next.js 15 compatible typing
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const filePath = path.join(
    process.cwd(),
    "content",
    "case-studies",
    `${slug}.md`
  );

  let content = "";

  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch {
    content = `# Case Study Not Found

This engineering case study does not exist yet.`;
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-4xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-cyan-400">
            Engineering Case Study
          </h1>

          <p className="text-zinc-500 mt-2">
            Deep dive into system design, architecture, and DevOps decisions.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>

      </div>
    </section>
  );
}