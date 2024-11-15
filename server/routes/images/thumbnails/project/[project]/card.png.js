import { setResponseHeader } from 'h3'
import { registerFont, createCanvas, loadImage } from 'canvas'

const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
const FRONTEND_URL = useRuntimeConfig().public.FRONTEND_BASE_URL;

const fetchProject = async (slug) => await $fetch(`${BASE_URL}/v1/projects/${slug}`)

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
const drawProjectName = (ctx, project) => {
  const maxWidth = 800;
  let fontSize = 90;
  let projectName = project.metadata?.name ?? project.slug;
  
  // Dynamically reduce font size if text exceeds maxWidth
  do {
    ctx.font = `${fontSize}pt NunitoBold, sans-serif`;
    if (ctx.measureText(projectName).width > maxWidth) fontSize -= 5;
  } while (ctx.measureText(projectName).width > maxWidth && fontSize > 30);

  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(projectName, 60, 140);
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

// Helper function to draw stats
const drawStat = async (ctx, number, glyph, x, y) => {
  // Format the number in thousands (k) or millions (m)
  let formattedNumber;
  if (number >= 1e6) {
    formattedNumber = (number / 1e6).toFixed(3).replace(/\.?0+$/, '') + 'm';
  } else if (number >= 1e3) {
    formattedNumber = (number / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
  } else {
    formattedNumber = number.toFixed(1).replace(/\.0$/, '');
  }

  // Load the glyph image
  const image = await loadImage(`${FRONTEND_URL}/images/glyphs/${glyph}.svg`);
  const imageSize = 80;
  ctx.drawImage(image, x, y, imageSize, imageSize);

  // Set the font and draw the number (30px to the right of the image)
  ctx.font = '50pt NunitoBold, monospace';
  ctx.fillStyle = '#FFFFFF';
  const numberX = x + imageSize + 20;
  ctx.fillText(formattedNumber, numberX, y + imageSize - 15); // Adjusted for baseline alignment

  // Return the total width of the drawn stat
  const totalWidth = imageSize + 30 + ctx.measureText(formattedNumber).width;
  return totalWidth;
};

// 404 not found
const notFound = (event) => {
  setResponseStatus(event, 404);
  return "Not found";
}

export default defineEventHandler(async (event) => {
  // Set content-type
  setResponseHeader(event, 'Content-Type', 'image/png');

  const project = await fetchProject(getRouterParam(event, 'project'));
  if (!project || project.metadata.hidden) return notFound();

  registerFont('server/routes/images/thumbnails/font/regular.ttf', { family: 'Nunito' });
  registerFont('server/routes/images/thumbnails/font/bold.ttf', { family: 'NunitoBold' });
  const canvas = createCanvas(1200, 600);
  const ctx = canvas.getContext('2d');

  drawBackground(ctx, canvas);

  // Load and draw the image
  const icon = project.metadata?.icons['PNG'] ?? project.metadata?.icons['SVG']
  if (icon) {
    const image = await loadImage(`${FRONTEND_URL}/images/icons/${icon}`);
    ctx.drawImage(image, canvas.width - 250 - 50, 50, 250, 250);
  }
  
  // Draw the project name and tagline
  drawProjectName(ctx, project);
  if (project.metadata?.tagline) drawTagline(ctx, project.metadata.tagline);

  // Draw project stats
  if (project.stats) {
    const PADDING = 55;
    const Y = 470;
    let x = 60;
    if (project.stats?.downloadCount > 0) x += await drawStat(ctx, project.stats.downloadCount, 'download', x, Y) + PADDING
    if (project.stats?.averageRating > 0) x += await drawStat(ctx, project.stats.averageRating, 'star', x, Y) + PADDING
    if (project.stats?.interactions > 0) x += await drawStat(ctx, project.stats.interactions, 'heart', x, Y) + PADDING
  }

  // Return the image buffer
  return canvas.toBuffer();
});