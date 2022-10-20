// Download project documentation and READMEs from GitHub
const fs = require('fs')
const { execSync } = require('child_process')
const projects = require('../assets/data/projects.json').filter(p => p.repository && p.documentation)

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

    // Iterate through each item recursively in the wiki directory and rename each file to lower case
    fs.readdirSync(wikiPath, { withFileTypes: true }).forEach(dirent => {
        const filePath = `${wikiPath}/${dirent.name}`
        if (dirent.isDirectory()) {
            fs.readdirSync(filePath, { withFileTypes: true }).forEach(dirent => {
                const filePath = `${wikiPath}/${dirent.name}`
                if (dirent.isFile()) {
                    fs.renameSync(filePath, filePath.toLowerCase())
                }
            })
        } else if (dirent.isFile()) {
            fs.renameSync(filePath, filePath.toLowerCase())
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