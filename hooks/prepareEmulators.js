// Download project documentation and READMEs from GitHub
import fs from 'node:fs'
import fetch from 'node-fetch'
import unzip from '7zip-min'

// Get filtered projects
const getProjects = async () => await fetch(`${process.env.API_BASE_URL}/v1/projects`)
    .then(res => res.json())
    .then(projects => projects.filter(project => project.metadata?.properties?.find(prop => prop?.key === 'emulator_rom')));

const downloadEmulator = (callback) => {
    const destPath = './public/emulator-js';
    const dataPath = `${destPath}/data`;

    // If the EmulatorJS directory does not exist, make the directory
    if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(destPath, { recursive: true });
    } else {
        console.log(`EmulatorJS source already downloaded, skipping...`);
        return;
    }

    // Download EmulatorJS and syn
    const emulatorJsUrl = process.env.EMULATOR_JS_URL;
    const destZip = `${destPath}/emulator-js.7z`;
    fetch(emulatorJsUrl)
        .then(res => res.buffer())
        .then(buffer => fs.writeFileSync(destZip, Buffer.from(buffer)))
        .then(() => extractEmulator(destZip, destPath, callback))
}

const extractEmulator = (destZip, destPath, callback) => {
    unzip.unpack(destZip, destPath, (err) => {
        if (err) {
            reject(`Error extracting 7z file: ${err}`);
            return;
        }

        // Remove every file and directory aside from data/
        const files = fs.readdirSync(destPath);
        for (const file of files) {
            if (file !== 'data') {
                fs.rmSync(`${destPath}/${file}`, { recursive: true })
            }
        }
        callback()
    });
}

const downloadRom = (project) => {
    // Download project.emulator.rom_url and put it in /emulator-js/roms/
    const romUrl = project.metadata.properties.find(prop => prop.key === 'emulator_rom')?.value;
    if (!romUrl) {
        console.log(`No ROM found for ${project.slug}, skipping...`);
        return;
    }
    const romPath = `./public/emulator-js/roms`;
    console.log(`Downloading ${project.slug} ROM...`);
    
    // If the project path does not exist, make the directory
    if (!fs.existsSync(romPath + '/')) {
        fs.mkdirSync(romPath + '/', { recursive: true });
    }

    // Download the ROM with fetch
    fetch(romUrl)
        .then(res => res.buffer())
        .then(buffer => {
            // Write the ROM to the correct directory
            const romDirectory = `./public/emulator-js/roms`;
            if (!fs.existsSync(romDirectory + '/')) {
                fs.mkdirSync(romDirectory + '/', { recursive: true });
            }
            fs.writeFileSync(`${romDirectory}/${project.slug}`, Buffer.from(buffer));
        });
}

// Pull documentation for all projects with documentation
module.exports = {
    prepareEmulators: async () => {
        console.log(`Checking EmulatorJS is present...`);
        const projects = await getProjects();
        downloadEmulator(() => {
            console.log(`Downloading ROMs for ${projects.length} projects...`);
            for (const project of projects) {
                downloadRom(project);
            }
        })
    }
}