// Download project documentation and READMEs from GitHub
import fs from 'node:fs'
import fetch from 'node-fetch'
import { execSync } from 'node:child_process'

// Get filtered projects
const getProjects = async () => await fetch(`${process.env.API_BASE_URL}/v1/projects`)
    .then(res => res.json())
    .then(projects => projects.filter(project => project.metadata?.properties?.find(prop => prop?.key === 'emulator_rom')));

const getEmulatorJs = () => {
    const emulatorPath = `https://github.com/EmulatorJS/EmulatorJS.git`;
    const destPath = './public/emulator-js';

    // If the EmulatorJS directory does not exist, make the directory
    if (!fs.existsSync(destPath + '/')) {
        fs.mkdirSync(destPath + '/', { recursive: true });
    } else {
        console.log(`EmulatorJS source already present, skipping...`);
        return;
    }

    // Clone the EmulatorJS repository
    execSync(`git clone ${emulatorPath} ${destPath}`);

    // Remove every file and directory aside from data/
    const files = fs.readdirSync(destPath);
    for (const file of files) {
        if (file !== 'data') {
            execSync(`rm -rf ${destPath}/${file}`);
        }
    }
}

const downloadRom = (project) => {
    // Download project.emulator.rom_url and put it in /emulator-js/roms/
    const romUrl = project.metadata.properties.find(prop => prop.key === 'emulator_rom')?.value;
    if (!romUrl) {
        console.log(`No ROM found for ${project.name}, skipping...`);
        return;
    }
    const romPath = `./public/emulator-js/roms`;
    console.log(`Downloading ${project.name} ROM...`);
    
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
            fs.writeFileSync(`${romDirectory}/${project.id}`, Buffer.from(buffer));
        });
}

// Pull documentation for all projects with documentation
module.exports = {
    prepareEmulators: async () => {
        console.log(`Cloning EmulatorJS source...`);
        const projects = await getProjects();
        getEmulatorJs();
        console.log(`Downloading ROMs for ${projects.length} projects...`);
        for (const project of projects) {
            downloadRom(project);
        }
    }
}