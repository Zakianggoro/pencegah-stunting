-- Update database structure untuk menambahkan nama orang tua dan posyandu

-- Tambahkan kolom nama_orang_tua ke tabel children
ALTER TABLE children 
ADD COLUMN nama_orang_tua VARCHAR(100) NOT NULL AFTER nama_lengkap;

-- Update tabel posyandu dengan data yang spesifik
TRUNCATE TABLE posyandu;
INSERT INTO posyandu (id, nama_posyandu, alamat, kelurahan, kecamatan, kota) VALUES
(1, 'Posyandu 1', 'Jl. Kesehatan No. 1', 'Sukorejo', 'Kecamatan Utama', 'Kota Sehat'),
(2, 'Posyandu 2', 'Jl. Kesehatan No. 2', 'Sukorejo', 'Kecamatan Utama', 'Kota Sehat'),
(3, 'Sukorejo', 'Jl. Sukorejo Raya No. 15', 'Sukorejo', 'Kecamatan Utama', 'Kota Sehat'),
(4, 'Tekik', 'Jl. Tekik Indah No. 8', 'Tekik', 'Kecamatan Utama', 'Kota Sehat');

-- Tambahkan kolom posyandu_id ke tabel measurements
ALTER TABLE measurements 
ADD COLUMN posyandu_id INT AFTER child_id,
ADD FOREIGN KEY (posyandu_id) REFERENCES posyandu(id);

-- Update data sample dengan nama orang tua
UPDATE children SET nama_orang_tua = 'Budi Pratama' WHERE nik = '3201234567890123';
UPDATE children SET nama_orang_tua = 'Dewi Sari' WHERE nik = '3201234567890124';
UPDATE children SET nama_orang_tua = 'Santi Budiarti' WHERE nik = '3201234567890125';
UPDATE children SET nama_orang_tua = 'Rina Maya' WHERE nik = '3201234567890126';
UPDATE children SET nama_orang_tua = 'Hartono Wijaya' WHERE nik = '3201234567890127';
UPDATE children SET nama_orang_tua = 'Lina Anggraini Sr.' WHERE nik = '3201234567890128';
UPDATE children SET nama_orang_tua = 'Doni Setiawan Sr.' WHERE nik = '3201234567890129';
UPDATE children SET nama_orang_tua = 'Fitri Ramadhani Sr.' WHERE nik = '3201234567890130';

-- Update measurements dengan posyandu_id
UPDATE measurements SET posyandu_id = 1 WHERE child_id IN (1, 5, 6);
UPDATE measurements SET posyandu_id = 2 WHERE child_id IN (3, 7);
UPDATE measurements SET posyandu_id = 3 WHERE child_id IN (2, 4);
UPDATE measurements SET posyandu_id = 4 WHERE child_id = 8;

-- Update view untuk include nama orang tua dan posyandu
DROP VIEW IF EXISTS v_children_latest_measurement;
CREATE VIEW v_children_latest_measurement AS
SELECT 
    c.id,
    c.nik,
    c.nama_lengkap,
    c.nama_orang_tua,
    c.tanggal_lahir,
    c.jenis_kelamin,
    p.nama_posyandu,
    TIMESTAMPDIFF(MONTH, c.tanggal_lahir, CURDATE()) as umur_bulan_sekarang,
    m.tanggal_pengukuran,
    m.tinggi_badan,
    m.berat_badan,
    m.umur_bulan as umur_saat_ukur,
    m.status_stunting,
    m.z_score_tb_u,
    m.z_score_bb_tb,
    m.petugas
FROM children c
LEFT JOIN measurements m ON c.id = m.child_id
LEFT JOIN posyandu p ON m.posyandu_id = p.id
LEFT JOIN measurements m2 ON c.id = m2.child_id AND m.tanggal_pengukuran < m2.tanggal_pengukuran
WHERE m2.id IS NULL;

-- Query untuk export CSV format
SELECT 
    c.nik as 'NIK',
    c.nama_lengkap as 'Nama Anak',
    c.nama_orang_tua as 'Nama Orang Tua',
    p.nama_posyandu as 'Posyandu',
    CONCAT(
        FLOOR(m.umur_bulan / 12), ' tahun ', 
        m.umur_bulan % 12, ' bulan'
    ) as 'Usia',
    m.tinggi_badan as 'Tinggi Badan (cm)',
    m.berat_badan as 'Berat Badan (kg)',
    m.status_stunting as 'Status Stunting',
    DATE_FORMAT(m.tanggal_pengukuran, '%d/%m/%Y') as 'Tanggal Pemeriksaan'
FROM children c
JOIN measurements m ON c.id = m.child_id
JOIN posyandu p ON m.posyandu_id = p.id
WHERE DATE_FORMAT(m.tanggal_pengukuran, '%Y-%m') = '2024-01'
ORDER BY m.tanggal_pengukuran DESC, c.nama_lengkap;
