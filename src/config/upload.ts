import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const destination = path.resolve(__dirname, '..', '..', 'temp');

export default {
    destination,
    storage: multer.diskStorage({
        destination,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};
