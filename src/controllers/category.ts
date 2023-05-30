import { type Response } from 'express'

import Category from '../models/category'
import { type ICategory, type IUserRequest } from '../types'

const getAllCategoriesByUser = async (req: IUserRequest, res: Response) => {
  try {
    const userId = req.user

    const categories = await Category.find({ user: userId }).select(
      '-user -__v'
    )

    res.status(200).json({ categories })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

const addCategory = async (req: IUserRequest, res: Response) => {
  try {
    const { name, isEditable, color, icon } = req.body as ICategory

    const category = {
      name,
      isEditable,
      color,
      icon
    }

    const newCategory = new Category({
      ...category,
      user: req.user
    })

    await newCategory.save()

    res.status(201).json({ category })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

const deleteCategory = async (req: IUserRequest, res: Response) => {
  try {
    const { categoryId } = req.params
    await Category.deleteOne({
      _id: categoryId,
      user: req.user
    })
    res.status(200).json({ message: 'Category deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

export { getAllCategoriesByUser, addCategory, deleteCategory }
