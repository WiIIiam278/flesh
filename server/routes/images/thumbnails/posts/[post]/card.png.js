import { setResponseHeader } from 'h3'
import { registerFont, createCanvas, loadImage } from 'canvas'
import removeMd from 'remove-markdown'

const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
const FRONTEND_URL = useRuntimeConfig().public.FRONTEND_BASE_URL;
const ASSETS_URL = useRuntimeConfig().public.ASSETS_BASE_URL;

const fetchPost = async (slug) => await $fetch(`${BASE_URL}/v1/posts/${slug}`)

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
  ctx.font = '50pt NunitoBold, sans-serif';
  ctx.fillStyle = '#FFFFFF';

  const maxWidth = 800;
  const maxLines = 3;
  const lineHeight = 65;
  const stripped = removeMd(name);
  const words = stripped.split(' ');
  let line = '';
  let lines = [];
  let y = 120;

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

  let maxHeight = 0;
  lines.forEach((line, index) => {
    let height = y + index * lineHeight;
    ctx.fillText(line, 60, height);
    maxHeight = maxHeight < height ? height : maxHeight;
  });
  return maxHeight;
};

// Draw tagline with word wrapping
const drawTagline = (ctx, tagline, startingHeight) => {
  ctx.font = '28pt Nunito, sans-serif';
  ctx.fillStyle = '#FFFFFF';

  const maxWidth = 800;
  const maxLines = 3;
  const lineHeight = 40;
  const stripped = removeMd(tagline);
  const words = stripped.split(' ');
  let line = '';
  let lines = [];
  let y = startingHeight + 70;

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
    ctx.font = `${fontSize}pt NunitoBold, sans-serif`;
    if (ctx.measureText(text).width > maxWidth) fontSize -= 5;
  } while (ctx.measureText(text).width > maxWidth && fontSize > 30);

  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(text, 60, 540);
};

// 404 not found
const notFound = (event) => {
  setResponseStatus(event, 404);
  return "Not found";
}

export default defineEventHandler(async (event) => {
  // Set content-type
  setResponseHeader(event, 'Content-Type', 'image/png');
  const post = await fetchPost(await getRouterParam(event, 'post'));
  if (!post) return notFound();

  // Register fonts
  registerFont('server/routes/images/thumbnails/font/regular.ttf', { family: 'Nunito' });
  registerFont('server/routes/images/thumbnails/font/bold.ttf', { family: 'NunitoBold' });
  const canvas = createCanvas(1200, 600);
  const ctx = canvas.getContext('2d');

  // Draw BG
  drawBackground(ctx, canvas);

  // Load and draw the project or site image
  const project = post.associatedProject;
  const icon = project?.metadata?.icons['PNG'] ?? project?.metadata?.icons['SVG']
  if (icon) {
    const image = await loadImage(`${ASSETS_URL}/${icon}`);
    ctx.drawImage(image, canvas.width - 250 - 50, 50, 250, 250);
  } else {
    const image = await loadImage(`${FRONTEND_URL}/images/icons/william278.png`);
    ctx.drawImage(image, canvas.width - 250 - 50, 50, 250, 250);
  }
  
  // Draw the capitalized page name, tagline, and site name
  let height = drawPageName(ctx, post.title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()));
  drawTagline(ctx, post.body.split('\n')[0], height);
  drawSiteName(ctx, 'William278.net');

  // Return the image buffer
  return canvas.toBuffer();
});