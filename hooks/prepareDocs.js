// Download project documentation and READMEs from GitHub
import fs from 'node:fs'
import fetch from 'node-fetch'
import { execSync } from 'node:child_process'

// Get filtered projects
const getProjects = async () => await fetch(`${process.env.API_BASE_URL}/v1/projects`)
    .then(res => res.json())
    .then(projects => projects.filter(project => project.metadata.documentation && project.metadata.github));

// Adds the canonical title of the page
const addNameHeader = (filePath, name) => {
    const file = fs.readFileSync(filePath, 'utf8');
    const header = `---\ntitle: ${name.replace('.md', '').replace(/-/g, ' ')}\n---\n`;
    if (!file.startsWith('---')) {
        fs.writeFileSync(filePath, header + file);
    }
}

// Fetches and clones docs for each project repo
const getDocumentationFromRepository = (project) => {
    const wikiUrl = `${project.metadata.github}.wiki.git`
    const projectPath = './content/docs/project'
    const wikiPath = `${projectPath}/${project.slug}`

    // If the project path does not exist, make the directory
    if (!fs.existsSync(projectPath + '/')) {
        fs.mkdirSync(projectPath + '/', { recursive: true })
    }

    // Remove the wiki directory if it exists
    if (fs.existsSync(wikiPath)) {
        fs.rmSync(wikiPath, { recursive: true })
    }

    // Clone the wiki repository
    execSync(`git clone ${wikiUrl} ${wikiPath}`)

    // Remove the .git directory
    fs.rmSync(`${wikiPath}/.git`, { recursive: true })

    // Make locale dir for default locale
    if (!fs.existsSync(`${wikiPath}/en`)){
        fs.mkdirSync(`${wikiPath}/en`, { recursive: true })
    }
    
    // Iterate through each item recursively in the wiki directory and rename each file to lower case
    fs.readdirSync(wikiPath, { withFileTypes: true }).forEach(dirent => {
        const filePath = `${wikiPath}/${dirent.name}`
        if (dirent.isFile()) {
            const enFilePath = `${wikiPath}/en/${dirent.name.toLowerCase()}`;
            fs.renameSync(filePath, enFilePath);
            addNameHeader(enFilePath, dirent.name);
        }
        else if (dirent.isDirectory()) {
            fs.readdirSync(filePath, { withFileTypes: true }).forEach(subdirent => {
                const subfilePath = `${filePath}/${subdirent.name}`
                fs.renameSync(subfilePath, subfilePath.toLowerCase());
                addNameHeader(subfilePath, subdirent.name);
            })
        }
    })
}

// Pull documentation for all projects with documentation
module.exports = {
    prepareDocs: async () => {
        const projects = await getProjects();
        console.log(`Pulling documentation for ${projects.length} projects...`)
        for (const project of projects) {
            getDocumentationFromRepository(project);
        }
    }
}