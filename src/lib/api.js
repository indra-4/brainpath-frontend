import axios from 'axios';

// Konfigurasi axios instance untuk API backend
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Disesuaikan dengan URL lokal backend Anda
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor untuk menyisipkan token pada setiap request (jika ada token)
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani error respons secara global
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Jika 401 Unauthorized, mungkin token expired atau tidak valid
    if (error.response && error.response.status === 401) {
      // Hapus data auth dari localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Jika tidak di halaman login, redirect ke login
      if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    }
    
    // Graceful error handling for 500 server errors, gateway timeouts, or network failures
    const status = error.response ? error.response.status : null;
    
    if (status !== 401 && status !== 422) {
      import('sweetalert2').then(({ default: Swal }) => {
        Swal.fire({
          title: '<span class="font-black text-slate-900">Koneksi Terganggu</span>',
          html: '<span class="text-sm font-semibold text-slate-500 leading-relaxed">Ups, Asisten AI sedang beristirahat atau server sedang sibuk. Silakan periksa koneksi internet atau coba beberapa saat lagi.</span>',
          icon: 'warning',
          confirmButtonColor: '#2563eb',
          confirmButtonText: 'Mengerti',
          customClass: {
            popup: 'rounded-3xl border border-slate-200 p-6',
            confirmButton: 'rounded-xl px-5 py-2.5 font-bold text-sm shadow-md bg-blue-600 hover:bg-blue-700 text-white'
          }
        });
      });
    }
    
    return Promise.reject(error);
  }
);

/**
 * Utility untuk konversi format data dari API (snake_case) ke Frontend (camelCase)
 * Berguna jika backend mengirim field seperti `relevance_score` dan frontend
 * mengharapkan `relevanceScore`.
 */
export const snakeToCamel = (str) => {
  return str.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

export const convertKeysToCamelCase = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToCamelCase(item));
  }
  
  const camelObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = snakeToCamel(key);
      camelObj[camelKey] = convertKeysToCamelCase(obj[key]);
    }
  }
  
  return camelObj;
};

export default api;
