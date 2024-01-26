import { IUserJwt } from '@/services/jwt.service'

declare global {
  namespace Express {
    interface Request {
      user: IUserJwt
    }
  }
}
