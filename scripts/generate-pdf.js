import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, rgb } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function createWeddingPdf() {
  const imagePath = path.join(rootDir, 'src', 'assets', 'invitation-reference.png');
  const imageBytes = fs.readFileSync(imagePath);

  const pdfDoc = await PDFDocument.create();
  pdfDoc.setTitle('Wedding Invitation — Alshifa & Mo. Zaid');
  pdfDoc.setAuthor('Alshifa & Mo. Zaid');
  pdfDoc.setSubject('Wedding Invitation');
  pdfDoc.setKeywords(['wedding', 'invitation', 'Alshifa', 'Mo. Zaid']);

  const pngImage = await pdfDoc.embedPng(imageBytes);
  const { width, height } = pngImage.scale(1);

  // Card dimensions
  const cardWidth = 1000;
  const cardHeight = 1000;
  const bottomBarHeight = 110;
  const pageWidth = cardWidth;
  const pageHeight = cardHeight + bottomBarHeight;

  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  // Dark emerald background
  page.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: rgb(3 / 255, 30 / 255, 25 / 255),
  });

  // Draw the wedding card image
  page.drawImage(pngImage, {
    x: 0,
    y: bottomBarHeight,
    width: cardWidth,
    height: cardHeight,
  });

  // Draw bottom bar background
  page.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: bottomBarHeight,
    color: rgb(6 / 255, 44 / 255, 35 / 255),
  });

  // Gold top line on bottom bar
  page.drawLine({
    start: { x: 0, y: bottomBarHeight },
    end: { x: pageWidth, y: bottomBarHeight },
    thickness: 2,
    color: rgb(212 / 255, 173 / 255, 90 / 255),
  });

  // Gold button pill
  const btnWidth = 520;
  const btnHeight = 56;
  const btnX = (pageWidth - btnWidth) / 2;
  const btnY = (bottomBarHeight - btnHeight) / 2;

  page.drawRectangle({
    x: btnX,
    y: btnY,
    width: btnWidth,
    height: btnHeight,
    color: rgb(212 / 255, 173 / 255, 90 / 255),
    borderColor: rgb(247 / 255, 235 / 255, 201 / 255),
    borderWidth: 2,
  });

  // Text inside button
  const webUrl = 'https://mustajabshaikh.github.io/wedding-invitation/';
  page.drawText('TAP TO OPEN INTERACTIVE INVITATION', {
    x: btnX + 50,
    y: btnY + 20,
    size: 20,
    color: rgb(18 / 255, 58 / 255, 44 / 255),
  });

  // Add clickable web link annotation across the button and bottom area
  const linkAnnotation = pdfDoc.context.obj({
    Type: 'Annot',
    Subtype: 'Link',
    Rect: [btnX, btnY, btnX + btnWidth, btnY + btnHeight],
    Border: [0, 0, 0],
    A: {
      Type: 'Action',
      S: 'URI',
      URI: pdfDoc.context.obj(webUrl),
    },
  });

  const annots = page.node.Annots() || pdfDoc.context.obj([]);
  annots.push(linkAnnotation);
  page.node.set(pdfDoc.context.obj('Annots'), annots);

  // Also create a pure square version (just the card)
  const pureDoc = await PDFDocument.create();
  pureDoc.setTitle('Wedding Invitation — Alshifa & Mo. Zaid');
  const purePng = await pureDoc.embedPng(imageBytes);
  const purePage = pureDoc.addPage([cardWidth, cardHeight]);
  purePage.drawImage(purePng, {
    x: 0,
    y: 0,
    width: cardWidth,
    height: cardHeight,
  });

  // Save both
  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const interactivePdfBytes = await pdfDoc.save();
  const purePdfBytes = await pureDoc.save();

  const interactivePath = path.join(publicDir, 'wedding-invitation.pdf');
  const rootInteractivePath = path.join(rootDir, 'Alshifa-and-Mo-Zaid-Wedding-Invitation.pdf');
  const cardOnlyPath = path.join(rootDir, 'Alshifa-and-Mo-Zaid-Wedding-Invitation-CardOnly.pdf');

  fs.writeFileSync(interactivePath, interactivePdfBytes);
  fs.writeFileSync(rootInteractivePath, interactivePdfBytes);
  fs.writeFileSync(cardOnlyPath, purePdfBytes);

  console.log('PDFs successfully generated:');
  console.log(' - ' + interactivePath);
  console.log(' - ' + rootInteractivePath);
  console.log(' - ' + cardOnlyPath);
}

createWeddingPdf().catch(err => {
  console.error('Failed to create PDF:', err);
  process.exit(1);
});
