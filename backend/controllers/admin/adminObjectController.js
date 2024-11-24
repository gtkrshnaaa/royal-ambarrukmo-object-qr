// backend/controllers/admin/adminObjectController.js

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const QRCode = require('qrcode');
const Jimp = require('jimp');
const objectModel = require('../../models/objectModel');

// Setup storage engine untuk multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); // Menyimpan gambar di folder 'uploads'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Memberikan nama file unik
    }
});

// Inisialisasi multer dengan filter untuk hanya menerima gambar
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('File type not supported'));
        }
    },
}).array('images', 5); // Membatasi maksimal 5 gambar per upload

// Fungsi untuk generate QR code dengan logo dan URL
async function generateQRCodeWithLogo(text, logoPath, outputPath, displayUrl) {
    try {
        const qrCodeBuffer = await QRCode.toBuffer(text, { width: 300, margin: 1 });
        const qrImage = await Jimp.read(qrCodeBuffer);
        const logo = await Jimp.read(logoPath);
        const logoSize = 60;
        logo.resize(logoSize, logoSize);
        const x = (qrImage.bitmap.width / 2) - (logoSize / 2);
        const y = (qrImage.bitmap.height / 2) - (logoSize / 2);
        qrImage.composite(logo, x, y);
        const textHeight = 30;
        const textBg = new Jimp(qrImage.bitmap.width, textHeight, '#FFFFFF');
        const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        textBg.print(font, 10, 5, displayUrl);
        const finalImage = new Jimp(qrImage.bitmap.width, qrImage.bitmap.height + textHeight);
        finalImage.composite(qrImage, 0, 0);
        finalImage.composite(textBg, 0, qrImage.bitmap.height);
        await finalImage.writeAsync(outputPath);
    } catch (error) {
        console.error('Error saat generate QR code dengan logo:', error);
        throw error;
    }
}

// Create Object
exports.createObject = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        try {
            const { name, description, location, category_id } = req.body;
            if (!name || !description || !location || !category_id) {
                return res.status(400).json({ error: 'Missing required fields' });
            }
            const image_urls = req.files ? req.files.map(file => '/uploads/' + file.filename) : [];
            const id = await objectModel.create(name, description, image_urls, location, category_id);
            res.status(201).json({ message: 'Object created', id });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create object' });
        }
    });
};

// Generate QR Code
exports.generateQRCode = async (req, res) => {
    try {
        const { id } = req.params;
        const object = await objectModel.findById(id);
        if (!object) {
            return res.status(404).json({ error: 'Object not found' });
        }
        const hardcodedUrl = 'http://localhost:3000/public/object/' + id;
        const qrOutputPath = path.join(__dirname, '../../public/qrcode/', `qrcode_${id}.png`);
        const logoPath = path.join(__dirname, '../../public/assets/logo.jpg');
        await generateQRCodeWithLogo(hardcodedUrl, logoPath, qrOutputPath, hardcodedUrl);
        const qrImageUrl = '/qrcode/' + `qrcode_${id}.png`;
        await objectModel.updateQRCodeUrl(id, qrImageUrl);
        res.status(200).json({ message: 'QR code generated', qr_image_url: qrImageUrl });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
};

// Get All Objects
exports.getAllObjects = async (req, res) => {
    try {
        const objects = await objectModel.findAll();
        res.status(200).json(objects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch objects' });
    }
};

// Get Object by ID
exports.getObjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const object = await objectModel.findById(id);
        if (object) {
            res.status(200).json(object);
        } else {
            res.status(404).json({ error: 'Object not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch object' });
    }
};

// Update Object
exports.updateObject = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        try {
            const { id } = req.params;
            const { name, description, location, category_id } = req.body;
            const existingObject = await objectModel.findById(id);
            if (!existingObject) {
                return res.status(404).json({ error: 'Object not found' });
            }
            const image_urls = req.files && req.files.length
                ? req.files.map(file => '/uploads/' + file.filename)
                : existingObject.images;
            await objectModel.update(id, name, description, image_urls, location, category_id);
            res.status(200).json({ message: 'Object updated' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update object' });
        }
    });
};

// Delete Object
exports.deleteObject = async (req, res) => {
    try {
        const { id } = req.params;
        await objectModel.delete(id);
        res.status(200).json({ message: 'Object deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete object' });
    }
};




















// const multer = require('multer');
// const path = require('path');
// const objectModel = require('../../models/objectModel');

// // Setup storage engine untuk multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/uploads/'); // Menyimpan gambar di folder 'uploads'
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Memberikan nama file unik
//     }
// });

// // Inisialisasi multer dengan filter untuk hanya menerima gambar
// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         const filetypes = /jpeg|jpg|png|gif/;
//         const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//         const mimetype = filetypes.test(file.mimetype);
//         if (extname && mimetype) {
//             return cb(null, true);
//         } else {
//             cb(new Error('File type not supported'));
//         }
//     },
// }).array('images', 5); // Membatasi maksimal 5 gambar per upload (sesuaikan sesuai kebutuhan)


// // Create Object
// exports.createObject = async (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) {
//             return res.status(400).json({ error: err.message });
//         }

//         // Log untuk memeriksa data yang diterima
//         console.log("Request Body:", req.body); // Memeriksa data yang diterima dalam body
//         console.log("Uploaded Files:", req.files); // Memeriksa file yang diupload
        
//         try {
//             const { name, description, location, category_id } = req.body;
//             if (!name || !description || !location || !category_id) {
//                 return res.status(400).json({ error: 'Missing required fields' });
//             }

//             // Menyimpan URL untuk setiap gambar yang diupload
//             const image_urls = req.files ? req.files.map(file => '/uploads/' + file.filename) : [];

//             const id = await objectModel.create(name, description, image_urls, location, category_id);
//             res.status(201).json({ message: 'Object created', id });
//         } catch (error) {
//             res.status(500).json({ error: 'Failed to create object' });
//         }
//     });
// };

// // Get All Objects
// exports.getAllObjects = async (req, res) => {
//     try {
//         const objects = await objectModel.findAll();
//         res.status(200).json(objects);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch objects' });
//     }
// };

// // Get Object by ID
// exports.getObjectById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const object = await objectModel.findById(id);
//         if (object) {
//             res.status(200).json(object);
//         } else {
//             res.status(404).json({ error: 'Object not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch object' });
//     }
// };

// // Update Object
// exports.updateObject = async (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) {
//             return res.status(400).json({ error: err.message });
//         }

//         try {
//             const { id } = req.params;
//             const { name, description, location, category_id } = req.body;

//             if (!name || !description || !location || !category_id) {
//                 return res.status(400).json({ error: 'Missing required fields' });
//             }

//             // Mendapatkan objek yang sudah ada di database
//             const existingObject = await objectModel.findById(id);
//             if (!existingObject) {
//                 return res.status(404).json({ error: 'Object not found' });
//             }

//             // Menyimpan URL untuk setiap gambar yang diupload atau menggunakan gambar lama jika tidak ada gambar baru
//             const image_urls = req.files && req.files.length
//                 ? req.files.map(file => '/uploads/' + file.filename) // Menambahkan gambar baru
//                 : existingObject.images; // Menggunakan gambar lama jika tidak ada gambar baru

//             // Melakukan update objek
//             await objectModel.update(id, name, description, image_urls, location, category_id);
//             res.status(200).json({ message: 'Object updated' });
//         } catch (error) {
//             res.status(500).json({ error: 'Failed to update object' });
//         }
//     });
// };


// // Delete Object
// exports.deleteObject = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await objectModel.delete(id);
//         res.status(200).json({ message: 'Object deleted' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to delete object' });
//     }
// };
