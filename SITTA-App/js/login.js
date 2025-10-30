/* ===========================
   LOGIN PAGE JAVASCRIPT
   =========================== */

console.log('🔄 Login.js loaded');

// Cek apakah data.js sudah load
if (typeof dataPengguna === 'undefined') {
    console.error('❌ ERROR: dataPengguna tidak ditemukan! Pastikan data.js di-load terlebih dahulu.');
    alert('ERROR: Data tidak ditemukan. Refresh halaman atau hubungi admin.');
} else {
    console.log('✅ dataPengguna loaded:', dataPengguna.length, 'users');
}

// Fungsi validasi email
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Fungsi show error
function showError(elementId, message) {
    var errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Tunggu sampai DOM ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 DOM loaded, setting up login form...');
    
    var loginForm = document.getElementById('loginForm');
    
    if (!loginForm) {
        console.error('❌ Form login tidak ditemukan!');
        return;
    }
    
    // Event listener untuk form submit
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('🔄 Form submitted');
        
        var email = document.getElementById('email').value.trim();
        var password = document.getElementById('password').value;
        
        console.log('📧 Email:', email);
        console.log('🔑 Password:', password.replace(/./g, '*')); // Hide password in console
        
        // Reset error messages
        var emailError = document.getElementById('emailError');
        var passwordError = document.getElementById('passwordError');
        
        if (emailError) {
            emailError.textContent = '';
            emailError.style.display = 'none';
        }
        if (passwordError) {
            passwordError.textContent = '';
            passwordError.style.display = 'none';
        }
        
        // Validasi email format
        if (!validateEmail(email)) {
            console.log('❌ Email format invalid');
            showError('emailError', '❌ Format email tidak valid');
            document.getElementById('email').focus();
            return;
        }
        
        // Validasi password tidak kosong
        if (password.length === 0) {
            console.log('❌ Password kosong');
            showError('passwordError', '❌ Password tidak boleh kosong');
            document.getElementById('password').focus();
            return;
        }
        
        // Debug: Tampilkan semua user yang ada
        console.log('📋 Checking users:', dataPengguna);
        
        // Cek kredensial
        var user = null;
        for (var i = 0; i < dataPengguna.length; i++) {
            console.log('Checking user:', dataPengguna[i].email, '==', email);
            if (dataPengguna[i].email === email && dataPengguna[i].password === password) {
                user = dataPengguna[i];
                console.log('✅ User found!', user);
                break;
            }
        }
        
        if (user) {
            // Login berhasil
            console.log('✅ Login berhasil untuk:', user.nama);
            
            alert('✅ Login berhasil!\n\nSelamat datang, ' + user.nama + '\nRole: ' + user.role + '\nLokasi: ' + user.lokasi);
            
            // Simpan data user ke localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', user.id);
            localStorage.setItem('userName', user.nama);
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('userLokasi', user.lokasi);
            
            console.log('💾 Data saved to localStorage');
            
            // Redirect ke dashboard
            console.log('🔄 Redirecting to dashboard...');
            setTimeout(function() {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            // Login gagal
            console.log('❌ Login gagal - kredensial salah');
            alert('❌ Email atau password yang Anda masukkan salah');
            
            // Highlight field yang error
            document.getElementById('email').style.borderColor = '#dc3545';
            document.getElementById('password').style.borderColor = '#dc3545';
            
            // Reset border color after 3 seconds
            setTimeout(function() {
                document.getElementById('email').style.borderColor = '';
                document.getElementById('password').style.borderColor = '';
            }, 3000);
        }
    });
    
    // ===========================
    // MODAL LUPA PASSWORD
    // ===========================
    
    var modalLupaPassword = document.getElementById('modalLupaPassword');
    var btnLupaPassword = document.getElementById('lupaPasswordBtn');
    var closeLupaPassword = document.getElementById('closeLupaPassword');
    var btnBatalLupa = document.getElementById('btnBatalLupa');
    
    if (btnLupaPassword) {
        btnLupaPassword.onclick = function(e) {
            e.preventDefault();
            if (modalLupaPassword) {
                modalLupaPassword.style.display = 'block';
            }
        };
    }
    
    if (closeLupaPassword) {
        closeLupaPassword.onclick = function() {
            if (modalLupaPassword) {
                modalLupaPassword.style.display = 'none';
            }
        };
    }
    
    if (btnBatalLupa) {
        btnBatalLupa.onclick = function() {
            if (modalLupaPassword) {
                modalLupaPassword.style.display = 'none';
            }
        };
    }
    
    // Form Lupa Password Submit
    var formLupaPassword = document.getElementById('formLupaPassword');
    if (formLupaPassword) {
        formLupaPassword.addEventListener('submit', function(e) {
            e.preventDefault();
            var emailReset = document.getElementById('emailReset').value;
            
            // Cek apakah email terdaftar
            var userExists = false;
            for (var i = 0; i < dataPengguna.length; i++) {
                if (dataPengguna[i].email === emailReset) {
                    userExists = true;
                    break;
                }
            }
            
            if (userExists) {
                alert('✅ Link reset password telah dikirim ke ' + emailReset + '\n\nSilakan cek email Anda.');
                modalLupaPassword.style.display = 'none';
                formLupaPassword.reset();
            } else {
                alert('❌ Email ' + emailReset + ' tidak terdaftar dalam sistem!\n\nGunakan email yang sudah terdaftar.');
            }
        });
    }
    
    // ===========================
    // MODAL DAFTAR
    // ===========================
    
    var modalDaftar = document.getElementById('modalDaftar');
    var btnDaftar = document.getElementById('daftarBtn');
    var closeDaftar = document.getElementById('closeDaftar');
    var btnBatalDaftar = document.getElementById('btnBatalDaftar');
    
    if (btnDaftar) {
        btnDaftar.onclick = function(e) {
            e.preventDefault();
            if (modalDaftar) {
                modalDaftar.style.display = 'block';
            }
        };
    }
    
    if (closeDaftar) {
        closeDaftar.onclick = function() {
            if (modalDaftar) {
                modalDaftar.style.display = 'none';
            }
        };
    }
    
    if (btnBatalDaftar) {
        btnBatalDaftar.onclick = function() {
            if (modalDaftar) {
                modalDaftar.style.display = 'none';
            }
        };
    }
    
    // Form Daftar Submit
    var formDaftar = document.getElementById('formDaftar');
    if (formDaftar) {
        formDaftar.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var nama = document.getElementById('namaDaftar').value;
            var email = document.getElementById('emailDaftar').value;
            var password = document.getElementById('passwordDaftar').value;
            var konfirmasiPassword = document.getElementById('konfirmasiPassword').value;
            var role = document.getElementById('roleDaftar').value;
            var lokasi = document.getElementById('lokasiDaftar').value;
            
            // Validasi password match
            if (password !== konfirmasiPassword) {
                alert('❌ Password dan Konfirmasi Password tidak sama!');
                return;
            }
            
            // Validasi panjang password
            if (password.length < 6) {
                alert('❌ Password minimal 6 karakter!');
                return;
            }
            
            // Validasi email belum terdaftar
            var emailExists = false;
            for (var i = 0; i < dataPengguna.length; i++) {
                if (dataPengguna[i].email === email) {
                    emailExists = true;
                    break;
                }
            }
            
            if (emailExists) {
                alert('❌ Email sudah terdaftar! Gunakan email lain.');
                return;
            }
            
            // Validasi email harus @ut.ac.id
            if (email.indexOf('@ut.ac.id') === -1) {
                alert('❌ Email harus menggunakan domain @ut.ac.id');
                return;
            }
            
            // Simulasi pendaftaran
            alert('✅ Pendaftaran berhasil!\n\nNama: ' + nama + '\nEmail: ' + email + '\nRole: ' + role + '\nLokasi: ' + lokasi + '\n\nSilakan login dengan akun Anda.');
            
            modalDaftar.style.display = 'none';
            formDaftar.reset();
            
            // Auto-fill email di form login
            document.getElementById('email').value = email;
            document.getElementById('password').focus();
        });
    }
    
    // ===========================
    // CLOSE MODAL ON OUTSIDE CLICK
    // ===========================
    
    window.onclick = function(event) {
        if (event.target == modalLupaPassword) {
            modalLupaPassword.style.display = 'none';
        }
        if (event.target == modalDaftar) {
            modalDaftar.style.display = 'none';
        }
    };
    
    // ===========================
    // AUTO-FOCUS
    // ===========================
    
    var emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.focus();
    }
    
    // Clear error messages on input
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            var emailError = document.getElementById('emailError');
            if (emailError) {
                emailError.textContent = '';
                emailError.style.display = 'none';
            }
            this.style.borderColor = '';
        });
    }
    
    var passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            var passwordError = document.getElementById('passwordError');
            if (passwordError) {
                passwordError.textContent = '';
                passwordError.style.display = 'none';
            }
            this.style.borderColor = '';
        });
    }
    
    console.log('✅ Login form setup complete!');
});