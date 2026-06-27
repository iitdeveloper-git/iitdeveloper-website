// API Client for Pricing Estimator

import { PricingEstimate, LineItem } from '@/types/pricing';
import {
  CreateEstimateInput,
  UpdateEstimateInput,
  SendEstimateInput,
  CalculatePriceInput,
} from '@/lib/validations/pricing';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

class APIClient {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<{ data?: T; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.error || data.message || 'Request failed',
        };
      }

      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Health check
  async healthCheck(): Promise<{ data?: any; error?: string }> {
    return this.request('/health');
  }

  // Services
  async getServices(category?: string): Promise<{
    data?: { services: any[]; count: number };
    error?: string;
  }> {
    const query = category ? `?category=${category}` : '';
    return this.request(`/services${query}`);
  }

  async getService(id: string): Promise<{ data?: any; error?: string }> {
    return this.request(`/services/${id}`);
  }

  // Price calculation
  async calculatePrice(
    input: CalculatePriceInput
  ): Promise<{
    data?: {
      serviceId: string;
      configuration: any;
      quantity: number;
      totalPrice: number;
      pricePerUnit: number;
    };
    error?: string;
  }> {
    return this.request('/estimates/calculate', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  // Estimates
  async createEstimate(
    input: CreateEstimateInput
  ): Promise<{ data?: PricingEstimate; error?: string }> {
    return this.request('/estimates', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async getEstimate(id: string): Promise<{ data?: PricingEstimate; error?: string }> {
    return this.request(`/estimates/${id}`);
  }

  async updateEstimate(
    id: string,
    input: UpdateEstimateInput
  ): Promise<{ data?: PricingEstimate; error?: string }> {
    return this.request(`/estimates/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    });
  }

  async deleteEstimate(id: string): Promise<{ data?: { message: string }; error?: string }> {
    return this.request(`/estimates/${id}`, {
      method: 'DELETE',
    });
  }

  async listEstimates(filters?: {
    status?: string;
    customerEmail?: string;
    limit?: number;
    offset?: number;
  }): Promise<{
    data?: { estimates: PricingEstimate[]; count: number };
    error?: string;
  }> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.customerEmail) params.append('customerEmail', filters.customerEmail);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());

    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request(`/estimates${query}`);
  }

  async getEstimateActivities(id: string): Promise<{
    data?: { estimateId: string; activities: any[]; count: number };
    error?: string;
  }> {
    return this.request(`/estimates/${id}/activities`);
  }

  // Email
  async sendEstimate(
    input: SendEstimateInput
  ): Promise<{
    data?: { success: boolean; estimate: PricingEstimate; emailId: string };
    error?: string;
  }> {
    return this.request('/estimates/send', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  // PDF Export
  async exportPDF(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/estimates/${id}/pdf`, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || 'Failed to generate PDF',
        };
      }

      // Get the blob
      const blob = await response.blob();
      
      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `estimate-${id.substring(0, 8)}.pdf`;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return { success: true };
    } catch (error) {
      console.error('PDF export failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to download PDF',
      };
    }
  }
}

// Export singleton instance
export const apiClient = new APIClient();

// Export hooks for React components
export function useAPI() {
  return apiClient;
}
