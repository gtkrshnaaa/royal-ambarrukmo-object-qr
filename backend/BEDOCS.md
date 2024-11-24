## Dokumentasi Backend

---

### **Struktur Folder**

```plaintext
backend
├── app.js
├── BEDOCS.md
├── config
│   └── db.js
├── controllers
│   ├── admin
│   │   ├── adminAuthController.js
│   │   ├── adminCategoryController.js
│   │   └── adminObjectController.js
│   └── public
│       └── publicObjectController.js
├── GENERATEQR.md
├── migrations
│   ├── migration-down.js
│   └── migration-up.js
├── models
│   ├── adminModel.js
│   ├── categoryModel.js
│   └── objectModel.js
├── package.json
├── package-lock.json
├── public
│   ├── assets
│   │   └── logo.jpg
│   ├── qrcode
│   │   └── test.txt
│   └── uploads
│       └── test.txt
├── routes
│   ├── admin
│   │   ├── adminAuthRoutes.js
│   │   ├── adminCategoryRoutes.js
│   │   └── adminObjectRoutes.js
│   └── public
│       └── publicObjectRoutes.js
└── server.js
```

---

### **Penjelasan Tiap Folder dan File**

#### **1. app.js**
- File utama yang mengatur setup awal aplikasi menggunakan Express.js.
- Berfungsi untuk:
  - Konfigurasi middleware (seperti `cors` dan `express.json`).
  - Pengaturan route untuk admin (`/api/categories`, `/api/objects`) dan publik (`/api/public`).
  - Menghubungkan folder statis untuk akses file di `public/uploads` dan `public/qrcode`.

#### **2. server.js**
- File entry point untuk menjalankan aplikasi. Biasanya berisi:
  - Mengimpor `app.js`.
  - Menjalankan server di port tertentu menggunakan `app.listen()`.

#### **3. config/db.js**
- Konfigurasi koneksi ke database MariaDB.
- Biasanya mengatur library seperti `mysql2` atau `sequelize` untuk membuat koneksi ke database.

#### **4. controllers/** 
Berisi file controller yang menangani logika untuk tiap route:
- **admin/adminAuthController.js**:
  - Menangani autentikasi admin, seperti login, logout, dan validasi token.
- **admin/adminCategoryController.js**:
  - Mengelola kategori (buat, baca, edit, hapus).
- **admin/adminObjectController.js**:
  - Mengelola objek (buat, baca, edit, hapus), termasuk fitur generate QR Code.
- **public/publicObjectController.js**:
  - Menyediakan endpoint untuk mengakses data objek yang bisa diakses publik.

#### **5. routes/**
Berisi definisi rute untuk tiap endpoint aplikasi:
- **admin/adminAuthRoutes.js**:
  - Mendefinisikan rute untuk autentikasi admin (misalnya `/login`, `/logout`).
- **admin/adminCategoryRoutes.js**:
  - Rute untuk CRUD kategori.
- **admin/adminObjectRoutes.js**:
  - Rute untuk CRUD objek dan generate QR Code.
- **public/publicObjectRoutes.js**:
  - Rute untuk akses publik ke objek, seperti melihat semua objek atau detail objek.

#### **6. models/**
Berisi model untuk menghubungkan aplikasi dengan database:
- **adminModel.js**:
  - Menyediakan fungsi operasi database untuk tabel `admins`.
- **categoryModel.js**:
  - Menyediakan fungsi operasi database untuk tabel `categories`.
- **objectModel.js**:
  - Menyediakan fungsi operasi database untuk tabel `objects`.

#### **7. migrations/**
Berisi file migrasi untuk pembuatan atau penghapusan tabel:
- **migration-up.js**:
  - Membuat tabel-tabel yang dibutuhkan di database, seperti `admins`, `categories`, dan `objects`.
- **migration-down.js**:
  - Menghapus tabel-tabel tersebut saat rollback.

