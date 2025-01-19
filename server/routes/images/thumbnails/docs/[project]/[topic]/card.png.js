import { setResponseHeader } from 'h3'
import { registerFont, createCanvas, loadImage } from 'canvas'

const BASE_URL = useRuntimeConfig().public.API_BASE_URL;
const FRONTEND_URL = useRuntimeConfig().public.FRONTEND_BASE_URL;
const ASSETS_URL = useRuntimeConfig().public.ASSETS_BASE_URL;

const fetchProject = async (slug) => await $fetch(`${BASE_URL}/v1/projects/${slug}`)
const fetchProjectDocsPage = async (project, page) => await $fetch(`${BASE_URL}/v1/projects/${project}/docs/${page}`)

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
const drawProjectDocsName = (ctx, project) => {
  const maxWidth = 800;
  let fontSize = 50;
  let projectName = `${project.metadata?.name ?? project.slug} Docs`;
  
  // Dynamically reduce font size if text exceeds maxWidth
  do {
    ctx.font = `${fontSize}pt NunitoBold, sans-serif`;
    if (ctx.measureText(projectName).width > maxWidth) fontSize -= 5;
  } while (ctx.measureText(projectName).width > maxWidth && fontSize > 30);

  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(projectName, 60, 540);
};

// Draw tagline with word wrapping
const drawPageTitle = (ctx, title) => {
  ctx.font = '80pt NunitoBold, sans-serif';
  ctx.fillStyle = '#FFFFFF';

  const maxWidth = 800;
  const maxLines = 4;
  const lineHeight = 100;
  const words = title.split(' ');
  let line = '';
  let lines = [];
  let y = 150;

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

// 404 not found
const notFound = (event) => {
  setResponseStatus(event, 404);
  return "Not found";
}

export default defineEventHandler(async (event) => {
  const project = await fetchProject(getRouterParam(event, 'project'));
  if (!project || project.metadata.hidden || project.documentation) return notFound();
  const { title } = await fetchProjectDocsPage(project.slug, getRouterParam(event, 'topic') ?? 'Home');
  if (!title) return notFound();

  // Set content-type
  setResponseHeader(event, 'Content-Type', 'image/png');

  registerFont('server/routes/images/thumbnails/font/regular.ttf', { family: 'Nunito' });
  registerFont('server/routes/images/thumbnails/font/bold.ttf', { family: 'NunitoBold' });
  const canvas = createCanvas(1200, 600);
  const ctx = canvas.getContext('2d');

  drawBackground(ctx, canvas);

  // Load and draw the image
  const icon = project.metadata?.icons['PNG'] ?? project.metadata?.icons['SVG']
  if (icon) {
    const image = await loadImage(`${ASSETS_URL}/${icon}`);
    ctx.drawImage(image, canvas.width - 250 - 50, 50, 250, 250);
  }
  
  // Draw the project name and tagline
  drawProjectDocsName(ctx, project);
  drawPageTitle(ctx, title);

  // Return the image buffer
  return canvas.toBuffer();
});