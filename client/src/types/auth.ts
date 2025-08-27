export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  phone?: string
  profilePicture?: string
  household?: string
  role: 'admin' | 'resident'
  isEmailVerified: boolean
  lastLogin?: Date
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  firstName: string
  lastName: string
  phone?: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}