#### **8. public/**
Folder untuk menyimpan file statis yang dapat diakses langsung melalui URL:
- **public/uploads/**:
  - Berisi file yang diunggah oleh admin atau pengguna, seperti gambar kategori atau objek.
- **public/qrcode/**:
  - Berisi file QR Code yang dihasilkan oleh aplikasi.
- **public/assets/**:
  - Berisi file aset umum seperti logo, gambar, atau file pendukung lainnya.

#### **9. package.json & package-lock.json**
- File untuk mengelola dependensi Node.js yang digunakan dalam aplikasi.
- Berisi informasi tentang versi library seperti `express`, `mysql2`, dll.

#### **10. BEDOCS.md**
- Dokumentasi backend yang menjelaskan fitur, endpoint API, dan konfigurasi yang diperlukan untuk menjalankan aplikasi.

#### **11. GENERATEQR.md**
- Dokumentasi khusus untuk fitur generate QR Code:
  - Menjelaskan proses generate QR Code.
  - Cara mengakses endpoint terkait.
  - Format data input dan output.

---




## Daftar API Berdasarkan Rute

### **Rute Admin Kategori (`/api/categories`)**
1. **POST** `/api/categories/create` - Membuat kategori baru.
2. **GET** `/api/categories/get-all` - Mendapatkan semua kategori.
3. **GET** `/api/categories/get-by-id/:id` - Mendapatkan kategori berdasarkan ID.
4. **PUT** `/api/categories/update/:id` - Memperbarui kategori berdasarkan ID.
5. **DELETE** `/api/categories/delete/:id` - Menghapus kategori berdasarkan ID.

### **Rute Admin Objek (`/api/objects`)**
1. **POST** `/api/objects/create` - Membuat objek baru.
2. **GET** `/api/objects/get-all` - Mendapatkan semua objek.
3. **GET** `/api/objects/get-by-id/:id` - Mendapatkan objek berdasarkan ID.
4. **PUT** `/api/objects/update/:id` - Memperbarui objek berdasarkan ID.
5. **DELETE** `/api/objects/delete/:id` - Menghapus objek berdasarkan ID.
6. **POST** `/api/objects/generate-qr/:id` - Menghasilkan atau memperbarui QR Code untuk objek berdasarkan ID.

### **Rute Objek Publik (`/api/public`)**
1. **GET** `/api/public/objects/get-all` - Mendapatkan semua objek publik.
2. **GET** `/api/public/objects/get-by-id/:id` - Mendapatkan objek publik berdasarkan ID.

### **Penggunaan API di Postman**

Berikut cara penggunaan masing-masing API di Postman berdasarkan rute

---

### **Rute Admin Kategori (`/api/categories`)**

#### **1. POST `/api/categories/create`**
- **Tujuan:** Membuat kategori baru.
- **Metode:** POST  
- **Headers:**
  - `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "name": "Kategori Baru",
    "description": "Deskripsi kategori"
  }
  ```
- **Response:**
  - **200 OK:** Jika kategori berhasil dibuat.
  - **400 Bad Request:** Jika input tidak valid.

---

#### **2. GET `/api/categories/get-all`**
- **Tujuan:** Mendapatkan semua kategori.
- **Metode:** GET
- **Headers:** (Opsional)
  - `Authorization: Bearer [token]`
- **Response:**
  - **200 OK:** Berhasil mendapatkan daftar kategori.
  - **500 Internal Server Error:** Jika ada kesalahan server.

---

#### **3. GET `/api/categories/get-by-id/:id`**
- **Tujuan:** Mendapatkan kategori berdasarkan ID.
- **Metode:** GET
- **Params:** 
  - `id`: ID kategori.
- **Contoh URL:** `/api/categories/get-by-id/123`
- **Response:**
  - **200 OK:** Jika kategori ditemukan.
  - **404 Not Found:** Jika kategori tidak ditemukan.

---

#### **4. PUT `/api/categories/update/:id`**
- **Tujuan:** Memperbarui kategori berdasarkan ID.
- **Metode:** PUT
- **Params:** 
  - `id`: ID kategori.
- **Headers:**
  - `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "name": "Kategori Update",
    "description": "Deskripsi kategori baru"
  }
  ```
- **Response:**
  - **200 OK:** Jika kategori berhasil diperbarui.
  - **404 Not Found:** Jika kategori tidak ditemukan.

---

#### **5. DELETE `/api/categories/delete/:id`**
- **Tujuan:** Menghapus kategori berdasarkan ID.
- **Metode:** DELETE
- **Params:** 
  - `id`: ID kategori.
- **Response:**
  - **200 OK:** Jika kategori berhasil dihapus.
  - **404 Not Found:** Jika kategori tidak ditemukan.

---

### **Rute Admin Objek (`/api/objects`)**

#### **1. POST `/api/objects/create`**
- **Tujuan:** Membuat objek baru.
- **Metode:** POST
- **Headers:**
  - `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "name": "Objek Baru",
    "category_id": 1,
    "description": "Deskripsi objek",
    "price": 50000
  }
  ```
- **Response:**
  - **200 OK:** Jika objek berhasil dibuat.
  - **400 Bad Request:** Jika input tidak valid.

---

#### **2. GET `/api/objects/get-all`**
- **Tujuan:** Mendapatkan semua objek.
- **Metode:** GET
- **Response:**
  - **200 OK:** Berhasil mendapatkan daftar objek.
  - **500 Internal Server Error:** Jika ada kesalahan server.

---

#### **3. GET `/api/objects/get-by-id/:id`**
- **Tujuan:** Mendapatkan objek berdasarkan ID.
- **Metode:** GET
- **Params:** 
  - `id`: ID objek.
- **Contoh URL:** `/api/objects/get-by-id/456`
- **Response:**
  - **200 OK:** Jika objek ditemukan.
  - **404 Not Found:** Jika objek tidak ditemukan.

---

#### **4. PUT `/api/objects/update/:id`**
- **Tujuan:** Memperbarui objek berdasarkan ID.
- **Metode:** PUT
- **Params:** 
  - `id`: ID objek.
- **Headers:**
  - `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "name": "Objek Update",
    "category_id": 2,
    "description": "Deskripsi baru",
    "price": 75000
  }
  ```
- **Response:**
  - **200 OK:** Jika objek berhasil diperbarui.
  - **404 Not Found:** Jika objek tidak ditemukan.

---

#### **5. DELETE `/api/objects/delete/:id`**
- **Tujuan:** Menghapus objek berdasarkan ID.
- **Metode:** DELETE
- **Params:** 
  - `id`: ID objek.
- **Response:**
  - **200 OK:** Jika objek berhasil dihapus.
  - **404 Not Found:** Jika objek tidak ditemukan.

---

#### **6. POST `/api/objects/generate-qr/:id`**
- **Tujuan:** Menghasilkan atau memperbarui QR Code untuk objek.
- **Metode:** POST
- **Params:** 
  - `id`: ID objek.
- **Response:**
  - **200 OK:** Jika QR Code berhasil dibuat.
  - **404 Not Found:** Jika objek tidak ditemukan.

---

### **Rute Objek Publik (`/api/public`)**

#### **1. GET `/api/public/objects/get-all`**
- **Tujuan:** Mendapatkan semua objek publik.
- **Metode:** GET
- **Response:**
  - **200 OK:** Berhasil mendapatkan daftar objek publik.
  - **500 Internal Server Error:** Jika ada kesalahan server.

---

#### **2. GET `/api/public/objects/get-by-id/:id`**
- **Tujuan:** Mendapatkan objek publik berdasarkan ID.
- **Metode:** GET
- **Params:** 
  - `id`: ID objek publik.
- **Contoh URL:** `/api/public/objects/get-by-id/789`
- **Response:**
  - **200 OK:** Jika objek ditemukan.
  - **404 Not Found:** Jika objek tidak ditemukan.

---
