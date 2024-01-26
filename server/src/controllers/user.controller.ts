import User, { UserDocument } from '@/models/user.model'
import { Request, Response } from 'express'

const updateOne = async (req: Request<{ id: string }, unknown, UserDocument>, res: Response) => {
  const { id } = req.params

  try {
    const user = await User.findByIdAndUpdate(id, req.body)
    if (!user) throw new Error('Not found user')
    res.status(200).json(req.body)
  } catch (error) {
    console.error('Error::: ', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const readAll = async (req: Request<unknown, unknown, UserDocument>, res: Response) => {
  const { search } = req.query
  const regex = new RegExp(`(${search})(\\w+)?`, 'i')

  try {
    if (!search) return res.status(200).json(await User.find().lean())
    const list = await User.find({ username: { $regex: regex } }).lean()
    return res.status(200).json(list)
  } catch (error) {
    console.error('Error::: ', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const deleteOne = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    return res.status(200).json(user)
  } catch (error) {
    console.error('Error::: ', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export { updateOne, readAll, deleteOne }
