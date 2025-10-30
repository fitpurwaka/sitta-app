// Data dari data.js sudah tersedia sebagai variable global: dataBahanAjar

// Copy data ke variable lokal untuk manipulasi
let stokData = [];

// Load data dari dataBahanAjar saat halaman load
window.addEventListener('DOMContentLoaded', function() {
    // Copy data dari data.js
    stokData = JSON.parse(JSON.stringify(dataBahanAjar)); // Deep copy
    loadTabelStok();
});

// Variable untuk mode edit
let editIndex = -1;

// FUNGSI 1: LOAD DATA KE TABEL (WAJIB!) - Diubah
function loadTabelStok() {
    const tbody = document.getElementById('tbodyStok');
    tbody.innerHTML = ''; // Clear table
    
    stokData.forEach((item, index) => {
        const row = tbody.insertRow();
        
        // Cek apakah stok rendah untuk styling
        const isStokRendah = item.stok < 200;
        if (isStokRendah) {
            row.classList.add('row-warning');
        }
        
        // Struktur kolom tabel
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.kodeBarang}</td>
            <td>${item.namaBarang}</td>
            <td>${item.jenisBarang}</td>
            <td><span class="badge-stok ${isStokRendah ? 'stok-rendah' : 'stok-aman'}">${item.stok}</span></td>
            <td>${item.kodeLokasi}</td>
            <td>
                <img src="${item.cover}" alt="Cover ${item.kodeBarang}" class="cover-thumbnail" onerror="this.onerror=null;this.src='asset/default.jpg';">
            </td>
            <td>
                <button class="btn-edit" onclick="editStok(${index})" title="Edit">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="btn-delete" onclick="hapusStok(${index})" title="Hapus">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="btn-view" onclick="lihatDetail(${index})" title="Detail">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
    });
}


// FUNGSI 3: TAMBAH STOK BARU (Tidak Berubah)
document.getElementById('btnTambahStok').addEventListener('click', function() {
    editIndex = -1; // Reset mode
    document.getElementById('modalTitle').textContent = '➕ Tambah Stok Baru';
    document.getElementById('formStok').reset();
    document.getElementById('inputKodeBarang').disabled = false;
    document.getElementById('modalStok').classList.add('show');
});

// FUNGSI 4: SUBMIT FORM (TAMBAH/EDIT) - Diubah: Menyesuaikan Default Cover Path
document.getElementById('formStok').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Cari data lama jika mode edit, untuk mempertahankan cover lama
    const coverLama = editIndex !== -1 ? stokData[editIndex].cover : 'asset/default.jpg'; 

    const dataBaru = {
        kodeBarang: document.getElementById('inputKodeBarang').value.toUpperCase(),
        namaBarang: document.getElementById('inputNama').value,
        jenisBarang: document.getElementById('inputJenis').value,
        edisi: parseInt(document.getElementById('inputEdisi').value),
        stok: parseInt(document.getElementById('inputStok').value),
        kodeLokasi: document.getElementById('inputLokasi').value.toUpperCase(),
        cover: coverLama // Gunakan cover lama jika edit, atau default jika tambah baru
    };
    
    if (!validasiForm(dataBaru)) {
        return;
    }
    
    if (editIndex === -1) {
        const isDuplicate = stokData.some(item => item.kodeBarang === dataBaru.kodeBarang);
        if (isDuplicate) {
            alert('❌ Kode Barang sudah ada! Gunakan kode yang berbeda.');
            return;
        }
        
        stokData.push(dataBaru);
        alert('✅ Stok berhasil ditambahkan!');
    } else {
        stokData[editIndex] = dataBaru;
        alert('✅ Stok berhasil diupdate!');
    }
    
    loadTabelStok();
    document.getElementById('modalStok').classList.remove('show');
});

// FUNGSI 5: VALIDASI FORM (Tidak Berubah)
function validasiForm(data) {
    const regexKode = /^[A-Z]{4}\d{4}$/;
    if (!regexKode.test(data.kodeBarang)) {
        alert('❌ Format Kode Barang salah! Harus 4 huruf besar + 4 angka (contoh: EKMA4216)');
        document.getElementById('inputKodeBarang').focus();
        return false;
    }
    if (data.namaBarang.trim().length < 5) {
        alert('❌ Nama Bahan Ajar minimal 5 karakter!');
        document.getElementById('inputNama').focus();
        return false;
    }
    if (data.stok < 0) {
        alert('❌ Jumlah stok tidak boleh negatif!');
        document.getElementById('inputStok').focus();
        return false;
    }
    if (data.kodeLokasi.trim() === '') {
        alert('❌ Kode Lokasi tidak boleh kosong!');
        document.getElementById('inputLokasi').focus();
        return false;
    }
    return true;
}

// FUNGSI 6: EDIT STOK (Tidak Berubah)
function editStok(index) {
    editIndex = index;
    const item = stokData[index];
    
    document.getElementById('inputKodeBarang').value = item.kodeBarang;
    document.getElementById('inputKodeBarang').disabled = true;
    document.getElementById('inputNama').value = item.namaBarang;
    document.getElementById('inputJenis').value = item.jenisBarang;
    document.getElementById('inputEdisi').value = item.edisi;
    document.getElementById('inputStok').value = item.stok;
    document.getElementById('inputLokasi').value = item.kodeLokasi;
    
    document.getElementById('modalTitle').textContent = '✏️ Edit Stok';
    document.getElementById('modalStok').classList.add('show');
}

// FUNGSI 7: HAPUS STOK (Tidak Berubah)
function hapusStok(index) {
    const item = stokData[index];
    if (confirm(`Apakah Anda yakin ingin menghapus:\n\n${item.kodeBarang} - ${item.namaBarang}?`)) {
        stokData.splice(index, 1);
        loadTabelStok();
        alert('✅ Stok berhasil dihapus!');
    }
}

// FUNGSI 8: LIHAT DETAIL - Diubah: Menampilkan Cover
function lihatDetail(index) {
    const item = stokData[index];
    
    // BARU: Isi Cover di Modal Detail
    const detailCover = document.getElementById('detailCover');
    detailCover.src = item.cover;
    detailCover.alt = `Cover ${item.namaBarang}`;
    
    // Isi konten modal detail
    document.getElementById('detailKode').textContent = item.kodeBarang;
    document.getElementById('detailNama').textContent = item.namaBarang;
    document.getElementById('detailJenis').textContent = item.jenisBarang;
    document.getElementById('detailEdisi').textContent = item.edisi;
    document.getElementById('detailStok').textContent = item.stok;
    document.getElementById('detailLokasi').textContent = item.kodeLokasi;
    
    // Tampilkan modal detail
    document.getElementById('modalDetail').classList.add('show');
}

// --- MODAL HANDLER UNTUK SEMUA MODAL --- (Tidak Berubah)

// 1. Tombol Close (x) dan Batal di Modal Stok
document.querySelectorAll('.modal-stok-close').forEach(btn => {
    btn.onclick = function() {
        document.getElementById('modalStok').classList.remove('show');
    }
});

// 2. Tombol Close (x) dan Tutup di Modal Detail
document.querySelectorAll('.modal-detail-close').forEach(btn => {
    btn.onclick = function() {
        document.getElementById('modalDetail').classList.remove('show');
    }
});

// 3. Close saat klik di luar area modal (Backdrop)
window.onclick = function(event) {
    if (event.target === document.getElementById('modalStok')) {
        document.getElementById('modalStok').classList.remove('show');
    }
    if (event.target === document.getElementById('modalDetail')) {
        document.getElementById('modalDetail').classList.remove('show');
    }
}