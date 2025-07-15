-- Sample queries untuk testing dan reporting

-- 1. Lihat semua anak dengan status stunting terbaru
SELECT 
    nik,
    nama_lengkap,
    tanggal_lahir,
    CASE jenis_kelamin 
        WHEN 'L' THEN 'Laki-laki' 
        WHEN 'P' THEN 'Perempuan' 
    END as jenis_kelamin,
    umur_bulan_sekarang,
    tinggi_badan,
    berat_badan,
    status_stunting,
    tanggal_pengukuran
FROM v_children_latest_measurement
WHERE status_stunting = 'Stunting'
ORDER BY tanggal_pengukuran DESC;

-- 2. Statistik stunting per bulan
SELECT 
    bulan,
    total_pengukuran,
    jumlah_stunting,
    jumlah_normal,
    CONCAT(persentase_stunting, '%') as persentase_stunting
FROM v_monthly_statistics
ORDER BY bulan DESC
LIMIT 6;

-- 3. Anak yang perlu follow-up (stunting berulang)
SELECT 
    c.nik,
    c.nama_lengkap,
    COUNT(m.id) as jumlah_pengukuran_stunting,
    MAX(m.tanggal_pengukuran) as pengukuran_terakhir
FROM children c
JOIN measurements m ON c.id = m.child_id
WHERE m.status_stunting = 'Stunting'
GROUP BY c.id, c.nik, c.nama_lengkap
HAVING COUNT(m.id) >= 2
ORDER BY jumlah_pengukuran_stunting DESC;

-- 4. Pertumbuhan anak dalam 3 bulan terakhir
SELECT 
    nik,
    nama_lengkap,
    tanggal_pengukuran,
    tinggi_badan,
    berat_badan,
    status_stunting,
    COALESCE(pertumbuhan_tinggi, 0) as pertumbuhan_tinggi_cm,
    COALESCE(pertumbuhan_berat, 0) as pertumbuhan_berat_kg
FROM v_growth_tracking
WHERE tanggal_pengukuran >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
ORDER BY nama_lengkap, tanggal_pengukuran;

-- 5. Ranking posyandu berdasarkan kasus stunting
SELECT 
    p.nama_posyandu,
    COUNT(DISTINCT c.id) as total_anak,
    SUM(CASE WHEN m.status_stunting = 'Stunting' THEN 1 ELSE 0 END) as kasus_stunting,
    ROUND((SUM(CASE WHEN m.status_stunting = 'Stunting' THEN 1 ELSE 0 END) / COUNT(m.id)) * 100, 2) as persentase_stunting
FROM posyandu p
LEFT JOIN users u ON p.id = u.posyandu_id
LEFT JOIN measurements m ON u.nama_lengkap = m.petugas
LEFT JOIN children c ON m.child_id = c.id
WHERE m.tanggal_pengukuran >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
GROUP BY p.id, p.nama_posyandu
ORDER BY persentase_stunting DESC;

-- 6. Cari anak berdasarkan NIK atau nama
SELECT 
    c.nik,
    c.nama_lengkap,
    c.tanggal_lahir,
    CASE c.jenis_kelamin 
        WHEN 'L' THEN 'Laki-laki' 
        WHEN 'P' THEN 'Perempuan' 
    END as jenis_kelamin,
    m.tanggal_pengukuran,
    m.tinggi_badan,
    m.berat_badan,
    m.status_stunting
FROM children c
LEFT JOIN measurements m ON c.id = m.child_id
WHERE c.nik LIKE '%3201234567890123%' 
   OR c.nama_lengkap LIKE '%Andi%'
ORDER BY c.nama_lengkap, m.tanggal_pengukuran DESC;

-- 7. Laporan bulanan untuk bulan tertentu
SELECT 
    c.nik,
    c.nama_lengkap,
    CASE c.jenis_kelamin 
        WHEN 'L' THEN 'Laki-laki' 
        WHEN 'P' THEN 'Perempuan' 
    END as jenis_kelamin,
    m.tanggal_pengukuran,
    m.tinggi_badan,
    m.berat_badan,
    m.umur_bulan,
    m.status_stunting,
    m.z_score_tb_u,
    m.z_score_bb_tb,
    m.petugas
FROM children c
JOIN measurements m ON c.id = m.child_id
WHERE DATE_FORMAT(m.tanggal_pengukuran, '%Y-%m') = '2024-01'
ORDER BY m.tanggal_pengukuran DESC, c.nama_lengkap;
