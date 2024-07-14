// Download project documentation and READMEs from GitHub
import fs from 'node:fs'
import fetch from 'node-fetch'

// Get filtered projects
const getProjects = async () => await fetch(`${process.env.API_BASE_URL}/v1/projects`)
    .then(res => res.json());

// Convert links in a README file
const convertLinks = (body, project) => {
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
        const imagePath = `${getRawGithubURL(project.metadata?.github)}/${imageSource}`
        const imageFilename = imagePath.split('/').pop()
        const targetPath = `images/project/${project.slug}`

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

    const htmlImageRegex = /<img.*?src=\"(?<filename>.*?)\".*?>/g
    const htmlImages = body.matchAll(htmlImageRegex)
    for (const image of htmlImages) {
        const imageSource = image["groups"].filename;
        let path = imageSource;

        // If the URL is a relative path or does not start with http, it is a local image
        if (path.startsWith('http')) {
            continue
        }

        // If the path starts with ./ or /, remove it
        path = path.replace(/^\.?\//, '')

        // Get the image path
        const imagePath = `${getRawGithubURL(project.metadata.github)}/${imageSource}`
        const imageFilename = imagePath.split('/').pop()
        const targetPath = `images/project/${project.slug}`

        // Fetch the image from the URL
        fetch(imagePath)
            .then(res => res.arrayBuffer())
            .then(body => {
                // Write the image to the correct directory
                const imageDirectory = `./public/${targetPath}`
                if (!fs.existsSync(imageDirectory + '/')) {
                    fs.mkdirSync(imageDirectory
                        + '/', { recursive: true })
                }
                fs.writeFileSync(`${imageDirectory}/${imageFilename}`, Buffer.from(body))
            })

        // Replace the image path in the README body
        body = body.replace(imageSource, `/${targetPath}/${imageFilename}`)
    }

    return body
}

// Get the raw URL for a repository
const getRawGithubURL = (github) => github.replace('https://github.com/', 'https://raw.githubusercontent.com/') + '/master';

// Get a README file from a project repo
const getReadmeFromRepository = (project) => {
    const { github } = project.metadata;
    if (!github) {
        return
    }

    // Fetch the readme file from URL as plaintext, allowing redirects
    const url = `${getRawGithubURL(github)}/README.md`
    const path = `./content/project/${project.slug}.md`
    fetch(url)
        .then(res => res.text())
        .then(body => {
            return convertLinks(body, project)
        })
        .then(body => {
            fs.writeFileSync(path, body)
        })
}

// Get a project README file from the project
const writeReadmeContentFile = (project) => {
    const { readmeBody: body } = project.metadata;
    if (body) {
        return fs.writeFileSync(`./content/project/${project.id}.md`, body)
    }
    console.warn(`No readme file for project ${project.id}`)
}

// Pull README files for each project
module.exports = {
    prepareReadmes: async () => {
        // Check if a ./content/project/ folder exists, if not make it
        const contentDirectory = './content/project/'
        if (!fs.existsSync(contentDirectory)) {
            fs.mkdirSync(contentDirectory)
        }

        const projects = await getProjects()
        console.log(`Preparing READMEs for ${projects.length} projects...`)
        for (const project of projects) {
            if (!project.metadata.pullReadmeFromGithub) {
                writeReadmeContentFile(project);
                continue;
            }
            getReadmeFromRepository(project);
        }
    }
}