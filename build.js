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
        // Check if images directory exists
        if (!fs.existsSync(imagesDir)) {
            console.error('Error: assets/images directory does not exist!');
            process.exit(1);
        }

        const files = fs.readdirSync(imagesDir);
        console.log(`Found ${files.length} files in images directory`);
        
        let processedCount = 0;
        files.forEach(file => {
            if (file.endsWith('.png')) {
                // Remove .png extension
                const filename = file.replace('.png', '');
                
                // Split by last underscore to separate name and dB
                const lastUnderscoreIndex = filename.lastIndexOf('_');
                if (lastUnderscoreIndex !== -1) {
                    const name = filename.substring(0, lastUnderscoreIndex);
                    const db = filename.substring(lastUnderscoreIndex + 1);
                    
                    console.log(`Processing: ${name} (${db} dB)`);
                    
                    // Use forward slashes for web compatibility
                    const imagePath = path.join('assets', 'images', file).replace(/\\/g, '/');
                    
                    questions.push({
                        itemName: formatNameWithSpaces(name),
                        dB: db,
                        imagePath: imagePath
                    });
                    processedCount++;
                } else {
                    console.warn(`Warning: Skipping ${file} - invalid filename format`);
                }
            }
        });

        if (processedCount === 0) {
            console.error('Error: No valid image files found in assets/images directory!');
            process.exit(1);
        }

        console.log(`Successfully processed ${processedCount} images`);

        // Sort questions by dB level (highest to lowest)
        questions.sort((a, b) => parseInt(b.dB) - parseInt(a.dB));

        // Generate the questions.js content without ES modules
        const content = `const questions = ${JSON.stringify(questions, null, 4)};`;

        // Write to questions.js
        const outputPath = path.join(process.cwd(), 'js', 'utils', 'questions.js');
        fs.writeFileSync(outputPath, content);
        
        console.log(`Successfully generated questions.js with ${questions.length} questions`);
        return questions;
    } catch (error) {
        console.error('Error generating questions:', error);
        process.exit(1);
    }
}

// Run the function
generateQuestionsFromImages(); 