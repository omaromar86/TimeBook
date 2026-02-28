import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-0ddccf3b`;

export const api = {
  // Auth endpoints
  auth: {
    signup: async (email: string, password: string, name: string, role: string) => {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }
      return response.json();
    },

    signin: async (email: string, password: string) => {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }
      return response.json();
    },

    getMe: async (accessToken: string) => {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error('Unauthorized');
      return response.json();
    },
  },

  // Institution endpoints
  institutions: {
    getAll: async (category?: string, search?: string) => {
      const params = new URLSearchParams();
      if (category && category !== 'all') params.append('category', category);
      if (search) params.append('search', search);
      
      const response = await fetch(`${API_URL}/institutions?${params}`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` },
      });
      if (!response.ok) throw new Error('Failed to fetch institutions');
      return response.json();
    },

    getById: async (id: string) => {
      const response = await fetch(`${API_URL}/institutions/${id}`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` },
      });
      if (!response.ok) throw new Error('Failed to fetch institution');
      return response.json();
    },

    getByOwner: async (userId: string, accessToken: string) => {
      const response = await fetch(`${API_URL}/institutions/owner/${userId}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error('Failed to fetch institution');
      return response.json();
    },

    update: async (id: string, data: any, accessToken: string) => {
      const response = await fetch(`${API_URL}/institutions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update institution');
      return response.json();
    },
  },

  // Booking endpoints
  bookings: {
    create: async (data: any, accessToken: string) => {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create booking');
      return response.json();
    },

    getByUser: async (userId: string, accessToken: string) => {
      const response = await fetch(`${API_URL}/bookings/user/${userId}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error('Failed to fetch bookings');
      return response.json();
    },

    getByInstitution: async (institutionId: string, accessToken: string) => {
      const response = await fetch(`${API_URL}/bookings/institution/${institutionId}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error('Failed to fetch bookings');
      return response.json();
    },

    updateStatus: async (id: string, status: string, accessToken: string) => {
      const response = await fetch(`${API_URL}/bookings/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update booking');
      return response.json();
    },
  },

  // Admin endpoints
  admin: {
    getStats: async (accessToken: string) => {
      const response = await fetch(`${API_URL}/admin/stats`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    },
  },

  // Demo data
  demo: {
    initialize: async () => {
      const response = await fetch(`${API_URL}/demo/init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      return response.json();
    },
  },
};
