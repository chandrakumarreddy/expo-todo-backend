import { type Response } from 'express'

import Task from '../models/task'
import { ITask, type IUserRequest } from '../types'

const getAllTasksByUser = async (req: IUserRequest, res: Response) => {
  try {
    const userId = req.user

    const tasks = await Task.find({ user: userId }).select('-user -__v')

    res.status(200).json({ tasks })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

const getAllCompletedTasks = async (req: IUserRequest, res: Response) => {
  try {
    const userId = req.user

    const tasks = await Task.find({ user: userId, isCompeted: true }).select(
      '-user -__v'
    )

    res.status(200).json({ tasks })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

const getAllTodayTasks = async (req: IUserRequest, res: Response) => {
  try {
    const userId = req.user
    const todaysDate = new Date()
    todaysDate.setHours(0, 0, 0, 0)
    const tasks = await Task.find({
      user: userId,
      date: todaysDate.toISOString()
    }).select('-user -__v')

    res.status(200).json({ tasks })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

const toggleTask = async (req: IUserRequest, res: Response) => {
  const { taskId } = req.params
  const { isCompleted } = req.body

  try {
    const task = await Task.findById(taskId)
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }

    task.isCompeted = isCompleted

    await task.save()

    res.json(task)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

const createTask = async (req: IUserRequest, res: Response) => {
  try {
    const { name, isCompleted, categoryId, date } = req.body as ITask

    const task = {
      name,
      isCompleted,
      categoryId,
      date
    }

    const newTask = new Task({
      ...task,
      user: req.user
    })

    await newTask.save()

    res.status(201).json({ task })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

const updateTask = async (req: IUserRequest, res: Response) => {
  const { taskId } = req.params
  const { name, isCompleted, categoryId, date } = req.body

  try {
    const task = await Task.findById(taskId)
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    task.name = name
    task.categoryId = categoryId
    task.isCompeted = isCompleted
    task.date = date

    await task.save()

    res.json(task)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

const deleteTask = async (req: IUserRequest, res: Response) => {
  try {
    const taskId = req.params.taskId

    await Task.deleteOne({ _id: taskId, user: req.user })

    res.status(200).json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

export {
  getAllTasksByUser,
  updateTask,
  deleteTask,
  getAllCompletedTasks,
  getAllTodayTasks,
  toggleTask,
  createTask
}
