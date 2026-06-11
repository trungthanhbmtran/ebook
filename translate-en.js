const fs = require('fs');
const https = require('https');

const dataPath = './data/investment-projects.json';
const data = require(dataPath);

async function translateText(text) {
    if (!text || text === '-' || text.trim() === '') return text;
    return new Promise((resolve, reject) => {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=vi&tl=en&dt=t&q=${encodeURIComponent(text)}`;
        https.get(url, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    let translated = '';
                    if (parsed && parsed[0]) {
                        parsed[0].forEach(item => {
                            if (item[0]) translated += item[0];
                        });
                    }
                    resolve(translated || text);
                } catch (e) {
                    console.error("Parse error for text:", text);
                    resolve(text);
                }
            });
        }).on('error', (e) => {
            console.error("Network error:", e.message);
            resolve(text);
        });
    });
}

async function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function main() {
    let count = 0;
    let modified = false;

    for (let page of data.pages) {
        if (page.category && page.category.vi) {
            if (!page.category.en || page.category.en === page.category.vi) {
                console.log(`Translating category: ${page.category.vi}`);
                page.category.en = await translateText(page.category.vi);
                modified = true;
                await sleep(50);
            }
        }

        if (page.projects) {
            for (let proj of page.projects) {
                if (proj.name && proj.name.vi && (!proj.name.en || proj.name.en === proj.name.vi)) {
                    proj.name.en = await translateText(proj.name.vi);
                    modified = true;
                    await sleep(50);
                }
                if (proj.location && proj.location.vi && (!proj.location.en || proj.location.en === proj.location.vi)) {
                    proj.location.en = await translateText(proj.location.vi);
                    modified = true;
                    await sleep(50);
                }
                if (proj.scale && proj.scale.vi && (!proj.scale.en || proj.scale.en === proj.scale.vi)) {
                    proj.scale.en = await translateText(proj.scale.vi);
                    modified = true;
                    await sleep(50);
                }
                if (proj.investmentCapital && proj.investmentCapital.vi && (!proj.investmentCapital.en || proj.investmentCapital.en === proj.investmentCapital.vi)) {
                    let translated = await translateText(proj.investmentCapital.vi);
                    translated = translated.replace(/billion dong/gi, 'billion VND').replace(/billion/gi, 'billion VND').replace(/VND VND/g, 'VND');
                    proj.investmentCapital.en = translated;
                    modified = true;
                    await sleep(50);
                }

                count++;
                if (count % 20 === 0) console.log(`Processed ${count} projects...`);
            }
        }
    }

    if (modified) {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
        console.log('Done translating JSON fields!');
    } else {
        console.log('No fields needed translation.');
    }
}

main();
