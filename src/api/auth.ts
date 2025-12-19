import apiClient from './axios';
import type { 
  LoginCredentials, 
  LoginResponse, 
  AuthResponse, 
  ChangePasswordData,
  Admin 
} from '../types/auth.types';

class AuthService {
  /**
   * Admin login
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/admin/auth/login', credentials);
    
    // Store token and user data
    if (response.data.success && response.data.token) {
      localStorage.setItem('admin_token', response.data.token);
      localStorage.setItem('admin_user', JSON.stringify(response.data.admin));
    }
    
    return response.data;
  }

  /**
   * Get current admin user
   */
  async me(): Promise<Admin> {
    const response = await apiClient.get<{ success: boolean; admin: Admin }>('/admin/auth/me');
    
    // Update stored user data
    if (response.data.success && response.data.admin) {
      localStorage.setItem('admin_user', JSON.stringify(response.data.admin));
    }
    
    return response.data.admin;
  }

  /**
   * Logout current session
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post('/admin/auth/logout');
    } finally {
      this.clearAuthData();
    }
  }

  /**
   * Logout from all devices
   */
  async logoutAll(): Promise<void> {
    try {
      await apiClient.post('/admin/auth/logout-all');
    } finally {
      this.clearAuthData();
    }
  }

  /**
   * Change password
   */
  async changePassword(data: ChangePasswordData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/admin/auth/change-password', data);
    return response.data;
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    return localStorage.getItem('admin_token');
  }

  /**
   * Get stored user
   */
  getUser(): Admin | null {
    const user = localStorage.getItem('admin_user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Clear auth data
   */
  clearAuthData(): void {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  }
}

export default new AuthService();