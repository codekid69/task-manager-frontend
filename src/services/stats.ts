import api from '../lib/api'
import type { Stats } from '../types'

export const statsService = {
  getOverview: async (): Promise<Stats> => {
    const response = await api.get('/stats/overview')
    return response.data
  },
}