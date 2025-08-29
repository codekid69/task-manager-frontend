import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { tasksService } from '../services/tasks'
import { TaskFilters } from '../components/tasks/TaskFilters'
import { TaskList } from '../components/tasks/TaskList'
import { Pagination } from '../components/tasks/Pagination'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import type { TaskFilters as TaskFiltersType } from '../types'

export const TasksPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const [filters, setFilters] = useState<TaskFiltersType>({
    status: searchParams.get('status') || '',
    priority: searchParams.get('priority') || '',
    search: searchParams.get('search') || '',
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 20,
    sort: searchParams.get('sort') || 'createdAt:-1',
  })

  // Sync URL with filters
  useEffect(() => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '' && value !== 20 && value !== 1) {
        params.set(key, String(value))
      }
    })
    setSearchParams(params)
  }, [filters, setSearchParams])

  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => tasksService.getTasks(filters),
  })

  const handleFiltersChange = (newFilters: TaskFiltersType) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({
      page: 1,
      limit: 20,
      sort: 'createdAt:-1',
    })
  }

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and organize your tasks efficiently
          </p>
        </div>
        <Link to="/tasks/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </Link>
      </div>

      <TaskFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />

      {data && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {data.total} {data.total === 1 ? 'task' : 'tasks'} found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TaskList
              tasks={data.items}
              loading={isLoading}
            />
            
            <Pagination
              currentPage={data.page}
              totalPages={data.pages}
              onPageChange={handlePageChange}
            />
          </CardContent>
        </Card>
      )}

      {error && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-red-600 dark:text-red-400">
              Failed to load tasks. Please try again.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}