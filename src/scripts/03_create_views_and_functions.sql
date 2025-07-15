-- Create useful views for reporting

-- View untuk melihat data lengkap anak dengan pengukuran terakhir
CREATE VIEW v_children_latest_measurement AS
SELECT 
    c.id,
    c.nik,
    c.nama_lengkap,
    c.tanggal_lahir,
    c.jenis_kelamin,
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
LEFT JOIN measurements m2 ON c.id = m2.child_id AND m.tanggal_pengukuran < m2.tanggal_pengukuran
WHERE m2.id IS NULL;

-- View untuk statistik bulanan
CREATE VIEW v_monthly_statistics AS
SELECT 
    DATE_FORMAT(tanggal_pengukuran, '%Y-%m') as bulan,
    COUNT(*) as total_pengukuran,
    SUM(CASE WHEN status_stunting = 'Stunting' THEN 1 ELSE 0 END) as jumlah_stunting,
    SUM(CASE WHEN status_stunting = 'Normal' THEN 1 ELSE 0 END) as jumlah_normal,
    ROUND((SUM(CASE WHEN status_stunting = 'Stunting' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) as persentase_stunting
FROM measurements
GROUP BY DATE_FORMAT(tanggal_pengukuran, '%Y-%m')
ORDER BY bulan DESC;

-- View untuk tracking pertumbuhan anak
CREATE VIEW v_growth_tracking AS
SELECT 
    c.nik,
    c.nama_lengkap,
    m.tanggal_pengukuran,
    m.tinggi_badan,
    m.berat_badan,
    m.status_stunting,
    LAG(m.tinggi_badan) OVER (PARTITION BY c.id ORDER BY m.tanggal_pengukuran) as tinggi_sebelumnya,
    LAG(m.berat_badan) OVER (PARTITION BY c.id ORDER BY m.tanggal_pengukuran) as berat_sebelumnya,
    m.tinggi_badan - LAG(m.tinggi_badan) OVER (PARTITION BY c.id ORDER BY m.tanggal_pengukuran) as pertumbuhan_tinggi,
    m.berat_badan - LAG(m.berat_badan) OVER (PARTITION BY c.id ORDER BY m.tanggal_pengukuran) as pertumbuhan_berat
FROM children c
JOIN measurements m ON c.id = m.child_id
ORDER BY c.nama_lengkap, m.tanggal_pengukuran;
