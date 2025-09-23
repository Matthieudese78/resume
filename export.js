// export.js - Puppeteer PDF export with A4 scaling
const puppeteer = require("puppeteer");
const path = require("path");

const INPUT_HTML = process.argv[2] || "CV_Serre.html";
const OUTPUT_PDF = process.argv[3] || INPUT_HTML.replace(/\.html?$/i, ".pdf");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const filePath = `file:${path.join(__dirname, INPUT_HTML)}`;
  await page.goto(filePath, { waitUntil: "networkidle0" });

  // Set viewport to A4 width (approx. 794px wide at 96dpi) and automatic height
  // await page.setViewport({ width: 794, height: 1123 });

  await page.pdf({
    path: OUTPUT_PDF,
    format: "A4",
    printBackground: true,
    scale: 0.85, // Scale to fit A4 better
    margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' },
  });

  await browser.close();
  console.log("PDF saved as ${OUTPUT_PDF} (from ${INPUT_HTML})");
})();

