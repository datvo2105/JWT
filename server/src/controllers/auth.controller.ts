import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import User from '@/models/user.model'
import { UserRegister, UserLogin } from '@/types/user.type'
import { decodeRefreshToken, generateAccessToken, generateRefreshToken } from '@/services/jwt.service'
import { IUserJwt } from '../services/jwt.service'

const register = async (req: Request<unknown, unknown, UserRegister>, res: Response) => {
  const { username, email, password } = req.body

  try {
    const isExist = await User.findOne({ $or: [{ username }, { email }] })
    if (isExist) throw new Error('User or email is exist!')
    const user = new User({ username, email, password })
    user.save()
    return res.status(200).json({ username, email })
  } catch (error) {
    console.error('Error::: Internal Server Error')
    res.status(500).json(`${error}`)
  }
}

const login = async (req: Request<unknown, unknown, UserLogin>, res: Response) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  try {
    if (!user) throw new Error('Username or password invalid.')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Username or password invalid.')
    const accessToken = generateAccessToken({ id: user.id, username, role: user.role })
    const refreshToken = generateRefreshToken(user.id)
    res.cookie('refreshToken', refreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: 'strict'
    })
    return res.status(200).json({
      id: user.id,
      username: user.username,
      role: user.role,
      accessToken
    })
  } catch (error) {
    console.error('Error::: Internal Server Error')
    res.status(500).json(error)
  }
}

const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  if (!refreshToken) return res.status(403).json("Error::: You're not authenticated.")
  const { id } = decodeRefreshToken(refreshToken)
  const data = await User.findById(id)
  if (!data) return res.status(403).json("Error::: You're not authenticated.")
  const user: IUserJwt = {
    id: data.id,
    username: data.username,
    role: data.role
  }

  try {
    const newAccessToken = generateAccessToken(user)
    const newRefreshToken = generateRefreshToken(user.id)
    res.clearCookie('refreshToken')
    res.cookie('refreshToken', newRefreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: 'strict'
    })
    return res.status(200).json({
      id: user.id,
      username: user.username,
      role: user.role,
      accessToken: newAccessToken
    })
  } catch (error) {
    console.error('Error::: Internal Server Error')
    res.status(500).json(`${error}`)
  }
}

export { login, register, refreshToken }
