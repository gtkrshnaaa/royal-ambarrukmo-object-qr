// migrations/migration-up.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

async function migrateUp() {
    try {
        // Buat tabel admins
        await db.query(`
            CREATE TABLE IF NOT EXISTS admins (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        // Insert data admin default
        const passwordHash = await bcrypt.hash('admin_password', 10);
        await db.query(`INSERT INTO admins (email, password) VALUES ('admin@example.com', ?)`, [passwordHash]);

        

        // Buat tabel categories
        await db.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);


        // Buat tabel objects
        await db.query(`
            CREATE TABLE IF NOT EXISTS objects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT,
                image_url VARCHAR(255),
                qr_image_url VARCHAR(255) NULL,
                location VARCHAR(100),
                category_id INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
            );
        `);

        console.log('Migrasi up berhasil untuk semua tabel.');
    } catch (error) {
        console.error('Error saat migrasi up:', error);
    } finally {
        db.end();
    }
}

migrateUp();
