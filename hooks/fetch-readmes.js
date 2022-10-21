// Download project documentation and READMEs from GitHub
const fs = require('fs')
const fetch = require('node-fetch')
const projects = require('../assets/data/projects.json')

// Convert links in a README file
function convertLinks(body, project) {
    // Find references to images in the README body, including images wrapped within links
    const imageRegex = /(?<alt>!\[[^\]]*\])\((?<filename>.*?)(?=\"|\))\)/g
    const images = body.matchAll(imageRegex)

    // For each image, get the path of the image
    for (const image of images) {
        const imageSource = image["groups"].filename;
        let path = imageSource;

        // If the URL is a relative path or does not start with http, it is a local image
        if (path.startsWith('http')) {
            continue
        }

        // If the path starts with ./ or /, remove it
        path = path.replace(/^\.?\//, '')

        // Get the image path
        const imagePath = `${getRawUrl(project.repository)}/${imageSource}`
        const imageFilename = imagePath.split('/').pop()
        const targetPath = `images/project/${project.id}`

        // Fetch the image from the URL
        fetch(imagePath)
            .then(res => res.arrayBuffer())
            .then(body => {
                // Write the image to the correct directory
                const imageDirectory = `./public/${targetPath}`
                if (!fs.existsSync(imageDirectory + '/')) {
                    fs.mkdirSync(imageDirectory + '/', { recursive: true })
                }
                fs.writeFileSync(`${imageDirectory}/${imageFilename}`, Buffer.from(body))
            })

        // Replace the image path in the README body
        body = body.replace(imageSource, `/${targetPath}/${imageFilename}`)
    }

    return body
}

// Get the raw URL for a repository
function getRawUrl(repository) {
    return repository.replace('https://github.com/', 'https://raw.githubusercontent.com/') + '/master';
}

// Get a README file from a project repo
function getReadmeFromRepository(project) {
    if (!project.repository) {
        return
    }

    // Fetch the readme file from URL as plaintext, allowing redirects
    const url = `${getRawUrl(project.repository)}/README.md`
    const path = `./content/project/${project.id}.md`
    fetch(url)
        .then(res => res.text())
        .then(body => {
            return convertLinks(body, project)
        })
        .then(body => {
            fs.writeFileSync(path, body)
        })
}

// Get a project README file from the assets folder
const getReadmeFromAssets = (project) => {
    if (!project.readme) {
        return
    }

    // Copy the readme file from the assets folder to the content/project folder
    const path = `./assets/project/${project.id}.md`
    if (fs.existsSync(path)) {
        fs.copyFileSync(path, `./content/project/${project.id}.md`)
    } else {
        console.warn(`No readme file for project ${project.id}`)
    }
}

// Pull README files for each project
module.exports = {
    getContent: () => {
        // Check if a ./content/project/ folder exists, if not make it
        const contentDirectory = './content/project/'
        if (!fs.existsSync(contentDirectory)) {
            fs.mkdirSync(contentDirectory)
        }

        console.log(`Downloading READMEs for ${projects.length} projects...`)
        for (const project of projects) {
            if (project.readme) {
                getReadmeFromAssets(project);
                continue;
            }
            getReadmeFromRepository(project);
        }
    }
}