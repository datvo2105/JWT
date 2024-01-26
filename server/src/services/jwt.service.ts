import env from '@/config/env'
import { Role } from '@/types/user.type'
import jwt from 'jsonwebtoken'

export interface IUserJwt {
  id: string
  username: string
  role: Role
  accessToken?: string
  iat?: Date
}

const decodeToken = <T = unknown>(token: string): T => {
  try {
    const payload = jwt.verify(token, env.jwtAccessToken)
    return payload as T
  } catch (error) {
    throw new Error("You're not authenticated")
  }
}

const decodeRefreshToken = (token: string): string => {
  try {
    const payload = jwt.verify(token, env.jwtRefreshToken)
    return payload as string
  } catch (error) {
    throw new Error("You're not authenticated")
  }
}

const generateAccessToken = (data: IUserJwt) => {
  if (!data) throw new Error('Not found user')
  try {
    return jwt.sign(data, env.jwtAccessToken, {
      expiresIn: env.expAccessToken
    })
  } catch (error) {
    console.error(error)
  }
}

const generateRefreshToken = (data: string) => {
  if (!data) throw new Error('Not found user')
  try {
    return jwt.sign(data, env.jwtRefreshToken, {})
  } catch (error) {
    console.error(error)
  }
}

export { decodeToken, decodeRefreshToken, generateAccessToken, generateRefreshToken }
