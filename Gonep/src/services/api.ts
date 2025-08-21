const API_BASE_URL = import.meta.env.PROD 
  ? 'https://gonepbackend.vercel.app/api' 
  : 'http://localhost:8000/api';

// Base API class for making HTTP requests
class BaseAPI {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get(endpoint: string): Promise<any> {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint: string, data: any): Promise<any> {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint: string, data: any): Promise<any> {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string): Promise<any> {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Initialize base API instance
const api = new BaseAPI(API_BASE_URL);

// Video API
export const videoAPI = {
  // Get all videos
  getVideos: () => api.get('/video'),
  
  // Get video by ID
  getVideo: (id: string) => api.get(`/video/${id}`),
  
  // Get videos by placement
  getVideosByPlacement: (placement: string) => api.get(`/video/placement/${placement}`),
};

// Team API
export const teamAPI = {
  // Get all team members
  getTeamMembers: () => api.get('/team'),
  
  // Get team member by ID
  getTeamMember: (id: string) => api.get(`/team/${id}`),
  
  // Get team values
  getTeamValues: () => api.get('/team/values'),
  
  // Get leadership team
  getLeadership: () => api.get('/team/leadership'),
};

// Demo API
export const demoAPI = {
  // Submit demo request
  submitDemoRequest: (data: any) => api.post('/demo/request', data),
  
  // Get demo configuration
  getConfiguration: () => api.get('/demo/config'),
  
  // Get demo types
  getDemoTypes: () => api.get('/demo/config/types'),
  
  // Get demo interests
  getDemoInterests: () => api.get('/demo/config/interests'),
  
  // Get available calendar dates
  getAvailableDates: () => api.get('/demo/config/calendar'),
  
  // Check specific date availability
  checkDateAvailability: (date: string) => api.post('/demo/config/calendar/check', { date }),
};

// Careers API
export const careersAPI = {
  // Get all job openings
  getJobs: () => api.get('/careers/jobs'),
  
  // Get job by ID
  getJob: (id: string) => api.get(`/careers/jobs/${id}`),
  
  // Get departments
  getDepartments: () => api.get('/careers/departments'),
  
  // Submit job application
  submitApplication: (jobId: string, data: any) => api.post(`/careers/jobs/${jobId}/apply`, data),
};

// Blog API
export const blogAPI = {
  // Get all blog posts
  getPosts: (params?: any) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return api.get(`/blog/posts${queryString}`);
  },
  
  // Get blog post by slug
  getPost: (slug: string) => api.get(`/blog/posts/${slug}`),
  
  // Get blog categories
  getCategories: () => api.get('/blog/categories'),
  
  // Get blog authors
  getAuthors: () => api.get('/blog/authors'),
};

// Contact API
export const contactAPI = {
  // Submit contact form
  submitContact: (data: any) => api.post('/contact', data),
  
  // Get contact methods
  getContactMethods: () => api.get('/contact/methods'),
};

// Newsletter API
export const newsletterAPI = {
  // Subscribe to newsletter
  subscribe: (data: string | { email: string; firstName?: string; lastName?: string }) => {
    const payload = typeof data === 'string' ? { email: data } : data;
    return api.post('/newsletter/subscribe', payload);
  },
  
  // Unsubscribe from newsletter
  unsubscribe: (email: string) => api.post('/newsletter/unsubscribe', { email }),
};

// Analytics API
export const analyticsAPI = {
  // Track page view
  trackPageView: (data: any) => api.post('/analytics/pageview', data),
  
  // Track event
  trackEvent: (data: any) => api.post('/analytics/event', data),
};

// Partners API
export const partnersAPI = {
  // Get all partners
  getPartners: () => api.get('/partners'),
  
  // Get partner by ID
  getPartner: (id: string) => api.get(`/partners/${id}`),
};

// Export default API instance for direct use if needed
export default api;
