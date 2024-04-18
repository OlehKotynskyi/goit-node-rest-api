import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tmpPath = path.join(__dirname, '../', 'tmp');

export const multerConfig = multer.diskStorage({
  destination: tmpPath,
});

export const upload = multer({
  storage: multerConfig,
});
