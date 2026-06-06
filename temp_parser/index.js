const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Phụ lục 2, Danh mục dự án thu hút đầu tư giai đoạn 2026 (219 dự án).xlsx');
const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

const data = xlsx.utils.sheet_to_json(sheet, { defval: '' });

const outputPath = path.join(__dirname, '..', 'data.json');
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
console.log('Successfully wrote data to data.json');
