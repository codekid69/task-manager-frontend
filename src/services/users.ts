import api from '../lib/api'
import type { User } from '../types'

export const usersService = {
  getUsers: async (): Promise<{ items: User[] }> => {
    const response = await api.get('/users')
    return response.data
  },

  updateUserRole: async (id: string, role: 'admin' | 'member'): Promise<User> => {
    const response = await api.patch(`/users/${id}/role`, { role })
    return response.data
  },
}