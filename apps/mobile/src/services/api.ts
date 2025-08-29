import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:3005/api';

class ApiService {
  private async getAuthHeader(): Promise<Record<string, string>> {
    const token = await AsyncStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    try {
      const authHeader = await this.getAuthHeader();
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...authHeader,
        ...(options.headers as Record<string, string>),
      };
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      await AsyncStorage.setItem('token', response.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  }

  async register(userData: { name: string; email: string; password: string }) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      await AsyncStorage.setItem('token', response.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  }

  async logout() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  }

  // User
  async getCurrentUser() {
    return this.request('/users/me');
  }

  // Transactions
  async getTransactions() {
    return this.request('/transactions');
  }

  async createTransaction(transaction: {
    amount: number;
    description: string;
    category: string;
    type: 'income' | 'expense';
  }) {
    return this.request('/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
    });
  }

  async updateTransaction(id: string, transaction: any) {
    return this.request(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transaction),
    });
  }

  async deleteTransaction(id: string) {
    return this.request(`/transactions/${id}`, {
      method: 'DELETE',
    });
  }

  // Budgets
  async getBudgets() {
    return this.request('/budgets');
  }

  async createBudget(budget: {
    category: string;
    amount: number;
    period: 'monthly' | 'yearly';
  }) {
    return this.request('/budgets', {
      method: 'POST',
      body: JSON.stringify(budget),
    });
  }

  // Categories
  async getCategories() {
    return this.request('/categories');
  }

  // Reports
  async getFinancialSummary() {
    return this.request('/reports/summary');
  }

  async getSpendingByCategory() {
    return this.request('/reports/spending-by-category');
  }
}

export default new ApiService();
