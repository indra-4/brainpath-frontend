export const quizzes = {
  // ── Web Development Quizzes ──────────────────────────────────────
  'html-css-fundamentals': [
    {
      id: 1,
      question: 'Tag HTML5 manakah yang digunakan untuk membuat judul utama atau heading paling penting pada suatu halaman?',
      options: [
        '<h6> - Untuk heading tingkat terendah',
        '<p> - Untuk elemen paragraf biasa',
        '<h1> - Untuk heading tingkat tertinggi / utama',
        '<heading> - Tag tidak valid dalam spesifikasi HTML5'
      ],
      correctAnswer: 2,
      explanation: 'Tag <h1> secara semantik digunakan untuk judul utama halaman yang paling penting. Hanya boleh ada satu <h1> per halaman untuk performa SEO terbaik.'
    },
    {
      id: 2,
      question: 'Properti CSS manakah yang digunakan untuk merubah warna latar belakang sebuah elemen?',
      options: [
        'color - Properti untuk mengubah warna teks',
        'background-color - Properti untuk mengubah warna latar belakang',
        'border-color - Properti untuk warna border luar',
        'bgcolor - Atribut usang HTML, bukan properti standar CSS'
      ],
      correctAnswer: 1,
      explanation: 'Properti background-color dalam CSS digunakan secara eksklusif untuk mengatur warna latar belakang sebuah elemen menggunakan kode hex, RGB, atau nama warna.'
    },
    {
      id: 3,
      question: 'Apa fungsi utama dari properti CSS "display: flex" pada kontainer halaman?',
      options: [
        'Membuat font/teks menjadi miring secara otomatis',
        'Mengaktifkan Flexbox untuk menyusun tata letak (layout) elemen secara fleksibel dan responsif',
        'Menambahkan efek bayangan drop-shadow pada teks dan border',
        'Membulatkan border sudut gambar elemen'
      ],
      correctAnswer: 1,
      explanation: 'display: flex mengaktifkan modul Flexbox Layout, memudahkan perataan dan distribusi ruang di antara elemen-elemen dalam kontainer secara responsif di berbagai ukuran layar.'
    }
  ],

  'javascript-for-beginners': [
    {
      id: 1,
      question: 'Sintaks manakah yang benar untuk menuliskan teks "Hello World" ke konsol JavaScript?',
      options: [
        'print("Hello World")',
        'console.log("Hello World")',
        'response.write("Hello World")',
        'echo "Hello World"'
      ],
      correctAnswer: 1,
      explanation: 'console.log() adalah fungsi bawaan JavaScript untuk mencetak pesan atau mendebug nilai variabel ke dalam tab konsol developer tools browser.'
    },
    {
      id: 2,
      question: 'Keyword manakah yang digunakan untuk mendeklarasikan variabel yang cakupannya bersifat block-scoped dan nilainya DAPAT dirubah kembali?',
      options: [
        'var - memiliki fungsi/global-scope dan rentan terkena hoisting',
        'const - bersifat block-scoped namun nilainya tidak bisa dideklarasikan ulang / konstan',
        'let - bersifat block-scoped dan nilainya bebas dirubah kapan saja',
        'define - bukan merupakan keyword deklarasi variabel standar JavaScript'
      ],
      correctAnswer: 2,
      explanation: 'let diperkenalkan di ES6 sebagai pengganti var untuk cakupan block scope yang aman, di mana nilainya bisa ditimpa atau dirubah di baris kode berikutnya.'
    },
    {
      id: 3,
      question: 'Dalam manipulasi DOM JavaScript, method document.getElementById() digunakan untuk apa?',
      options: [
        'Membuat elemen tag HTML baru di dalam memori dokumen',
        'Mengambil elemen HTML dari halaman berdasarkan nilai unik atribut ID-nya',
        'Mengubah gaya styling CSS secara instan',
        'Menghapus paksa elemen HTML dari struktur DOM aktif'
      ],
      correctAnswer: 1,
      explanation: 'document.getElementById() mencari dokumen aktif dan mengembalikan objek elemen HTML pertama yang memiliki nilai atribut ID yang cocok.'
    }
  ],

  'vue-js-essentials': [
    {
      id: 1,
      question: 'Di Vue 3 Composition API, fungsi manakah yang digunakan untuk membuat data primitif menjadi reaktif?',
      options: [
        'reactive() - Hanya cocok untuk tipe data objek / array',
        'ref() - Membungkus nilai primitif dan mengembalikan objek reaktif dengan properti .value',
        'computed() - Digunakan untuk menghitung nilai turunan berbasis reaktivitas',
        'watch() - Digunakan untuk memantau perubahan state secara asinkron'
      ],
      correctAnswer: 1,
      explanation: 'ref() adalah cara standar Vue 3 untuk mendefinisikan reaktivitas pada tipe data primitif seperti string, number, dan boolean.'
    },
    {
      id: 2,
      question: 'Direktif Vue manakah yang paling tepat digunakan untuk menyembunyikan/menampilkan elemen secara kondisional dari DOM?',
      options: [
        'v-for - Digunakan untuk merender list berulang',
        'v-model - Digunakan untuk data binding dua arah pada input form',
        'v-if - Menyisipkan atau menghapus elemen dari DOM berdasarkan kondisi boolean',
        'v-bind - Digunakan untuk binding atribut HTML secara dinamis'
      ],
      correctAnswer: 2,
      explanation: 'v-if mengevaluasi ekspresi boolean. Jika bernilai false, elemen tersebut benar-benar akan dihapus dari DOM, berbeda dengan v-show yang hanya menyembunyikannya menggunakan display: none.'
    },
    {
      id: 3,
      question: 'Bagaimana cara mengirim data/sinyal dari komponen anak (child) ke komponen induk (parent) di Vue.js?',
      options: [
        'Menggunakan custom events dengan memanggil emit()',
        'Menggunakan binding props secara terbalik',
        'Mengakses data parent langsung menggunakan properti global this.$parent',
        'Menggunakan routing parameter baru'
      ],
      correctAnswer: 0,
      explanation: 'Vue menganut prinsip "Props Down, Events Up". Parent mengirim data lewat props, dan Child mengirimkan sinyal ke atas melalui custom event emit().'
    }
  ],

  'laravel-rest-api-development': [
    {
      id: 1,
      question: 'Di Laravel, dimanakah lokasi file rute default untuk mendefinisikan rute API yang mengembalikan respon JSON?',
      options: [
        'routes/web.php - Khusus halaman web HTML standar',
        'routes/console.php - Khusus perintah CLI Artisan',
        'routes/api.php - Khusus endpoint API dengan prefix /api secara otomatis',
        'app/Http/Kernel.php - File middleware utama sistem'
      ],
      correctAnswer: 2,
      explanation: 'routes/api.php memuat seluruh endpoint API aplikasi Laravel. Secara default menggunakan middleware group api dan mendapat awalan URL /api.'
    },
    {
      id: 2,
      question: 'Untuk mengamankan API dengan autentikasi token modern yang ringan dan cepat di Laravel 11, teknologi bawaan apakah yang direkomendasikan?',
      options: [
        'Laravel Passport - Bagus namun berat karena mengimplementasikan OAuth2 penuh',
        'Laravel Sanctum - Ringan, aman, dan sangat cocok untuk aplikasi SPA/Token API standar',
        'Laravel Breeze - Starter kit UI, bukan sistem autentikasi API token',
        'JWT Auth - Pustaka eksternal pihak ketiga, bukan bawaan resmi Laravel'
      ],
      correctAnswer: 1,
      explanation: 'Laravel Sanctum menyediakan sistem otentikasi token sederhana namun sangat aman untuk SPA (Single Page Applications) dan API eksternal dasar.'
    },
    {
      id: 3,
      question: 'Apa kegunaan utama dari Laravel Eloquent API Resource?',
      options: [
        'Melakukan query data langsung ke database secara asinkron',
        'Melakukan validasi keamanan field input request pengguna',
        'Menjadi layer transformasi untuk memformat respon JSON dari model database secara konsisten',
        'Menghapus data sensitif di database'
      ],
      correctAnswer: 2,
      explanation: 'API Resource bertindak sebagai penengah antara Eloquent Model dan JSON Response, memungkinkan pengembang menyortir dan memformat struktur JSON secara dinamis.'
    }
  ],

  'full-stack-project-build-a-task-manager': [
    {
      id: 1,
      question: 'Dalam arsitektur full-stack modern, bagaimana cara Vue 3 (frontend) berkomunikasi dengan Laravel (backend)?',
      options: [
        'Membaca file database SQLite secara langsung di browser',
        'Mengirimkan HTTP request (GET/POST/PUT) menggunakan API client seperti Axios atau Fetch',
        'Menggunakan Blade template engine bawaan Laravel secara terintegrasi',
        'Mengimpor file controller PHP Laravel secara langsung ke dalam script Vue'
      ],
      correctAnswer: 1,
      explanation: 'Vue 3 berjalan sepenuhnya di sisi browser client, berkomunikasi secara asinkron ke server backend Laravel melalui pertukaran data JSON via Axios/Fetch API.'
    },
    {
      id: 2,
      question: 'Apa tujuan utama dari penggunaan CORS (Cross-Origin Resource Sharing) middleware di Laravel backend?',
      options: [
        'Mengompresi ukuran respon JSON agar lebih hemat kuota',
        'Mengizinkan frontend dari domain/port yang berbeda (misal localhost:5173) mengakses API Laravel secara aman',
        'Membuat cadangan database cadangan secara berkala',
        'Menghindari serangan celah keamanan SQL Injection'
      ],
      correctAnswer: 1,
      explanation: 'Secara default, browser memblokir request lintas asal (cross-origin). CORS dikonfigurasi di Laravel untuk memberikan izin resmi bagi domain frontend tertentu.'
    },
    {
      id: 3,
      question: 'Manakah status code HTTP yang dikembalikan oleh server jika pengguna mencoba mengakses endpoint terproteksi tanpa token otentikasi valid?',
      options: [
        '200 OK - Request berhasil diproses',
        '400 Bad Request - Sintaks request tidak valid',
        '401 Unauthorized - Akses ditolak karena kredensial tidak valid / tidak ada',
        '403 Forbidden - Kredensial ada tapi tidak memiliki hak akses'
      ],
      correctAnswer: 2,
      explanation: 'HTTP 401 Unauthorized menunjukkan bahwa request memerlukan otentikasi pengguna, biasanya dikarenakan token kadaluarsa atau tidak dikirim di header.'
    }
  ],

  // ── Data Science Quizzes ─────────────────────────────────────────
  'python-programming-basics': [
    {
      id: 1,
      question: 'Struktur data bawaan Python manakah yang bersifat mutable (dapat dirubah), terurut, dan didefinisikan menggunakan kurung siku []?',
      options: [
        'Tuple - Bersifat immutable (tidak bisa diubah) menggunakan kurung ()',
        'Dictionary - Struktur pasangan key-value menggunakan kurung {}',
        'Set - Kumpulan elemen unik tak terurut menggunakan kurung {}',
        'List - Struktur data terurut, dinamis, mutable menggunakan kurung []'
      ],
      correctAnswer: 3,
      explanation: 'List adalah tipe data bawaan Python yang sangat fleksibel karena anggotanya dapat ditambahkan, dihapus, atau diubah setelah dibuat.'
    },
    {
      id: 2,
      question: 'Sintaks manakah yang benar untuk mendefinisikan sebuah fungsi baru di Python?',
      options: [
        'function namaFungsi():',
        'def namaFungsi():',
        'void namaFungsi() {}',
        'namaFungsi() ->'
      ],
      correctAnswer: 1,
      explanation: 'Python menggunakan keyword "def" (singkatan dari define) diikuti nama fungsi, tanda kurung, dan titik dua untuk mendefinisikan fungsi.'
    },
    {
      id: 3,
      question: 'Bagaimana cara menangani exception/error di Python agar program tidak langsung terhenti (crash)?',
      options: [
        'Menggunakan blok try-catch',
        'Menggunakan blok try-except',
        'Menggunakan blok kondisional if-else',
        'Menggunakan fungsi penanganan error_handler()'
      ],
      correctAnswer: 1,
      explanation: 'Blok try-except digunakan di Python untuk menangkap pengecualian (exception) saat runtime sehingga program dapat menangani error secara elegan.'
    }
  ],

  'data-analysis-with-pandas': [
    {
      id: 1,
      question: 'Apa nama struktur data utama berdimensi dua (tabular/tabel) yang disediakan oleh pustaka Pandas?',
      options: [
        'Series - Merupakan struktur data satu dimensi (satu kolom saja)',
        'Panel - Struktur data tiga dimensi yang sudah didepresiasi',
        'DataFrame - Struktur data tabular dua dimensi dengan baris dan kolom berlabel',
        'Array - Struktur array homogen standar NumPy'
      ],
      correctAnswer: 2,
      explanation: 'DataFrame adalah objek utama Pandas untuk menyimpan data berbentuk baris dan kolom, serupa dengan tabel di SQL atau lembar kerja Excel.'
    },
    {
      id: 2,
      question: 'Fungsi Pandas manakah yang digunakan untuk mengimpor dataset langsung dari berkas berformat CSV?',
      options: [
        'pd.read_table()',
        'pd.read_csv() - Membaca CSV dan mengonversinya menjadi DataFrame',
        'pd.open_csv()',
        'pd.load_data()'
      ],
      correctAnswer: 1,
      explanation: 'pd.read_csv() memparsing file teks terdelimitasi koma (CSV) dan mengubahnya secara instan menjadi objek DataFrame Pandas.'
    },
    {
      id: 3,
      question: 'Bagaimana cara menghapus baris data yang mengandung nilai kosong (missing values/NaN) di DataFrame Pandas?',
      options: [
        'df.dropna() - Menghapus baris/kolom dengan missing value',
        'df.fillna() - Mengisi nilai kosong dengan nilai pengganti tertentu',
        'df.remove_null() - Bukan metode valid di Pandas',
        'df.clean() - Bukan metode valid di Pandas'
      ],
      correctAnswer: 0,
      explanation: 'df.dropna() secara default membuang seluruh baris yang mengandung minimal satu nilai kosong (null / NaN) dari DataFrame.'
    }
  ],

  'data-visualization-with-matplotlib-seaborn': [
    {
      id: 1,
      question: 'Pustaka visualisasi statistik Python manakah yang dibangun di atas Matplotlib dan menawarkan estetika visual premium secara default?',
      options: [
        'NumPy - Pustaka operasi komputasi numerik array',
        'Seaborn - Pustaka visualisasi tingkat tinggi yang rapi dan elegan',
        'Pyplot - Modul interface dasar dari Matplotlib',
        'Scikit-Learn - Pustaka machine learning prediktif'
      ],
      correctAnswer: 1,
      explanation: 'Seaborn terintegrasi erat dengan struktur data Pandas, mempermudah pembuatan grafik statistik yang indah dan berwarna harmonis secara otomatis.'
    },
    {
      id: 2,
      question: 'Jenis grafik/visualisasi manakah yang paling tepat digunakan untuk mendeteksi korelasi pola sebaran data numerik di antara dua variabel?',
      options: [
        'Bar Chart - Cocok untuk membandingkan jumlah antar kategori',
        'Pie Chart - Cocok untuk perbandingan proporsi kontribusi bagian',
        'Scatter Plot - Cocok untuk memetakan titik koordinat dua variabel kontinu',
        'Line Chart - Cocok untuk tren data yang terikat waktu (time series)'
      ],
      correctAnswer: 2,
      explanation: 'Scatter Plot (diagram pencar) menyajikan titik-titik data pada sumbu X dan Y, sehingga sangat ideal untuk mengamati korelasi linear atau non-linear antar fitur.'
    },
    {
      id: 3,
      question: 'Di Matplotlib, fungsi manakah yang dipanggil untuk menampilkan legenda/keterangan label warna grafik di layar?',
      options: [
        'plt.title() - Untuk menambahkan judul grafik',
        'plt.xlabel() - Untuk menambahkan label sumbu X',
        'plt.show() - Untuk me-render grafik ke jendela layar',
        'plt.legend() - Untuk menampilkan kotak legenda label warna'
      ],
      correctAnswer: 3,
      explanation: 'plt.legend() memunculkan kotak legenda yang menjelaskan makna dari masing-masing warna atau jenis garis grafik yang digambar.'
    }
  ],

  'machine-learning-with-scikit-learn': [
    {
      id: 1,
      question: 'Manakah di bawah ini yang merupakan algoritma Supervised Learning yang populer digunakan untuk tugas klasifikasi data kategori?',
      options: [
        'K-Means - Algoritma Unsupervised Learning untuk pengelompokkan (clustering)',
        'Decision Tree / Random Forest - Algoritma pohon keputusan untuk klasifikasi/regresi',
        'Principal Component Analysis (PCA) - Metode reduksi dimensi data',
        'Apriori - Algoritma pencarian pola asosiasi data transaksi'
      ],
      correctAnswer: 1,
      explanation: 'Decision Tree dan Random Forest (kumpulan pohon keputusan) memecah data berdasarkan aturan keputusan (kondisi) untuk mengklasifikasikan label target.'
    },
    {
      id: 2,
      question: 'Apa tujuan utama dari pemanggilan fungsi train_test_split() di pustaka Scikit-Learn?',
      options: [
        'Melakukan pembersihan data baris duplikat secara otomatis',
        'Membagi dataset secara acak menjadi data latihan (training) dan data uji (testing)',
        'Melakukan normalisasi atau scaling fitur angka numerik',
        'Melakukan scoring akurasi performa model'
      ],
      correctAnswer: 1,
      explanation: 'train_test_split() memisahkan data menjadi train set (untuk melatih model) dan test set (untuk validasi independen) demi mencegah overfitting.'
    },
    {
      id: 3,
      question: 'Metrik evaluasi manakah yang mengukur proporsi sampel positif aktual yang berhasil dideteksi dengan benar oleh model?',
      options: [
        'Precision - Mengukur akurasi dari seluruh prediksi positif model',
        'Recall / Sensitivity - Mengukur kelengkapan pendeteksian sampel positif riil',
        'F1-Score - Rata-rata harmonis antara precision dan recall',
        'Accuracy - Proporsi prediksi benar secara keseluruhan'
      ],
      correctAnswer: 1,
      explanation: 'Recall mengukur tingkat kesuksesan model dalam menangkap seluruh target positif yang ada di dataset. Penting untuk skenario seperti diagnosis medis penyakit.'
    }
  ],

  'deep-learning-with-tensorflow-keras': [
    {
      id: 1,
      question: 'Fungsi aktivasi manakah yang paling umum digunakan pada hidden layer jaringan saraf tiruan (neural network) modern karena mampu mengatasi vanishing gradient?',
      options: [
        'Sigmoid - Rentan mengalami vanishing gradient di nilai ekstrem',
        'Tanh - Rentan mengalami vanishing gradient di nilai ekstrem',
        'ReLU (Rectified Linear Unit) - Mengubah nilai negatif menjadi nol dan meloloskan nilai positif',
        'Softmax - Khusus untuk output klasifikasi kelas banyak'
      ],
      correctAnswer: 2,
      explanation: 'ReLU (f(x) = max(0, x)) sangat efisien secara komputasi dan tidak membatasi nilai positif, menghindarkan gradien mengecil mendekati nol (vanishing gradient) saat backpropagation.'
    },
    {
      id: 2,
      question: 'Jenis arsitektur neural network manakah yang didesain secara khusus dan sangat efektif untuk memproses data berstruktur matriks grid seperti gambar?',
      options: [
        'Recurrent Neural Network (RNN) - Cocok untuk data berurutan / teks',
        'Convolutional Neural Network (CNN) - Memanfaatkan operasi konvolusi spasial untuk ekstraksi fitur gambar',
        'Artificial Neural Network standar (ANN) - Terlalu berat parameternya jika langsung memproses piksel gambar',
        'Long Short-Term Memory (LSTM) - Jenis RNN tingkat lanjut'
      ],
      correctAnswer: 1,
      explanation: 'CNN menggunakan layer konvolusi untuk mendeteksi pola lokal seperti tepian, tekstur, dan bentuk objek pada gambar secara efisien dan spasial.'
    },
    {
      id: 3,
      question: 'Untuk kasus klasifikasi multi-kelas (misal membedakan 10 jenis objek berbeda), fungsi aktivasi manakah yang diletakkan pada output layer?',
      options: [
        'ReLU',
        'Linear',
        'Softmax - Mengubah output neuron menjadi distribusi probabilitas yang bernilai total 1',
        'Sigmoid - Hanya cocok untuk klasifikasi biner (dua kelas)'
      ],
      correctAnswer: 2,
      explanation: 'Softmax memetakan nilai output mentah menjadi probabilitas untuk masing-masing kelas target, mempermudah penentuan keputusan prediksi dengan probabilitas tertinggi.'
    }
  ],

  // ── Cybersecurity Quizzes ───────────────────────────────────────
  'introduction-to-cybersecurity': [
    {
      id: 1,
      question: 'Apa kepanjangan dari CIA Triad yang mendefinisikan pilar dasar tujuan utama keamanan informasi?',
      options: [
        'Confidentiality, Integrity, Availability - Kerahasiaan, Keutuhan, Ketersediaan',
        'Control, Identity, Authorization - Kontrol, Identitas, Otorisasi',
        'Cyber, Intelligence, Authentication - Siber, Intelijen, Otentikasi',
        'Central, Internal, Advanced - Pusat, Internal, Lanjutan'
      ],
      correctAnswer: 0,
      explanation: 'CIA Triad adalah pilar utama keamanan siber untuk melindungi kerahasiaan informasi (Confidentiality), menjamin data tidak dimodifikasi secara ilegal (Integrity), dan memastikan data dapat diakses saat dibutuhkan (Availability).'
    },
    {
      id: 2,
      question: 'Taktik manipulasi psikologis di mana peretas mengirim email palsu menyerupai institusi resmi demi mencuri kata sandi atau data kartu kredit dinamakan?',
      options: [
        'Ransomware - Pemerasan menggunakan enkripsi data',
        'DDoS - Serangan membanjiri lalu lintas server',
        'Phishing - Penipuan digital lewat umpan komunikasi palsu',
        'Brute Force - Tebak sandi berulang secara paksa'
      ],
      correctAnswer: 2,
      explanation: 'Phishing (pengelabuan) adalah serangan rekayasa sosial paling umum untuk memperdaya korban agar memberikan data sensitif di halaman login palsu.'
    },
    {
      id: 3,
      question: 'Jenis kriptografi manakah yang memanfaatkan dua jenis kunci yang berbeda (Public Key untuk enkripsi dan Private Key untuk dekripsi)?',
      options: [
        'Kriptografi Simetris - Menggunakan satu kunci yang sama untuk enkripsi dan dekripsi',
        'Kriptografi Asimetris - Menggunakan sepasang kunci publik dan privat yang saling berpasangan',
        'Hashing - Algoritma satu arah tanpa proses dekripsi',
        'Salted Hashing - Hashing yang ditambahi karakter acak sebelum diproses'
      ],
      correctAnswer: 1,
      explanation: 'Kriptografi Asimetris (Public Key Cryptography) memecahkan masalah distribusi kunci karena kunci publik boleh disebarkan secara bebas tanpa membocorkan kunci privat.'
    }
  ],

  'networking-fundamentals-for-security': [
    {
      id: 1,
      question: 'Berapakah jumlah lapisan (layer) yang terdapat pada model referensi jaringan standar global OSI Model?',
      options: [
        '4 Layer - Jumlah layer pada protokol TCP/IP standar',
        '5 Layer - Struktur hybrid teoritis',
        '7 Layer - Struktur standar model referensi interkoneksi OSI',
        '9 Layer - Bukan standar jaringan'
      ],
      correctAnswer: 2,
      explanation: 'OSI Model membagi transmisi jaringan menjadi 7 lapisan logis: Physical, Data Link, Network, Transport, Session, Presentation, dan Application.'
    },
    {
      id: 2,
      question: 'Protokol manakah yang berfungsi menerjemahkan nama domain situs web (seperti google.com) menjadi alamat IP Address numerik?',
      options: [
        'DHCP - Menyediakan alokasi IP Address dinamis ke client',
        'DNS (Domain Name System) - Buku telepon internet untuk menerjemahkan domain ke IP',
        'HTTP - Protokol komunikasi web tanpa enkripsi',
        'ARP - Menerjemahkan IP Address ke MAC Address fisik'
      ],
      correctAnswer: 1,
      explanation: 'DNS mengonversi alamat domain yang mudah diingat manusia menjadi IP Address numerik yang dipahami oleh perangkat komputer untuk routing jaringan.'
    },
    {
      id: 3,
      question: 'Alat atau software keamanan manakah yang bertugas memantau dan memfilter paket data keluar-masuk jaringan berdasarkan aturan aturan tertentu?',
      options: [
        'Router - Penghubung antar jaringan yang berbeda segmentasi',
        'Switch - Penghubung perangkat dalam satu jaringan lokal',
        'Firewall - Tembok pengaman pemfilter paket data',
        'Access Point - Pemancar sinyal nirkabel (Wi-Fi)'
      ],
      correctAnswer: 2,
      explanation: 'Firewall menganalisis header paket data dan menolak atau mengizinkan paket tersebut berdasarkan kebijakan keamanan (security policies) yang diterapkan.'
    }
  ],

  'linux-for-penetration-testers': [
    {
      id: 1,
      question: 'Perintah (command) Linux manakah yang digunakan untuk menampilkan lokasi direktori kerja aktif yang sedang dibuka oleh user saat ini?',
      options: [
        'ls - Untuk mendaftar isi file/folder di direktori saat ini',
        'pwd - Print Working Directory untuk mencetak jalur direktori aktif',
        'cd - Change Directory untuk berpindah lokasi folder',
        'whoami - Untuk melihat nama akun user aktif'
      ],
      correctAnswer: 1,
      explanation: 'pwd memaparkan jalur absolut lengkap (misal /var/www/html) dari direktori kerja tempat shell terminal Anda sedang beroperasi.'
    },
    {
      id: 2,
      question: 'Di sistem operasi Linux, bagaimana cara merubah hak akses hak kepemilikan membaca/menulis/mengeksekusi (permissions) pada suatu file?',
      options: [
        'chown - Untuk merubah pemilik (owner) file',
        'chmod - Change Mode untuk mengubah bit permission (rwx)',
        'chroot - Untuk mengubah direktori root proses',
        'chgrp - Untuk merubah grup pemilik file'
      ],
      correctAnswer: 1,
      explanation: 'chmod menggunakan representasi angka oktal (misal chmod 755) atau simbolik (chmod +x) untuk menyetel hak rwx (read, write, execute).'
    },
    {
      id: 3,
      question: 'File sensitif manakah di Linux yang menyimpan hash sandi rahasia milik pengguna dan hanya dapat dibaca oleh user root?',
      options: [
        '/etc/passwd - Menyimpan daftar user, direktori home, dan shell tanpa hash password',
        '/etc/shadow - Menyimpan hash password terenkripsi dan kebijakan masa berlaku sandi',
        '/etc/hosts - Menyimpan pemetaan IP lokal manual',
        '/etc/security - Direktori kebijakan keamanan modular PAM'
      ],
      correctAnswer: 1,
      explanation: '/etc/shadow diisolasi secara ketat dan hanya dapat diakses hak akses istimewa (root) untuk melindungi hash sandi dari upaya offline cracking.'
    }
  ],

  'ethical-hacking-penetration-testing': [
    {
      id: 1,
      question: 'Alat pemindai (network scanner) open-source terpopuler untuk memetakan jaringan komputer, mendeteksi port terbuka, serta mengidentifikasi OS target adalah?',
      options: [
        'Metasploit - Framework eksploitasi celah keamanan',
        'Wireshark - Alat penyadap dan penganalisis paket jaringan (sniffer)',
        'Nmap (Network Mapper) - Alat eksplorasi jaringan dan pemindaian port aktif',
        'Burp Suite - Khusus pengujian penetrasi aplikasi web'
      ],
      correctAnswer: 2,
      explanation: 'Nmap mengirimkan paket khusus ke target dan menganalisis responnya untuk memetakan perangkat apa saja yang aktif beserta layanan port-nya.'
    },
    {
      id: 2,
      question: 'Apa istilah resmi bagi fase awal dalam penetration testing di mana penguji mengumpulkan informasi sebanyak-banyaknya tentang target?',
      options: [
        'Exploitation - Fase penyerangan celah kerentanan',
        'Reconnaissance / Footprinting - Fase pengintaian dan pengumpulan informasi target',
        'Scanning - Fase pemindaian teknis port dan vulnerability',
        'Maintaining Access - Fase menanam backdoor agar koneksi tetap terjaga'
      ],
      correctAnswer: 1,
      explanation: 'Reconnaissance (recon) mengumpulkan data intelijen seperti subdomain, IP, DNS, profil karyawan, dan teknologi web sebelum merancang strategi penyerangan.'
    },
    {
      id: 3,
      question: 'Celah kerentanan perangkat lunak yang dieksploitasi oleh peretas sebelum pembuat software tersebut merilis patch/tambalan resmi disebut?',
      options: [
        'Zero-Day Vulnerability - Kerentanan yang belum memiliki pertahanan / tambalan resmi',
        'SQL Injection - Eksploitasi database, bukan kerentanan sistem operasi umum',
        'Brute Force - Teknik tebak-tebakan kata sandi',
        'Cross-Site Scripting - Eksploitasi script browser'
      ],
      correctAnswer: 0,
      explanation: 'Serangan Zero-Day memanfaatkan jendela waktu antara ditemukannya celah keamanan oleh peretas hingga produsen berhasil membuat patch keamanannya.'
    }
  ],

  'web-application-security-owasp-top-10': [
    {
      id: 1,
      question: 'Jenis celah keamanan web manakah di mana input data berbahaya dari user dieksekusi secara langsung sebagai instruksi query SQL di basis data server?',
      options: [
        'Cross-Site Scripting (XSS) - Eksploitasi script di sisi browser',
        'SQL Injection (SQLi) - Penyisipan query database berbahaya di form/input',
        'Cross-Site Request Forgery (CSRF) - Pemalsuan request dari situs luar',
        'Broken Access Control - Kegagalan pembatasan otorisasi menu'
      ],
      correctAnswer: 1,
      explanation: 'SQL Injection terjadi ketika input string langsung digabungkan ke dalam dinamis query SQL tanpa disanitasi atau tanpa menggunakan Prepared Statements.'
    },
    {
      id: 2,
      question: 'Tindakan pertahanan utama manakah yang paling efektif di sisi backend untuk mengeliminasi celah Cross-Site Scripting (XSS)?',
      options: [
        'Mengaktifkan Firewall di server hosting',
        'Melakukan validasi input ketat, output encoding, dan sanitasi elemen tag HTML berbahaya',
        'Menggunakan enkripsi SSL/TLS HTTPS di web server',
        'Mengenkripsi isi kolom database'
      ],
      correctAnswer: 1,
      explanation: 'XSS dicegah dengan melakukan output encoding (mengubah karakter khusus seperti < menjadi &lt;) sehingga browser hanya merendernya sebagai teks biasa, bukan skrip JavaScript aktif.'
    },
    {
      id: 3,
      question: 'Apa tujuan utama dari penyematan token rahasia anti-CSRF pada setiap form pengiriman HTML di aplikasi web?',
      options: [
        'Mempercepat waktu loading form di browser client',
        'Memastikan seluruh data form dienkripsi sebelum dikirim lewat internet',
        'Memastikan request transaksi berasal dari sesi browser asli pengguna, bukan dari manipulasi script di situs pihak ketiga',
        'Mencegah data input ganda (double-submission)'
      ],
      correctAnswer: 2,
      explanation: 'CSRF memaksa browser mengirim request ke web target di bawah sesi login aktif korban. Token anti-CSRF yang unik memastikan request tersebut benar-benar diinisiasi secara sadar oleh user di halaman resmi.'
    }
  ]
};

