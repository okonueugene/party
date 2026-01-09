import apiClient from './axios';
import  { type DashboardData } from '../types/dashboard.types';

class DashboardService {
  /**
   * Get dashboard overview
   */
  async getOverview(): Promise<DashboardData> {
    const response = await apiClient.get<{ success: boolean; data: DashboardData }>(
      '/admin/dashboard'
    );
    return response.data.data;
  }

  /**
   * Get user statistics
   */
  async getUserStats(period: string = '7days') {
    const response = await apiClient.get('/admin/dashboard/users', {
      params: { period },
    });
    return response.data.data;
  }

  /**
   * Get post statistics
   */
  async getPostStats(period: string = '7days') {
    const response = await apiClient.get('/admin/dashboard/posts', {
      params: { period },
    });
    return response.data.data;
  }

  /**
   * Get engagement statistics
   */
  async getEngagementStats(period: string = '7days') {
    const response = await apiClient.get('/admin/dashboard/engagement', {
      params: { period },
    });
    return response.data.data;
  }
}

export default new DashboardService();