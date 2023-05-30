import type express from 'express'

export interface JwtPayload {
  id: string
  email: string
  name: string
}

export interface IUserRequest extends express.Request {
  user?: string
}

export interface ICategory {
  name: string
  icon: {
    id: string
    name: string
    code: string
  }
  color: {
    id: string
    name: string
    code: string
  }
  isEditable?: boolean
}
