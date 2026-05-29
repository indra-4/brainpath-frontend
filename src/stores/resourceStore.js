import { defineStore } from 'pinia';
import api, { convertKeysToCamelCase } from '@/lib/api';

export const useResourceStore = defineStore('resource', {
  state: () => ({
    resources: [],
    history: [],
    currentResource: null,
    videoReports: JSON.parse(localStorage.getItem('video_reports')) || [],
    loading: false,
    error: null,
  }),
  
  actions: {
    async fetchResources() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get('/courses');
        const formatted = convertKeysToCamelCase(response.data.data).map(formatResource);
        this.resources = formatted;
        return this.resources;
      } catch (err) {
        this.error = err.response?.data?.message || 'Gagal memuat daftar resource';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    
    async fetchHistory() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get('/courses/history');
        const formatted = convertKeysToCamelCase(response.data.data).map(formatResource);
        this.history = formatted;
        return this.history;
      } catch (err) {
        this.error = err.response?.data?.message || 'Gagal memuat riwayat';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    
    async fetchResourceById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get(`/courses/${id}`);
        const formatted = formatResource(convertKeysToCamelCase(response.data.data));
        this.currentResource = formatted;
        return this.currentResource;
      } catch (err) {
        this.error = err.response?.data?.message || 'Gagal memuat detail resource';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    
    async trackProgress(id) {
      try {
        if (this.currentResource && this.currentResource.progress && this.currentResource.progress.status === 'completed') {
          return;
        }
        await api.post(`/courses/${id}/progress`, { status: 'in_progress' });
      } catch (err) {
        console.error('Gagal mencatat progres:', err);
      }
    },
    
    async saveQuizScore(id, score) {
      try {
        const response = await api.post(`/courses/${id}/progress`, {
          status: 'completed',
          score: score
        });
        
        // Update currentResource local state if it matches
        if (this.currentResource && String(this.currentResource.id) === String(id)) {
          if (!this.currentResource.progress) {
            this.currentResource.progress = {};
          }
          this.currentResource.progress.score = score;
          this.currentResource.progress.status = 'completed';
        }
        
        // Also update history item in state if found
        const historyItem = this.history.find(item => String(item.id) === String(id));
        if (historyItem) {
          if (!historyItem.progress) {
            historyItem.progress = {};
          }
          historyItem.progress.score = score;
          historyItem.progress.status = 'completed';
        }
        
        return response.data;
      } catch (err) {
        console.error('Gagal menyimpan skor kuis:', err);
        throw err;
      }
    },
    
    async addResource(resourceData) {
      try {
        const payload = {
          title: resourceData.title,
          external_url: resourceData.externalUrl,
          description: resourceData.description,
          category: resourceData.category,
          level: resourceData.level,
          duration_text: resourceData.duration,
          tags: resourceData.tags,
          summary: resourceData.summary,
          learning_points: resourceData.learningPoints || [],
        };
        const response = await api.post('/courses', payload);
        const newResource = formatResource(convertKeysToCamelCase(response.data.data));
        this.resources.unshift(newResource);
        return newResource;
      } catch (err) {
        console.error('Gagal menambah resource:', err);
        throw err;
      }
    },
    
    async updateResource(id, updatedData) {
      try {
        const payload = {
          title: updatedData.title,
          external_url: updatedData.externalUrl,
          description: updatedData.description,
          category: updatedData.category,
          level: updatedData.level,
          duration_text: updatedData.duration,
          tags: updatedData.tags,
          summary: updatedData.summary,
          learning_points: updatedData.learningPoints || [],
        };
        const response = await api.put(`/courses/${id}`, payload);
        const updatedResource = formatResource(convertKeysToCamelCase(response.data.data));
        const index = this.resources.findIndex(r => r.id === id);
        if (index !== -1) {
          this.resources[index] = updatedResource;
        }
        return updatedResource;
      } catch (err) {
        console.error('Gagal update resource:', err);
        throw err;
      }
    },
    
    async deleteResource(id) {
      try {
        await api.delete(`/courses/${id}`);
        this.resources = this.resources.filter(r => r.id !== id);
      } catch (err) {
        console.error('Gagal menghapus resource:', err);
        throw err;
      }
    },
    
    async fetchAnalytics() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get('/admin/analytics');
        return response.data.data;
      } catch (err) {
        this.error = err.response?.data?.message || 'Gagal memuat data analitik';
        console.error('fetchAnalytics error:', err);
        throw err;
      } finally {
        this.loading = false;
      }
    },
    
    submitVideoReport(courseId, courseTitle, issueType, details = '') {
      const newReport = {
        id: Date.now(),
        courseId,
        courseTitle,
        issueType,
        details,
        status: 'pending',
        reportedAt: new Date().toISOString()
      };
      
      const currentReports = JSON.parse(localStorage.getItem('video_reports')) || [];
      currentReports.unshift(newReport);
      localStorage.setItem('video_reports', JSON.stringify(currentReports));
      this.videoReports = currentReports;
      
      // Dispatch custom event to trigger reactive bell sync instantly if tabs are active
      window.dispatchEvent(new CustomEvent('new-video-report', { detail: newReport }));
    },
    
    deleteVideoReport(reportId) {
      const currentReports = JSON.parse(localStorage.getItem('video_reports')) || [];
      const filtered = currentReports.filter(r => r.id !== reportId);
      localStorage.setItem('video_reports', JSON.stringify(filtered));
      this.videoReports = filtered;
      
      window.dispatchEvent(new CustomEvent('delete-video-report', { detail: reportId }));
    }
  }
});

