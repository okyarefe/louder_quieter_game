const fs = require('fs');
const path = require('path');

function formatNameWithSpaces(name) {
    // First add spaces around parentheses
    let formatted = name.replace(/\(/g, ' (')
                       .replace(/\)/g, ') ');
    // Then replace underscores with spaces
    formatted = formatted.replace(/_/g, ' ');
    // Clean up any double spaces
    return formatted.replace(/\s+/g, ' ').trim();
}

function generateQuestionsFromImages() {
    const imagesDir = path.join(process.cwd(), 'assets', 'images');
    const questions = [];

    try {
        const files = fs.readdirSync(imagesDir);
        
        files.forEach(file => {
            if (file.endsWith('.png')) {
                // Remove .png extension
                const filename = file.replace('.png', '');
                
                // Split by last underscore to separate name and dB
                const lastUnderscoreIndex = filename.lastIndexOf('_');
                if (lastUnderscoreIndex !== -1) {
                    const name = filename.substring(0, lastUnderscoreIndex);
                    const db = filename.substring(lastUnderscoreIndex + 1);
                    
                    console.log('Processing:', name, db);
                    
                    questions.push({
                        itemName: formatNameWithSpaces(name),
                        dB: db,
                        imagePath: `assets/images/${file}`
                    });
                }
            }
        });

        // Sort questions by dB level (highest to lowest)
        questions.sort((a, b) => parseInt(b.dB) - parseInt(a.dB));

        // Generate the questions.js content
        const content = `const questions = ${JSON.stringify(questions, null, 4)};\n\nexport { questions };`;

        // Write to questions.js
        fs.writeFileSync(path.join(process.cwd(), 'js', 'utils', 'questions.js'), content);
        
        console.log('Successfully generated questions.js');
        return questions;
    } catch (error) {
        console.error('Error generating questions:', error);
        return [];
    }
}

// Run the function
generateQuestionsFromImages(); 