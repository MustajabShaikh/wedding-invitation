import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, rgb } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function createInteractiveWeddingPdf() {
  const cardPath = path.join(rootDir, 'src', 'assets', 'invitation-reference.png');
  const doorPath = path.join(rootDir, 'src', 'assets', 'door-screen.png');

  const cardBytes = fs.readFileSync(cardPath);
  const doorBytes = fs.readFileSync(doorPath);

  const pdfDoc = await PDFDocument.create();
  pdfDoc.setTitle('Wedding Invitation — Alshifa & Mo. Zaid');
  pdfDoc.setAuthor('Alshifa & Mo. Zaid');
  pdfDoc.setSubject('Wedding Invitation');

  const cardPng = await pdfDoc.embedPng(cardBytes);
  const doorPng = await pdfDoc.embedPng(doorBytes);

  // Both pages have consistent dimensions: 1000 x 1200
  const pageWidth = 1000;
  const pageHeight = 1200;

  // ==================== PAGE 1: THE DOORS ====================
  const page1 = pdfDoc.addPage([pageWidth, pageHeight]);

  // Dark emerald background
  page1.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: rgb(3 / 255, 30 / 255, 25 / 255),
  });

  // Outer gold border
  page1.drawRectangle({
    x: 20,
    y: 20,
    width: pageWidth - 40,
    height: pageHeight - 40,
    borderColor: rgb(196 / 255, 155 / 255, 79 / 255),
    borderWidth: 2,
  });

  // Inner gold border
  page1.drawRectangle({
    x: 26,
    y: 26,
    width: pageWidth - 52,
    height: pageHeight - 52,
    borderColor: rgb(139 / 255, 106 / 255, 46 / 255),
    borderWidth: 1,
  });

  // Draw Door Screen image (fit centered nicely)
  // doorPng is 1554 x 837
  const doorAspect = doorPng.width / doorPng.height;
  const doorDrawWidth = 920;
  const doorDrawHeight = doorDrawWidth / doorAspect; // ~495
  const doorX = (pageWidth - doorDrawWidth) / 2;
  const doorY = (pageHeight - doorDrawHeight) / 2 - 20;

  page1.drawImage(doorPng, {
    x: doorX,
    y: doorY,
    width: doorDrawWidth,
    height: doorDrawHeight,
  });

  // Call to action button at the bottom of Page 1
  const ctaW = 540;
  const ctaH = 65;
  const ctaX = (pageWidth - ctaW) / 2;
  const ctaY = 90;

  page1.drawRectangle({
    x: ctaX,
    y: ctaY,
    width: ctaW,
    height: ctaH,
    color: rgb(212 / 255, 173 / 255, 90 / 255),
    borderColor: rgb(247 / 255, 235 / 255, 201 / 255),
    borderWidth: 2,
  });

  page1.drawText('CLICK THE DOORS TO OPEN INVITATION', {
    x: ctaX + 45,
    y: ctaY + 24,
    size: 20,
    color: rgb(18 / 255, 58 / 255, 44 / 255),
  });

  // ==================== PAGE 2: THE INVITATION CARD ====================
  const page2 = pdfDoc.addPage([pageWidth, pageHeight]);

  // Dark emerald background
  page2.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: rgb(3 / 255, 30 / 255, 25 / 255),
  });

  // Outer gold border
  page2.drawRectangle({
    x: 20,
    y: 20,
    width: pageWidth - 40,
    height: pageHeight - 40,
    borderColor: rgb(196 / 255, 155 / 255, 79 / 255),
    borderWidth: 2,
  });

  // Draw Card Image (centered, square 960x960)
  const cardSize = 980;
  const cardX = (pageWidth - cardSize) / 2;
  const cardY = 120; // leaves space for bottom bar

  page2.drawImage(cardPng, {
    x: cardX,
    y: cardY,
    width: cardSize,
    height: cardSize,
  });

  // Bottom action bar on Page 2
  const p2BtnW = 420;
  const p2BtnH = 50;
  const p2BtnY = 40;

  // Button 1: Close / Replay doors (jumps back to Page 1)
  const p2Btn1X = 60;
  page2.drawRectangle({
    x: p2Btn1X,
    y: p2BtnY,
    width: p2BtnW,
    height: p2BtnH,
    color: rgb(12 / 255, 56 / 255, 42 / 255),
    borderColor: rgb(196 / 255, 155 / 255, 79 / 255),
    borderWidth: 1.5,
  });
  page2.drawText('CLOSE DOORS / REPLAY', {
    x: p2Btn1X + 105,
    y: p2BtnY + 18,
    size: 16,
    color: rgb(247 / 255, 235 / 255, 201 / 255),
  });

  // Button 2: Online 3D Experience (opens website)
  const p2Btn2X = pageWidth - p2BtnW - 60;
  page2.drawRectangle({
    x: p2Btn2X,
    y: p2BtnY,
    width: p2BtnW,
    height: p2BtnH,
    color: rgb(196 / 255, 155 / 255, 79 / 255),
    borderColor: rgb(247 / 255, 235 / 255, 201 / 255),
    borderWidth: 1.5,
  });
  page2.drawText('OPEN 3D ANIMATION ONLINE', {
    x: p2Btn2X + 85,
    y: p2BtnY + 18,
    size: 15,
    color: rgb(18 / 255, 58 / 255, 44 / 255),
  });

  // ==================== INTERACTIVE LINKS ====================
  // 1. On Page 1: Clicking anywhere on the doors or the CTA jumps to Page 2!
  const page2Ref = page2.ref;
  const page1ToPage2Link = pdfDoc.context.obj({
    Type: 'Annot',
    Subtype: 'Link',
    Rect: [40, 70, pageWidth - 40, pageHeight - 70], // Huge clickable hit area covering the doors & button!
    Border: [0, 0, 0],
    Dest: [page2Ref, 'XYZ', null, null, null],
  });

  const page1Annots = page1.node.Annots() || pdfDoc.context.obj([]);
  page1Annots.push(page1ToPage2Link);
  page1.node.set(pdfDoc.context.obj('Annots'), page1Annots);

  // 2. On Page 2: Button 1 jumps back to Page 1
  const page1Ref = page1.ref;
  const page2ToPage1Link = pdfDoc.context.obj({
    Type: 'Annot',
    Subtype: 'Link',
    Rect: [p2Btn1X, p2BtnY, p2Btn1X + p2BtnW, p2BtnY + p2BtnH],
    Border: [0, 0, 0],
    Dest: [page1Ref, 'XYZ', null, null, null],
  });

  // 3. On Page 2: Button 2 opens website
  const webUrl = 'https://mustajabshaikh.github.io/wedding-invitation/';
  const webLink = pdfDoc.context.obj({
    Type: 'Annot',
    Subtype: 'Link',
    Rect: [p2Btn2X, p2BtnY, p2Btn2X + p2BtnW, p2BtnY + p2BtnH],
    Border: [0, 0, 0],
    A: {
      Type: 'Action',
      S: 'URI',
      URI: pdfDoc.context.obj(webUrl),
    },
  });

  const page2Annots = page2.node.Annots() || pdfDoc.context.obj([]);
  page2Annots.push(page2ToPage1Link);
  page2Annots.push(webLink);
  page2.node.set(pdfDoc.context.obj('Annots'), page2Annots);

  // Save the PDF
  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const pdfBytes = await pdfDoc.save();

  const publicPdf = path.join(publicDir, 'wedding-invitation.pdf');
  const rootPdf = path.join(rootDir, 'Alshifa-and-Mo-Zaid-Wedding-Invitation.pdf');

  fs.writeFileSync(publicPdf, pdfBytes);
  fs.writeFileSync(rootPdf, pdfBytes);

  console.log('Interactive 2-page wedding PDF generated:');
  console.log(' - Page 1: Royal Door View (Clicking opens Page 2)');
  console.log(' - Page 2: Wedding Invitation Card');
  console.log('Saved to:', rootPdf);
}

createInteractiveWeddingPdf().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
