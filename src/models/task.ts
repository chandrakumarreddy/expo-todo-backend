import mongoose, { Schema } from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Categody',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    isCompeted: {
      type: String,
      default: false
    },
    date: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const Task = mongoose.model('Task', taskSchema)

export default Task
