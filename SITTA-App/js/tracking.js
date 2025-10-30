// Data tracking dari data.js: dataTracking

// Form submit handler
document.getElementById('formTracking').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nomorDO = document.getElementById('nomorDO').value.trim();
    
    // Validasi input tidak kosong
    if (nomorDO === '') {
        alert('❌ Nomor Delivery Order tidak boleh kosong!');
        return;
    }
    
    // Cari data dari dataTracking object
    const hasil = dataTracking[nomorDO];
    
    if (hasil) {
        // Data ditemukan
        tampilkanHasil(hasil);
        document.getElementById('hasilTracking').style.display = 'block';
        document.getElementById('alertNotFound').style.display = 'none';
    } else {
        // Tidak ditemukan - ALERT (WAJIB!)
        document.getElementById('hasilTracking').style.display = 'none';
        document.getElementById('alertNotFound').style.display = 'block';
        
        // Alert box
        alert(`❌ Nomor Delivery Order "${nomorDO}" tidak ditemukan!`);
    }
});

function tampilkanHasil(data) {
    // Isi data dasar
    document.getElementById('namaMahasiswa').textContent = data.nama;
    document.getElementById('displayNomorDO').textContent = data.nomorDO;
    document.getElementById('ekspedisi').textContent = data.ekspedisi;
    document.getElementById('tanggalKirim').textContent = formatTanggal(data.tanggalKirim);
    document.getElementById('jenisPaket').textContent = data.paket;
    document.getElementById('totalPembayaran').textContent = data.total;
    
    // Hitung progress berdasarkan status
    let progress = 0;
    let statusColor = '';
    
    switch(data.status) {
        case 'Diproses':
            progress = 25;
            statusColor = '#17a2b8'; // biru
            break;
        case 'Dikirim':
            progress = 50;
            statusColor = '#ffc107'; // kuning
            break;
        case 'Dalam Perjalanan':
            progress = 75;
            statusColor = '#fd7e14'; // orange
            break;
        case 'Terkirim':
            progress = 100;
            statusColor = '#28a745'; // hijau
            break;
        default:
            progress = 10;
            statusColor = '#6c757d'; // abu
    }
    
    // Update progress bar (WAJIB!)
    const progressFill = document.getElementById('progressFill');
    progressFill.style.width = progress + '%';
    progressFill.style.backgroundColor = statusColor;
    progressFill.textContent = progress + '%';
    
    // Status text
    document.getElementById('statusText').innerHTML = `
        <span style="color: ${statusColor}; font-weight: bold; font-size: 18px;">
            ${data.status}
        </span>
    `;
    
    // Timeline Perjalanan (MANIPULASI DOM - PENTING!)
    const timelineContainer = document.getElementById('timelineContainer');
    timelineContainer.innerHTML = ''; // Clear previous
    
    // Loop data perjalanan
    data.perjalanan.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        // Highlight item terakhir (status terkini)
        if (index === data.perjalanan.length - 1) {
            timelineItem.classList.add('timeline-active');
        }
        
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <p class="timeline-date">${formatDateTime(item.waktu)}</p>
                <p class="timeline-status">${item.keterangan}</p>
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
    
    // Scroll ke hasil
    document.getElementById('hasilTracking').scrollIntoView({ behavior: 'smooth' });
}

// Helper function: Format tanggal
function formatTanggal(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
}

// Helper function: Format datetime
function formatDateTime(datetimeString) {
    const date = new Date(datetimeString);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleString('id-ID', options);
}

// Tombol clear untuk reset form
document.getElementById('btnClearTracking')?.addEventListener('click', function() {
    document.getElementById('formTracking').reset();
    document.getElementById('hasilTracking').style.display = 'none';
    document.getElementById('alertNotFound').style.display = 'none';
});