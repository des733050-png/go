import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  ApiResponse, 
  LoginCredentials, 
  User, 
  BlogPost, 
  BlogCategory, 
  BlogAuthor,
  TeamMember,
  TeamValue,
  Job,
  Department,
  ContactInquiry,
  NewsletterSubscriber,
  DemoRequest,
  Partner,
  DashboardStats,
  BlogPostForm,
  JobForm,
  DemoInterest,
  CreateInterestData,
  UpdateInterestData,
  DemoType,
  CreateDemoTypeData,
  UpdateDemoTypeData,
  CalendarAvailability,
  CalendarAvailabilityData
} from '../types';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://gonepbackend.vercel.app/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    console.log('📤 API Request:', config.method?.toUpperCase(), config.url, 'Token exists:', !!token);
    if (token) {
      console.log('🔑 Token being sent:', token.substring(0, 20) + '...');
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('📥 API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.log('❌ API Error:', error.response?.status, error.config?.url, error.message);
    
    // Only handle 401 errors for specific endpoints that should trigger logout
    if (error.response?.status === 401) {
      const url = error.config?.url;
      
      // Don't redirect for newsletter endpoints - let the component handle the error
      if (url && url.includes('/newsletter/subscribers')) {
        console.log('🔒 Newsletter endpoint 401 - not redirecting, letting component handle');
        return Promise.reject(error);
      }
      
      // For other 401 errors, check if we should logout
      console.log('🔒 Unauthorized, checking if should logout');
      
      // Only logout if we're not already on the login page
      if (window.location.pathname !== '/login') {
        console.log('🔒 Redirecting to login');
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Generic API call function
const apiCall = async <T>(endpoint: string, method: string = 'GET', data?: any): Promise<ApiResponse<T>> => {
  try {
    console.log(`🚀 API Call: ${method} ${endpoint}`);
    const response = await apiClient.request({
      url: endpoint,
      method,
      data,
    });
    
    console.log('📊 Raw response:', response.data);
    
    // Handle double-wrapped response from backend
    if (response.data && typeof response.data === 'object' && 'success' in response.data && 'data' in response.data) {
      console.log('✅ Parsed response with success/data structure');
      return {
        success: response.data.success,
        status: response.status,
        data: response.data.data,
      };
    }
    
    // Fallback for non-standard responses
    console.log('⚠️ Using fallback response parsing');
    return {
      success: true,
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    console.error(`💥 API Error: ${method} ${endpoint}`, error);
    return {
      success: false,
      status: error.response?.status || 0,
      data: error.response?.data || { error: error.message },
    };
  }
};

// Authentication API
export const authAPI = {
  login: (credentials: LoginCredentials) => 
    apiCall<{ user: User; token: string }>('/auth/login', 'POST', credentials),
  
  register: (userData: any) => 
    apiCall<User>('/auth/register', 'POST', userData),
  
  logout: () => {
    localStorage.removeItem('authToken');
    return Promise.resolve({ success: true, status: 200, data: {} });
  },
  
  getCurrentUser: () => 
    apiCall<User>('/auth/me'),
};

// Blog API
export const blogAPI = {
  getPosts: () => 
    apiCall<{ posts: BlogPost[] }>('/blog/posts'),
  
  getFeaturedPosts: () => 
    apiCall<{ posts: BlogPost[] }>('/blog/featured'),
  
  getPost: (id: number) => 
    apiCall<BlogPost>(`/blog/posts/${id}`),
  
  createPost: (postData: BlogPostForm) => 
    apiCall<BlogPost>('/blog/posts', 'POST', postData),
  
  updatePost: (id: number, postData: Partial<BlogPostForm>) => 
    apiCall<BlogPost>(`/blog/posts/${id}`, 'PUT', postData),
  
  deletePost: (id: number) => 
    apiCall(`/blog/posts/${id}`, 'DELETE'),
  
  getCategories: () => 
    apiCall<{ categories: BlogCategory[] }>('/blog/categories/admin'),
  
  createCategory: (categoryData: { name: string; slug: string; description?: string }) => 
    apiCall<BlogCategory>('/blog/categories', 'POST', categoryData),
  
  updateCategory: (id: number, categoryData: { name: string; slug: string; description?: string }) => 
    apiCall<BlogCategory>(`/blog/categories/${id}`, 'PUT', categoryData),
  
  deleteCategory: (id: number) => 
    apiCall(`/blog/categories/${id}`, 'DELETE'),
  
  getAuthors: () => 
    apiCall<{ authors: BlogAuthor[] }>('/blog/authors'),
  
  createAuthor: (authorData: { name: string; bio?: string; email?: string; role?: string; department?: string; image?: string }) => 
    apiCall<BlogAuthor>('/blog/authors', 'POST', authorData),
  
  updateAuthor: (id: number, authorData: { name: string; bio?: string; email?: string; role?: string; department?: string; image?: string }) => 
    apiCall<BlogAuthor>(`/blog/authors/${id}`, 'PUT', authorData),
  
  deleteAuthor: (id: number) => 
    apiCall(`/blog/authors/${id}`, 'DELETE'),
};

// Team API
export const teamAPI = {
  getMembers: () => 
    apiCall<{ members: TeamMember[] }>('/team/admin'),
  
  getMembersPublic: () => 
    apiCall<{ members: TeamMember[] }>('/team'),
  
  getLeadership: () => 
    apiCall<{ leadership: TeamMember[] }>('/team/leadership'),
  
  getMemberById: (id: number) => 
    apiCall<TeamMember>(`/team/${id}`),
  
  getValues: () => 
    apiCall<{ values: TeamValue[] }>('/team/values'),
  
  createMember: (memberData: Partial<TeamMember>) => 
    apiCall<TeamMember>('/team', 'POST', memberData),
  
  updateMember: (id: number, memberData: Partial<TeamMember>) => 
    apiCall<TeamMember>(`/team/${id}`, 'PUT', memberData),
  
  deleteMember: (id: number) => 
    apiCall(`/team/${id}`, 'DELETE'),
  
  createValue: (valueData: Partial<TeamValue>) => 
    apiCall<TeamValue>('/team/values', 'POST', valueData),
  
  updateValue: (id: number, valueData: Partial<TeamValue>) => 
    apiCall<TeamValue>(`/team/values/${id}`, 'PUT', valueData),
  
  deleteValue: (id: number) => 
    apiCall(`/team/values/${id}`, 'DELETE'),
};

// Careers API
export const careersAPI = {
  getJobs: () => 
    apiCall<{ jobs: Job[] }>('/careers/jobs'),
  
  getJobsAdmin: () => 
    apiCall<{ jobs: Job[] }>('/careers/jobs/admin'),
  
  getDepartments: () => 
    apiCall<{ departments: Department[] }>('/careers/departments'),
  
  getDepartmentStats: () => 
    apiCall<{ departments: Department[] }>('/careers/departments/stats'),
  
  createDepartment: (departmentData: { name: string; description?: string }) => 
    apiCall<Department>('/careers/departments', 'POST', departmentData),
  
  updateDepartment: (id: number, departmentData: { name: string; description?: string }) => 
    apiCall<Department>(`/careers/departments/${id}`, 'PUT', departmentData),
  
  deleteDepartment: (id: number) => 
    apiCall(`/careers/departments/${id}`, 'DELETE'),
  
  createJob: (jobData: JobForm) => 
    apiCall<Job>('/careers/jobs', 'POST', jobData),
  
  updateJob: (id: number, jobData: Partial<JobForm>) => 
    apiCall<Job>(`/careers/jobs/${id}`, 'PUT', jobData),
  
  deleteJob: (id: number) => 
    apiCall(`/careers/jobs/${id}`, 'DELETE'),
};

// Contact API
export const contactAPI = {
  getInquiries: () => 
    apiCall<{ inquiries: ContactInquiry[] }>('/contact/inquiries'),
  
  getMethods: () => 
    apiCall<{ methods: any[] }>('/contact/methods'),
  
  updateInquiryStatus: (id: number, status: string) => 
    apiCall<ContactInquiry>(`/contact/inquiries/${id}`, 'PUT', { status }),
  
  deleteInquiry: (id: number) => 
    apiCall(`/contact/inquiries/${id}`, 'DELETE'),
};

// Newsletter API
export const newsletterAPI = {
  getSubscribers: () => 
    apiCall<{ subscribers: NewsletterSubscriber[] }>('/newsletter/subscribers'),
  
  updateSubscriber: (id: number, subscriberData: Partial<NewsletterSubscriber>) => 
    apiCall<NewsletterSubscriber>(`/newsletter/subscribers/${id}`, 'PUT', subscriberData),
  
  deleteSubscriber: (id: number) => 
    apiCall(`/newsletter/subscribers/${id}`, 'DELETE'),
  
  exportSubscribers: () => 
    apiCall('/newsletter/export', 'GET'),
};

// Demo Requests API
export const demoAPI = {
  getRequests: () => 
    apiCall<{ requests: DemoRequest[] }>('/demo/requests'),
  
  getRequestById: (id: number) => 
    apiCall<DemoRequest>(`/demo/requests/${id}`),
  
  updateRequest: (id: number, requestData: Partial<DemoRequest>) => 
    apiCall<DemoRequest>(`/demo/requests/${id}`, 'PUT', requestData),
  
  updateRequestStatus: (id: number, status: string) => 
    apiCall<DemoRequest>(`/demo/requests/${id}`, 'PUT', { status }),
  
  deleteRequest: (id: number) => 
    apiCall(`/demo/requests/${id}`, 'DELETE'),
  
  getStats: () => 
    apiCall<{
      total: number;
      pending: number;
      confirmed: number;
      completed: number;
      cancelled: number;
      virtual: number;
      onsite: number;
    }>('/demo/stats'),
};

// Partners API
export const partnersAPI = {
  getPartners: () => 
    apiCall<{ partners: Partner[] }>('/partners'),
  
  createPartner: (partnerData: Partial<Partner>) => 
    apiCall<Partner>('/partners', 'POST', partnerData),
  
  updatePartner: (id: number, partnerData: Partial<Partner>) => 
    apiCall<Partner>(`/partners/${id}`, 'PUT', partnerData),
  
  deletePartner: (id: number) => 
    apiCall(`/partners/${id}`, 'DELETE'),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => 
    apiCall<DashboardStats>('/dashboard/stats'),
  
  getRecentActivity: () => 
    apiCall<{ activities: any[] }>('/dashboard/activity'),
};

// Health Check API
export const healthAPI = {
  checkHealth: () => 
    apiCall('/health'),
};

// Demo Configuration API
export const demoConfigAPI = {
  // Interests
  getInterests: () => apiCall<DemoInterest[]>('/demo/config/interests'),
  createInterest: (data: CreateInterestData) => apiCall<{ id: number }>('/demo/config/interests', 'POST', data),
  updateInterest: (id: number, data: UpdateInterestData) => apiCall<void>(`/demo/config/interests/${id}`, 'PUT', data),
  deleteInterest: (id: number) => apiCall<void>(`/demo/config/interests/${id}`, 'DELETE'),

  // Demo Types
  getDemoTypes: () => apiCall<DemoType[]>('/demo/config/types'),
  createDemoType: (data: CreateDemoTypeData) => apiCall<{ id: number }>('/demo/config/types', 'POST', data),
  updateDemoType: (id: number, data: UpdateDemoTypeData) => apiCall<void>(`/demo/config/types/${id}`, 'PUT', data),
  deleteDemoType: (id: number) => apiCall<void>(`/demo/config/types/${id}`, 'DELETE'),

  // Calendar Availability
  getAvailableDates: () => apiCall<CalendarAvailability[]>('/demo/config/calendar'),
  getCalendarRange: (startDate: string, endDate: string) => apiCall<CalendarAvailability[]>(`/demo/config/calendar/range?startDate=${startDate}&endDate=${endDate}`),
  setCalendarAvailability: (data: CalendarAvailabilityData) => apiCall<void>('/demo/config/calendar', 'POST', data),
  checkDateAvailability: (date: string) => apiCall<{ isAvailable: boolean; maxBookings: number; currentBookings: number; reason?: string }>('/demo/config/calendar/check', 'POST', { date }),
};

// Upload API
export const uploadAPI = {
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  deleteFile: (id: number) => 
    apiCall(`/upload/${id}`, 'DELETE'),
};

// Video API
export const videoAPI = {
  getAllVideos: () => 
    apiCall<{ videos: any[] }>('/video'),
  
  getAllVideosAdmin: () => 
    apiCall<{ videos: any[] }>('/video/admin'),
  
  getVideoById: (id: number) => 
    apiCall<any>(`/video/${id}`),
  
  getVideosByPlacement: (placement: string) => 
    apiCall<{ videos: any[] }>(`/video/placement/${placement}`),
  
  createVideo: (videoData: any) => 
    apiCall<any>('/video', 'POST', videoData),
  
  updateVideo: (id: number, videoData: any) => 
    apiCall<any>(`/video/${id}`, 'PUT', videoData),
  
  deleteVideo: (id: number) => 
    apiCall(`/video/${id}`, 'DELETE'),
  
  getFeaturedVideo: () => 
    apiCall<any>('/video/featured'),
};

export default apiClient;
