// backend/models/objectModel.js

const db = require('../config/db');

// exports.create = async (name, description, image_url, location) => {
//     const [result] = await db.query(
//         'INSERT INTO objects (name, description, image_url, location) VALUES (?, ?, ?, ?)',
//         [name, description, image_url, location]
//     );
//     return result.insertId;
// };

exports.create = async (name, description, image_url, location, category_id) => {
    const [result] = await db.query(
        'INSERT INTO objects (name, description, image_url, location, category_id) VALUES (?, ?, ?, ?, ?)',
        [name, description, image_url, location, category_id]
    );
    return result.insertId;
};


// exports.findAll = async () => {
//     const [rows] = await db.query('SELECT * FROM objects');
//     return rows;
// };


exports.findAll = async () => {
    const [rows] = await db.query(`
        SELECT objects.*, categories.name AS category_name
        FROM objects
        LEFT JOIN categories ON objects.category_id = categories.id
    `);
    return rows;
};



// exports.findById = async (id) => {
//     const [rows] = await db.query('SELECT * FROM objects WHERE id = ?', [id]);
//     return rows[0];
// };


exports.findById = async (id) => {
    const [rows] = await db.query(`
        SELECT objects.*, categories.name AS category_name
        FROM objects
        LEFT JOIN categories ON objects.category_id = categories.id
        WHERE objects.id = ?
    `, [id]);
    return rows[0];
};



// exports.update = async (id, name, description, image_url, location) => {
//     await db.query(
//         'UPDATE objects SET name = ?, description = ?, image_url = ?, location = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
//         [name, description, image_url, location, id]
//     );
// };


exports.update = async (id, name, description, image_url, location, category_id) => {
    await db.query(
        'UPDATE objects SET name = ?, description = ?, image_url = ?, location = ?, category_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, description, image_url, location, category_id, id]
    );
};


// Update QR Code URL objek
exports.updateQRCodeUrl = async (id, qrImageUrl) => {
    await db.query(
        'UPDATE objects SET qr_image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [qrImageUrl, id]
    );
};


exports.delete = async (id) => {
    await db.query('DELETE FROM objects WHERE id = ?', [id]);
};
