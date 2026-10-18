import fs from 'node:fs';
import path from 'node:path';
import * as XLSX from 'xlsx';
import { createMasterExcelWorkbook } from '../src/utils/masterInventory.ts';

const outDir = path.resolve('public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const filePath = path.join(outDir, 'El_Nexo_Digital_Planilla_Maestra.xlsx');
const wb = createMasterExcelWorkbook();

XLSX.writeFile(wb, filePath);
console.log(`Excel generado con éxito en: ${filePath}`);
