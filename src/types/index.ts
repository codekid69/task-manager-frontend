export interface User {
  _id: string
  name: string
  email: string
  role: 'admin' | 'member'
  avatar?: string
  createdAt: string
}

export interface Task {
  _id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  dueDate?: string
  tags: string[]
  assignee?: User
  owner: User
  createdAt: string
  updatedAt: string
}

export interface Activity {
  _id: string
  action: string
  field?: string
  oldValue?: any
  newValue?: any
  user: User
  createdAt: string
}

export interface TaskFilters {
  status?: string
  priority?: string
  assignee?: string
  owner?: string
  dueFrom?: string
  dueTo?: string
  tags?: string
  search?: string
  page?: number
  limit?: number
  sort?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  page: number
  limit: number
  total: number
  pages: number
}

export interface Stats {
  byStatus: Record<string, number>
  byPriority: Record<string, number>
  overdue: number
}