/** Normalize a single course model to ensure consistent frontend shape */
function formatResource(course) {
  if (!course) return null;
  
  // Parse tags
  let tags = [];
  if (Array.isArray(course.tags)) {
    tags = course.tags;
  } else if (typeof course.tags === 'string') {
    try {
      tags = JSON.parse(course.tags);
    } catch {
      tags = course.tags ? course.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
    }
  }

  // Parse learning points
  let learningPoints = [];
  if (Array.isArray(course.learningPoints)) {
    learningPoints = course.learningPoints;
  } else if (typeof course.learningPoints === 'string') {
    try {
      learningPoints = JSON.parse(course.learningPoints);
    } catch {
      learningPoints = course.learningPoints ? course.learningPoints.split(',').map(t => t.trim()).filter(Boolean) : [];
    }
  }

  const category = course.category || 'General IT';

  return {
    ...course,
    tags,
    learningPoints,
    source: _extractSource(course.externalUrl),
    duration: course.durationText || (course.durationMinutes ? `${course.durationMinutes} menit` : '—'),
    aiSummary: course.summary || 'Belum ada ringkasan AI untuk topik ini.',
    targetLearners: _getDefaultTargetLearners(category),
    videoRoadmap: _getDefaultVideoRoadmap(course.title || 'Materi'),
  };
}

/** Extract a human-readable source name from a URL */
function _extractSource(url) {
  if (!url) return 'Brainpath';
  try {
    const host = new URL(url).hostname.replace('www.', '');
    const map = {
      'youtube.com': 'YouTube',
      'youtu.be': 'YouTube',
      'udemy.com': 'Udemy',
      'coursera.org': 'Coursera',
      'freecodecamp.org': 'freeCodeCamp',
      'codecademy.com': 'Codecademy',
      'kaggle.com': 'Kaggle',
    };
    return map[host] || host;
  } catch {
    return 'Brainpath';
  }
}

function _getDefaultTargetLearners(category) {
  const defaults = {
    'web-development': [
      'Pemula yang ingin memulai karir sebagai Web Developer.',
      'Praktisi yang ingin memperdalam konsep modern web dev.',
      'Siapa saja yang tertarik membangun website responsif sendiri.'
    ],
    'data-science': [
      'Mahasiswa atau profesional yang ingin beralih ke bidang data.',
      'Analitis yang ingin mempercepat proses pengolahan data dengan Python.',
      'Pemula yang tertarik dengan Machine Learning dan AI.'
    ],
    'cybersecurity': [
      'Pemula yang tertarik dengan keamanan informasi.',
      'Sysadmin atau developer yang ingin memahami celah keamanan.',
      'Siapa saja yang bersiap mengambil sertifikasi cybersecurity.'
    ]
  };
  return defaults[category] || [
    'Pemula yang tertarik dengan materi teknologi ini.',
    'Siswa yang ingin memperdalam wawasan seputar materi terkait.',
    'Siapa saja yang ingin meningkatkan keahlian digitalnya.'
  ];
}

function _getDefaultVideoRoadmap(title) {
  return [
    { title: `Pengenalan Dasar & Konsep ${title}`, time: '00:00 - 05:30' },
    { title: 'Instalasi Lingkungan & Setup Awal', time: '05:30 - 15:45' },
    { title: 'Demo Utama & Studi Kasus Praktis', time: '15:45 - 32:20' },
    { title: 'Optimasi & Praktik Terbaik (Best Practices)', time: '32:20 - 45:00' }
  ];
}
