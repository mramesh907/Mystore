import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export default upload;

/*
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, '../public');
    cb(null, path.join(__dirname, '../public/temp'));
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
*/
