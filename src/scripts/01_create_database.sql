-- Create database for Stunting Prevention App
-- Database: stunting_prevention

-- Create database (uncomment if needed)
-- CREATE DATABASE stunting_prevention;
-- USE stunting_prevention;

-- Create children table (master data anak)
CREATE TABLE children (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nik VARCHAR(16) UNIQUE NOT NULL,
    nama_lengkap VARCHAR(100) NOT NULL,
    tanggal_lahir DATE NOT NULL,
    jenis_kelamin ENUM('L', 'P') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for better performance
    INDEX idx_nik (nik),
    INDEX idx_nama (nama_lengkap),
    INDEX idx_tanggal_lahir (tanggal_lahir)
);

-- Create measurements table (data pengukuran per bulan)
CREATE TABLE measurements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    child_id INT NOT NULL,
    tanggal_pengukuran DATE NOT NULL,
    tinggi_badan DECIMAL(5,2) NOT NULL, -- cm (max 999.99)
    berat_badan DECIMAL(5,2) NOT NULL,  -- kg (max 999.99)
    umur_bulan INT NOT NULL,
    status_stunting ENUM('Normal', 'Stunting') NOT NULL,
    z_score_tb_u DECIMAL(5,2), -- Z-Score Tinggi Badan menurut Umur
    z_score_bb_tb DECIMAL(5,2), -- Z-Score Berat Badan menurut Tinggi Badan
    catatan TEXT,
    petugas VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_child_id (child_id),
    INDEX idx_tanggal_pengukuran (tanggal_pengukuran),
    INDEX idx_status_stunting (status_stunting),
    
    -- Unique constraint to prevent duplicate measurements on same date
    UNIQUE KEY unique_child_date (child_id, tanggal_pengukuran)
);

-- Create posyandu table (optional - untuk multi posyandu)
CREATE TABLE posyandu (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama_posyandu VARCHAR(100) NOT NULL,
    alamat TEXT,
    kelurahan VARCHAR(50),
    kecamatan VARCHAR(50),
    kota VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table (untuk sistem login petugas)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nama_lengkap VARCHAR(100) NOT NULL,
    role ENUM('admin', 'bidan', 'kader') DEFAULT 'kader',
    posyandu_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (posyandu_id) REFERENCES posyandu(id),
    INDEX idx_username (username),
    INDEX idx_role (role)
);
