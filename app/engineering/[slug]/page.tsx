import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Page({
  params,
}: {
  params: { slug: string };
}) {
  const filePath = path.join(
    process.cwd(),
    "content/case-studies",
    `${params.slug}.md`
  );

  let content = "";

  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    content = "# Case Study Not Found\n\nThis engineering case study does not exist yet.";
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-cyan-400">
            Engineering Case Study
          </h1>
          <p className="text-zinc-500 mt-2">
            Deep dive into system design, architecture, and DevOps decisions.
          </p>
        </div>

        {/* Markdown Renderer */}
        <div className="prose prose-invert max-w-none prose-headings:text-cyan-400 prose-a:text-cyan-500">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>

      </div>
    </section>
  );
}