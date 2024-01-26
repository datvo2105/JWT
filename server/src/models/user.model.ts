import { Schema, Document, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { Role } from '@/types/user.type'

export interface UserDocument extends Document {
  username: string
  email: string
  password: string
  role: Role
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      unique: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: Role,
      default: Role.user
    }
  },
  {
    timestamps: true
  }
)

userSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(this.password, salt)
  this.password = hashPassword
  return next()
})

export default model('User', userSchema)
