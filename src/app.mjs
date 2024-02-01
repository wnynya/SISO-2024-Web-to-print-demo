'use strict';

const PORT = 8080; // 서버가 열릴 포트
const PRINTER_NAME = 'EPSON PM-400 Series'; // 프린터 이름
const PRINTER_SETTINGS = 'fit,color,paper=10 x 15 cm (4 x 6 in)'; // 프린터 속성

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { exec } from 'node:child_process';

import express from 'express';

const app = express();

/* Body (JSON) parser */
app.use(
  express.urlencoded({ limit: '2GB', extended: true, parameterLimit: 1000000 })
);
app.use(express.json({ limit: '2GB' }));

/* Set static files (src/public) */
app.use(express.static(path.resolve(__dirname, './public')));

async function print(file) {
  await (() => {
    return new Promise((resolve, reject) => {
      let options = `SumatraPDF-3.5.2-64.exe `;
      options += `-print-to "${PRINTER_NAME}" `;
      options += `-print-settings "${PRINTER_SETTINGS}" `;
      options += `"${file}"`;

      console.log(options);
      const process = exec(options, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        console.log(stdout);
      });
      process.on('close', resolve);
    });
  })();
}

app.post('/print', async (req, res) => {
  const filename = path.resolve(__dirname, `../data/${Date.now()}.pdf`);
  fs.writeFileSync(filename, Buffer.from(req.body.pdf.split(',')[1], 'base64'));
  await print(filename);
  fs.unlinkSync(filename);
  res.status(200).end();
});

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
