import { createCanvas, loadImage } from 'canvas'

const FRONTEND_URL = useRuntimeConfig().public.FRONTEND_BASE_URL;

// Add background and gradient
const drawBackground = (ctx, canvas) => {
  ctx.fillStyle = '#131313';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, 0, 600);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(1, 'rgba(0, 251, 155, 0.3)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the project name
const drawPageName = (ctx, name) => {
  const maxWidth = 800;
  let fontSize = 90;
  
  // Dynamically reduce font size if text exceeds maxWidth
  do {
    ctx.font = `bold ${fontSize}pt Nunito, sans-serif`;
    if (ctx.measureText(name).width > maxWidth) fontSize -= 5;
  } while (ctx.measureText(name).width > maxWidth && fontSize > 30);

  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(name, 60, 140);
};

// Draw tagline with word wrapping
const drawTagline = (ctx, tagline) => {
  ctx.font = '28pt Nunito, sans-serif';
  ctx.fillStyle = '#FFFFFF';

  const maxWidth = 800;
  const maxLines = 3;
  const lineHeight = 40;
  const words = tagline.split(' ');
  let line = '';
  let lines = [];
  let y = 230;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth && line.length > 0) {
      lines.push(line.trim());
      line = words[i] + ' ';
      if (lines.length === maxLines) break;
    } else {
      line = testLine;
    }
  }

  if (lines.length < maxLines) lines.push(line.trim());

  lines.forEach((line, index) => {
    ctx.fillText(line, 60, y + index * lineHeight);
  });
}

// Draw the site name
const drawSiteName = (ctx, text) => {
  const maxWidth = 800;
  let fontSize = 50;
  
  // Dynamically reduce font size if text exceeds maxWidth
  do {
    ctx.font = `bold ${fontSize}pt Nunito, sans-serif`;
    if (ctx.measureText(text).width > maxWidth) fontSize -= 5;
  } while (ctx.measureText(text).width > maxWidth && fontSize > 30);

  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(text, 60, 540);
};

export default defineEventHandler(async (event) => {
    const pageName = decodeURIComponent(await getRouterParam(event, 'page') ?? 'William278.net');
    const canvas = createCanvas(1200, 600);
    const ctx = canvas.getContext('2d');

    // Draw BG
    drawBackground(ctx, canvas);

    // Load and draw the main site image
    const image = await loadImage(`${FRONTEND_URL}/images/icons/william278.png`);
    ctx.drawImage(image, canvas.width - 250 - 50, 50, 250, 250);
    
    // Draw the capitalized page name, tagline, and site name
    drawPageName(ctx, pageName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()));
    drawTagline(ctx, 'Easily-accessible documentation and information site for all of William278\'s Minecraft plugins, projects & games!');
    drawSiteName(ctx, 'William278.net');

    // Return the image buffer
    return canvas.toBuffer();
  });