// Cek apakah user sudah login
if (!localStorage.getItem('isLoggedIn')) {
    alert('⚠️ Anda belum login! Silakan login terlebih dahulu.');
    window.location.href = 'login.html';
}

// Ambil data user dari localStorage
const userName = localStorage.getItem('userName');
const userRole = localStorage.getItem('userRole');
const userLokasi = localStorage.getItem('userLokasi');

// GREETING BERDASARKAN WAKTU (WAJIB!)
function setGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = '';
    let icon = '';
    
    if (hour >= 5 && hour < 12) {
        greeting = 'Selamat Pagi';
    } else if (hour >= 12 && hour < 15) {
        greeting = 'Selamat Siang';
    } else if (hour >= 15 && hour < 18) {
        greeting = 'Selamat Sore';
    } else {
        greeting = 'Selamat Malam';
    }
    
    // Tampilkan greeting dengan info user
    document.getElementById('greeting').innerHTML = `
        <h2>${icon} ${greeting}, ${userName}!</h2>
        <p style="color: #d4d4d4ff;">
            <strong>Role:</strong> ${userRole} | 
            <strong>Lokasi:</strong> ${userLokasi}
        </p>
    `;
}

// Panggil saat halaman load
window.addEventListener('DOMContentLoaded', setGreeting);

// Update waktu setiap menit (optional)
setInterval(setGreeting, 60000);

// Logout function
document.getElementById('logoutBtn').addEventListener('click', function() {
    if (confirm('❓ Apakah Anda yakin ingin logout?')) {
        // Hapus semua data session
        localStorage.clear();
        
        alert('✅ Logout berhasil!');
        
        // Redirect ke login
        window.location.href = 'login.html';
    }
});

// Dropdown menu toggle
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const dropdown = this.nextElementSibling;
        
        // Toggle display
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        } else {
            // Close other dropdowns
            document.querySelectorAll('.dropdown').forEach(d => {
                d.style.display = 'none';
            });
            dropdown.style.display = 'block';
        }
    });
});

// Close dropdown when click outside
window.addEventListener('click', function(e) {
    if (!e.target.matches('.dropdown-toggle')) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    }
});

// Load statistik dashboard (optional - kreativitas)
function loadDashboardStats() {
    // Hitung dari data
    const totalBahanAjar = dataBahanAjar.length;
    const totalStok = dataBahanAjar.reduce((sum, item) => sum + item.stok, 0);
    const stokRendah = dataBahanAjar.filter(item => item.stok < 200).length;
    
    // Tampilkan di card
    if (document.getElementById('totalBahanAjar')) {
        document.getElementById('totalBahanAjar').textContent = totalBahanAjar;
    }
    if (document.getElementById('totalStokKeseluruhan')) {
        document.getElementById('totalStokKeseluruhan').textContent = totalStok.toLocaleString('id-ID');
    }
    if (document.getElementById('itemStokRendah')) {
        document.getElementById('itemStokRendah').textContent = stokRendah;
    }
}

// Panggil saat load
loadDashboardStats();