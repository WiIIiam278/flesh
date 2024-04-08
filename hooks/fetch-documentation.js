// Download project documentation and READMEs from GitHub
const fs = require('fs')
const { execSync } = require('child_process')
const projects = require('../assets/data/projects.json').filter(p => p.repository && p.documentation)

// Adds the canonical title of the page
function addNameHeader(filePath, name) {
    const file = fs.readFileSync(filePath, 'utf8');
    const header = `---\ntitle: ${name.replace('.md', '').replace(/-/g, ' ')}\n---\n`;
    if (!file.startsWith('---')) {
        fs.writeFileSync(filePath, header + file);
    }
}

// Fetches and clones docs for each project repo
function getDocumentationFromRepository(project) {
    const wikiUrl = `${project.repository}.wiki.git`
    const projectPath = './content/docs/project'
    const wikiPath = `${projectPath}/${project.id}`

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
    pullDocumentation: () => {
        console.log(`Pulling documentation for ${projects.length} projects...`)
        for (const project of projects) {
            getDocumentationFromRepository(project);
        }
    }
}