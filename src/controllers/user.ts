import { type Request, type Response } from 'express'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import omit from 'lodash/omit'

import User from '../models/user'

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email }).lean()
    if (existingUser != null) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    })

    await newUser.save()

    const payload = { id: newUser._id, email: newUser.email }
    if (!process.env.JWT_SECRET_KEY) throw new Error('JWT_SECRET_KEY not found')
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY)

    res.status(201).json({ message: 'User created successfully', token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).lean()

    if (user == null) {
      return res.status(404).json({ message: 'Invalid email or password' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(404).json({ message: 'Invalid email or password' })
    }

    const payload = { id: user._id, email: user.email }
    if (!process.env.JWT_SECRET_KEY) throw new Error('JWT_SECRET_KEY not found')
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY)

    res.status(200).json({
      user: omit(user, ['_id', 'createdAt', 'updatedAt', '__v', 'password']),
      token
    })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

export { createUser, getUser }
