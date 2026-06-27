const fs = require("fs-extra");
const path = require("path");
const MarkdownIt = require("markdown-it");
const puppeteer = require("puppeteer");

async function generatePDF() {
  const md = new MarkdownIt();

  const inputPath = path.join(__dirname, "../resume/resume.md");
  const outputPath = path.join(__dirname, "../public/resume.pdf");

  const markdown = fs.readFileSync(inputPath, "utf-8");
  const html = md.render(markdown);

  const fullHTML = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial;
          padding: 40px;
          line-height: 1.6;
        }
        h1, h2 {
          color: #06b6d4;
        }
      </style>
    </head>
    <body>${html}</body>
  </html>
  `;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  
  await page.setContent(fullHTML, {
  waitUntil: "domcontentloaded",
});

  await fs.ensureDir(path.dirname(outputPath));

  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  console.log("✅ PDF generated at:", outputPath);
}

generatePDF();