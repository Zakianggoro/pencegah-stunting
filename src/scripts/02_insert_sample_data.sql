-- Insert sample data for testing

-- Insert sample posyandu
INSERT INTO posyandu (nama_posyandu, alamat, kelurahan, kecamatan, kota) VALUES
('Posyandu Melati 1', 'Jl. Melati No. 15', 'Sukamaju', 'Cikarang Utara', 'Bekasi'),
('Posyandu Mawar 2', 'Jl. Mawar No. 8', 'Sukamaju', 'Cikarang Utara', 'Bekasi'),
('Posyandu Anggrek 3', 'Jl. Anggrek No. 22', 'Sukamaju', 'Cikarang Utara', 'Bekasi');

-- Insert sample users
INSERT INTO users (username, password_hash, nama_lengkap, role, posyandu_id) VALUES
('admin', '$2b$10$example_hash_admin', 'Administrator', 'admin', 1),
('bidan_sari', '$2b$10$example_hash_bidan', 'Sari Wijayanti, A.Md.Keb', 'bidan', 1),
('kader_ani', '$2b$10$example_hash_kader', 'Ani Suryani', 'kader', 1),
('bidan_rina', '$2b$10$example_hash_bidan2', 'Rina Marlina, A.Md.Keb', 'bidan', 2);

-- Insert sample children data
INSERT INTO children (nik, nama_lengkap, tanggal_lahir, jenis_kelamin) VALUES
('3201234567890123', 'Andi Pratama', '2022-03-15', 'L'),
('3201234567890124', 'Sari Indah Putri', '2022-08-20', 'P'),
('3201234567890125', 'Budi Santoso', '2021-02-10', 'L'),
('3201234567890126', 'Maya Sari Dewi', '2021-11-05', 'P'),
('3201234567890127', 'Rudi Hartono', '2020-06-18', 'L'),
('3201234567890128', 'Lina Anggraini', '2022-01-25', 'P'),
('3201234567890129', 'Doni Setiawan', '2021-09-12', 'L'),
('3201234567890130', 'Fitri Ramadhani', '2020-12-08', 'P');

-- Insert sample measurements for January 2024
INSERT INTO measurements (child_id, tanggal_pengukuran, tinggi_badan, berat_badan, umur_bulan, status_stunting, z_score_tb_u, z_score_bb_tb, petugas) VALUES
(1, '2024-01-15', 85.5, 12.3, 22, 'Normal', -0.5, 0.2, 'Sari Wijayanti'),
(2, '2024-01-12', 75.2, 8.9, 17, 'Stunting', -2.3, -1.1, 'Sari Wijayanti'),
(3, '2024-01-10', 92.1, 14.2, 35, 'Normal', 0.1, 0.5, 'Ani Suryani'),
(4, '2024-01-08', 82.3, 10.8, 26, 'Stunting', -2.1, -0.8, 'Sari Wijayanti'),
(5, '2024-01-05', 98.7, 16.5, 43, 'Normal', 0.3, 0.7, 'Ani Suryani'),
(6, '2024-01-18', 78.2, 9.5, 24, 'Normal', -1.2, -0.3, 'Sari Wijayanti'),
(7, '2024-01-20', 88.5, 13.1, 28, 'Normal', -0.8, 0.1, 'Ani Suryani'),
(8, '2024-01-22', 95.3, 15.2, 37, 'Normal', -0.2, 0.4, 'Sari Wijayanti');

-- Insert sample measurements for December 2023
INSERT INTO measurements (child_id, tanggal_pengukuran, tinggi_badan, berat_badan, umur_bulan, status_stunting, z_score_tb_u, z_score_bb_tb, petugas) VALUES
(1, '2023-12-20', 84.8, 12.0, 21, 'Normal', -0.6, 0.1, 'Sari Wijayanti'),
(2, '2023-12-18', 74.5, 8.7, 16, 'Stunting', -2.4, -1.2, 'Sari Wijayanti'),
(3, '2023-12-15', 91.2, 13.8, 34, 'Normal', 0.0, 0.3, 'Ani Suryani'),
(4, '2023-12-12', 81.5, 10.5, 25, 'Stunting', -2.2, -0.9, 'Sari Wijayanti'),
(5, '2023-12-10', 97.8, 16.0, 42, 'Normal', 0.2, 0.6, 'Ani Suryani');

-- Insert sample measurements for November 2023
INSERT INTO measurements (child_id, tanggal_pengukuran, tinggi_badan, berat_badan, umur_bulan, status_stunting, z_score_tb_u, z_score_bb_tb, petugas) VALUES
(1, '2023-11-15', 84.0, 11.8, 20, 'Normal', -0.7, 0.0, 'Sari Wijayanti'),
(2, '2023-11-12', 73.8, 8.5, 15, 'Stunting', -2.5, -1.3, 'Sari Wijayanti'),
(3, '2023-11-10', 90.5, 13.5, 33, 'Normal', -0.1, 0.2, 'Ani Suryani'),
(4, '2023-11-08', 80.8, 10.2, 24, 'Stunting', -2.3, -1.0, 'Sari Wijayanti'),
(5, '2023-11-05', 96.9, 15.7, 41, 'Normal', 0.1, 0.5, 'Ani Suryani');
