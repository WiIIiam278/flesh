// Download project documentation and READMEs from GitHub
const fs = require('fs');
const { execSync } = require('child_process');
const fetch = require('node-fetch')
const projects = require('../assets/data/projects.json').filter(p => p.emulator && p.emulator.rom_url)

function getEmulatorJs() {
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
    fs.readdirSync(destPath, { withFileTypes: true }).forEach(dirent => {
        const filePath = `${destPath}/${dirent.name}`
        if (dirent.isDirectory()) {
            fs.rmSync(filePath, { recursive: true })
        } else if (dirent.isFile()) {
            fs.rmSync(filePath)
        }
    });
}

function downloadRom(project) {
    // Download project.emulator.rom_url and put it in /emulator-js/roms/
    const romUrl = `${project.emulator.rom_url}`;
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
    getEmulator: () => {
        console.log(`Cloning EmulatorJS source...`);
        getEmulatorJs();
        console.log(`Downloading ROMs for ${projects.length} projects...`);
        for (const project of projects) {
            downloadRom(project);
        }
    }
}