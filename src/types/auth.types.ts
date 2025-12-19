export interface Admin {
  id: number;
  name: string;
  email: string;
  phone_number: string | null;
  created_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  admin: Admin;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  admin?: Admin;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}