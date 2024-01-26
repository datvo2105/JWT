import { Request, Response, NextFunction } from 'express'
import { Role } from '@/types/user.type'
import { IUserJwt, decodeToken } from '@/services/jwt.service'

const authenticated = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization

  if (!token) return res.status(403).json("Error::: You're not authenticated")

  try {
    const accessToken = token.replace(/(^Bearer\s)/, '')
    const decode = decodeToken<IUserJwt>(accessToken)
    const { id, username, role } = decode
    req.user = { id, username, role, accessToken }
    return next()
  } catch (error) {
    console.error('Error decoding token:', error)
    return res.status(403).json('Error::: Invalid token')
  }
}

const vertifyPermission = (req: Request, res: Response, next: NextFunction) => {
  const { role, accessToken } = req.user
  if (!accessToken) return res.status(403).json("Error::: You're not authenticated")
  if (role !== Role.admin) return res.status(403).json("Error::: You don't have permission")
  return next()
}

export { authenticated, vertifyPermission }
