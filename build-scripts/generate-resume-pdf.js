const fs = require("fs-extra");
const path = require("path");
const MarkdownIt = require("markdown-it");
const puppeteer = require("puppeteer");

// Resume sources → output PDFs.
// The detailed resume keeps generous spacing; the professional (ATS) resume
// uses tighter spacing to stay within 3–4 pages.
const RESUMES = [
  {
    input: "../resume/resume.md",
    output: "../public/resume-detailed.pdf",
    padding: "40px",
    lineHeight: 1.6,
    fontSize: "14px",
  },
  {
    input: "../resume/resume-professional.md",
    output: "../public/resume-professional.pdf",
    padding: "28px",
    lineHeight: 1.35,
    fontSize: "12px",
  },
];

// public/resume.pdf is kept as an alias of the detailed resume so existing
// links (Hero, README, old shares) keep working.
const ALIAS = { from: "../public/resume-detailed.pdf", to: "../public/resume.pdf" };

function buildHTML(markdownHtml, opts) {
  return `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, Helvetica, sans-serif;
          padding: ${opts.padding};
          line-height: ${opts.lineHeight};
          font-size: ${opts.fontSize};
          color: #1a1a1a;
        }
        h1 { color: #06b6d4; margin-bottom: 4px; }
        h2 { color: #06b6d4; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-top: 22px; }
        h3 { margin-bottom: 2px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #e2e8f0; padding: 6px 8px; text-align: left; }
        th { background: #f1f5f9; }
        code { background: #f1f5f9; padding: 1px 4px; border-radius: 3px; }
        pre { background: #f8fafc; padding: 10px; border-radius: 6px; overflow-x: auto; }
        ul { margin-top: 4px; }
        li { margin-bottom: 3px; }
        a { color: #0a66c2; text-decoration: none; }
      </style>
    </head>
    <body>${markdownHtml}</body>
  </html>
  `;
}

async function generatePDF(browser, md, cfg) {
  const inputPath = path.join(__dirname, cfg.input);
  const outputPath = path.join(__dirname, cfg.output);

  const markdown = fs.readFileSync(inputPath, "utf-8");
  const html = buildHTML(md.render(markdown), cfg);

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  await fs.ensureDir(path.dirname(outputPath));
  await page.pdf({ path: outputPath, format: "A4", printBackground: true });
  await page.close();

  console.log("✅ PDF generated at:", outputPath);
}

async function main() {
  const md = new MarkdownIt();
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const cfg of RESUMES) {
    await generatePDF(browser, md, cfg);
  }

  await browser.close();

  // Alias: public/resume.pdf → detailed resume
  await fs.copy(
    path.join(__dirname, ALIAS.from),
    path.join(__dirname, ALIAS.to)
  );
  console.log("✅ Alias created:", path.join(__dirname, ALIAS.to));
}

main().catch((err) => {
  console.error("❌ Resume PDF generation failed:", err);
  process.exit(1);
});
