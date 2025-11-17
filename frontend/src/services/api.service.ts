import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.clearToken()
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('auth_token')
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
  }

  private clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get<T>(url, config)
    return response.data
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.post<T>(url, data, config)
    return response.data
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.put<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.delete<T>(url, config)
    return response.data
  }

  setAuthToken(token: string): void {
    this.setToken(token)
  }

  clearAuthToken(): void {
    this.clearToken()
  }
}

export const apiService = new ApiService()