/**
 * Mendapatkan bank soal kuis berdasarkan kategori course atau title course
 * @param {string} category 
 * @param {string} title 
 * @returns {Array} List pertanyaan kuis
 */
export function getQuizByCategory(category, title) {
  const normalizedTitle = (title || '').toLowerCase().trim();
  
  // 1. Cocokkan secara spesifik berdasarkan keyword pada judul course
  if (normalizedTitle.includes('html') && normalizedTitle.includes('css')) {
    return quizzes['html-css-fundamentals'];
  }
  if (normalizedTitle.includes('javascript') || normalizedTitle.includes('js for beginner')) {
    return quizzes['javascript-for-beginners'];
  }
  if (normalizedTitle.includes('vue.js') || normalizedTitle.includes('vuejs') || normalizedTitle.includes('vue essentials')) {
    return quizzes['vue-js-essentials'];
  }
  if (normalizedTitle.includes('rest api') || (normalizedTitle.includes('laravel') && normalizedTitle.includes('api'))) {
    return quizzes['laravel-rest-api-development'];
  }
  if (normalizedTitle.includes('task manager') || normalizedTitle.includes('full-stack project')) {
    return quizzes['full-stack-project-build-a-task-manager'];
  }
  if (normalizedTitle.includes('python') && normalizedTitle.includes('basic')) {
    return quizzes['python-programming-basics'];
  }
  if (normalizedTitle.includes('pandas') || normalizedTitle.includes('data analysis')) {
    return quizzes['data-analysis-with-pandas'];
  }
  if (normalizedTitle.includes('matplotlib') || normalizedTitle.includes('seaborn') || normalizedTitle.includes('visualization')) {
    return quizzes['data-visualization-with-matplotlib-seaborn'];
  }
  if (normalizedTitle.includes('scikit') || (normalizedTitle.includes('machine learning') && normalizedTitle.includes('learn'))) {
    return quizzes['machine-learning-with-scikit-learn'];
  }
  if (normalizedTitle.includes('tensorflow') || normalizedTitle.includes('keras') || normalizedTitle.includes('deep learning')) {
    return quizzes['deep-learning-with-tensorflow-keras'];
  }
  if (normalizedTitle.includes('introduction to cybersecurity') || normalizedTitle.includes('keamanan informasi')) {
    return quizzes['introduction-to-cybersecurity'];
  }
  if (normalizedTitle.includes('networking') || normalizedTitle.includes('tcp/ip') || normalizedTitle.includes('osi layer')) {
    return quizzes['networking-fundamentals-for-security'];
  }
  if (normalizedTitle.includes('linux') || normalizedTitle.includes('bash')) {
    return quizzes['linux-for-penetration-testers'];
  }
  if (normalizedTitle.includes('ethical hacking') || normalizedTitle.includes('penetration testing') || normalizedTitle.includes('nmap')) {
    return quizzes['ethical-hacking-penetration-testing'];
  }
  if (normalizedTitle.includes('owasp') || normalizedTitle.includes('application security') || normalizedTitle.includes('web-security')) {
    return quizzes['web-application-security-owasp-top-10'];
  }

  // 2. Jika tidak ada yang cocok secara spesifik, fallback berdasarkan kategori
  const normalizedCategory = (category || '').toLowerCase().trim();
  if (normalizedCategory === 'web-development' || normalizedCategory === 'frontend' || normalizedCategory === 'backend') {
    return quizzes['html-css-fundamentals'];
  }
  if (normalizedCategory === 'data-science' || normalizedCategory === 'data' || normalizedCategory === 'ai') {
    return quizzes['data-analysis-with-pandas'];
  }
  if (normalizedCategory === 'cybersecurity' || normalizedCategory === 'security') {
    return quizzes['introduction-to-cybersecurity'];
  }
  
  // 3. Fallback absolut
  return quizzes['html-css-fundamentals'];
}
