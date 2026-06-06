const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', '..', '..', 'data.json');
const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const cleanedData = [];
let currentGroup = '';

for (let i = 0; i < rawData.length; i++) {
  const row = rawData[i];
  
  // Skip empty rows and the header metadata rows
  if (!row['__EMPTY'] && !row['__EMPTY_1']) continue;
  
  const col1 = String(row['__EMPTY'] || '').trim();
  const col2 = String(row['__EMPTY_1'] || '').trim();
  
  if (col1.match(/^I+$/) || col1.match(/^[A-Z]$/) || (!col1 && col2.startsWith('('))) {
    // This is likely a group header
    if (col2) currentGroup = col2;
    continue;
  }
  
  if (col1 === 'STT' || col1 === '1') {
    // Header row or a sub-header row, skip
    continue;
  }
  
  if (col1 && !isNaN(parseInt(col1, 10))) {
    // Data row
    cleanedData.push({
      group: currentGroup,
      stt: col1,
      tenDuAn: col2,
      diaDiem: row['__EMPTY_2'] || '',
      dienTich: row['__EMPTY_3'] || '',
      tongVon: row['__EMPTY_4'] || '',
      nguonGocDat: row['__EMPTY_5'] || '',
      hienTrangDat: row['__EMPTY_6'] || '',
      quyMo: row['__EMPTY_7'] || '',
      quyetDinhQuyHoach: row['__EMPTY_8'] || '',
      haTang: row['__EMPTY_9'] || '',
      hinhThucDauTu: row['__EMPTY_10'] || '',
      ghiChu: row['__EMPTY_11'] || ''
    });
  }
}

const outDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'investment-projects.json'), JSON.stringify(cleanedData, null, 2), 'utf8');
console.log(`Processed ${cleanedData.length} projects.`);
