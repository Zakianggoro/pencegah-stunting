-- Additional indexes for better performance

-- Index untuk pencarian berdasarkan rentang tanggal
CREATE INDEX idx_measurements_date_range ON measurements(tanggal_pengukuran, status_stunting);

-- Index untuk pencarian berdasarkan umur
CREATE INDEX idx_measurements_age ON measurements(umur_bulan, status_stunting);

-- Index untuk join yang sering digunakan
CREATE INDEX idx_measurements_child_date ON measurements(child_id, tanggal_pengukuran DESC);

-- Index untuk pencarian text
CREATE FULLTEXT INDEX idx_children_nama_fulltext ON children(nama_lengkap);

-- Index composite untuk reporting
CREATE INDEX idx_measurements_reporting ON measurements(tanggal_pengukuran, status_stunting, child_id);

-- Analyze tables untuk optimasi query
ANALYZE TABLE children;
ANALYZE TABLE measurements;
ANALYZE TABLE posyandu;
ANALYZE TABLE users;
