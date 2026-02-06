const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../src/data/config.ts');

try {
    let content = fs.readFileSync(configPath, 'utf8');

    // Regex to find the version string
    const versionRegex = /version:\s*"live beta (\d+)\.(\d+)\.(\d+)"/;
    const match = content.match(versionRegex);

    if (match) {
        let major = parseInt(match[1]);
        let minor = parseInt(match[2]);
        let patch = parseInt(match[3]);

        // Increment patch
        patch++;

        const newVersion = `live beta ${major}.${minor}.${patch}`;
        const newDate = new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        content = content.replace(versionRegex, `version: "${newVersion}"`);
        content = content.replace(/lastUpdated:\s*".*?"/, `lastUpdated: "${newDate}"`);

        fs.writeFileSync(configPath, content);
        console.log(`✅ Version incremented to: ${newVersion}`);
    } else {
        console.error('❌ Could not find version string in config.ts');
    }
} catch (error) {
    console.error('❌ Error updating version:', error.message);
}
