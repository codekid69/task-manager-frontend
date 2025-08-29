import React from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import type { TaskFilters as TaskFiltersType } from '../../types'

interface TaskFiltersProps {
  filters: TaskFiltersType
  onFiltersChange: (filters: TaskFiltersType) => void
  onClearFilters: () => void
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ]

  const priorityOptions = [
    { value: '', label: 'All Priority' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' },
  ]

  const sortOptions = [
    { value: 'createdAt:-1', label: 'Newest First' },
    { value: 'createdAt:1', label: 'Oldest First' },
    { value: 'title:1', label: 'Title A-Z' },
    { value: 'title:-1', label: 'Title Z-A' },
    { value: 'priority:-1', label: 'Priority High-Low' },
    { value: 'dueDate:1', label: 'Due Date Earliest' },
  ]

  const hasActiveFilters = Object.values(filters).some(value => 
    value && value !== '' && value !== 20 && value !== 1
  )

  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Status"
          value={filters.status || ''}
          onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
          options={statusOptions}
        />

        <Select
          label="Priority"
          value={filters.priority || ''}
          onChange={(e) => onFiltersChange({ ...filters, priority: e.target.value })}
          options={priorityOptions}
        />

        <Select
          label="Sort By"
          value={filters.sort || 'createdAt:-1'}
          onChange={(e) => onFiltersChange({ ...filters, sort: e.target.value })}
          options={sortOptions}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Page Size
          </label>
          <Select
            value={String(filters.limit || 20)}
            onChange={(e) => onFiltersChange({ ...filters, limit: Number(e.target.value), page: 1 })}
            options={[
              { value: '10', label: '10 items' },
              { value: '20', label: '20 items' },
              { value: '50', label: '50 items' },
              { value: '100', label: '100 items' },
            ]}
          />
        </div>
      </div>

      <Input
        placeholder="Search tasks..."
        value={filters.search || ''}
        onChange={(e) => onFiltersChange({ ...filters, search: e.target.value, page: 1 })}
        icon={<Search className="h-4 w-4" />}
      />
    </Card>
  )
}