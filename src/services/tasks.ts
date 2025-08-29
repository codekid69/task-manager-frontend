import api from '../lib/api'
import type { Task, TaskFilters, PaginatedResponse, Activity } from '../types'

export interface CreateTaskRequest {
  title: string
  description: string
  status?: 'todo' | 'in-progress' | 'completed'
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  dueDate?: string
  tags?: string[]
  assignee?: string
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {
  _id: string
}

export const tasksService = {
  getTasks: async (filters: TaskFilters = {}): Promise<PaginatedResponse<Task>> => {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== null) {
        params.append(key, String(value))
      }
    })
    
    const response = await api.get(`/tasks?${params.toString()}`)
    return response.data
  },

  getTask: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`)
    return response.data
  },

  createTask: async (data: CreateTaskRequest): Promise<Task> => {
    const response = await api.post('/tasks', data)
    return response.data
  },

  updateTask: async (data: UpdateTaskRequest): Promise<Task> => {
    const { _id, ...updateData } = data
    const response = await api.patch(`/tasks/${_id}`, updateData)
    return response.data
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`)
  },

  getTaskActivity: async (id: string): Promise<{ items: Activity[] }> => {
    const response = await api.get(`/tasks/${id}/activity`)
    return response.data
  },
}