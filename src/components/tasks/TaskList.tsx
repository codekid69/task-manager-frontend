import React from 'react'
import { CheckSquare } from 'lucide-react'
import { TaskCard } from './TaskCard'
import { EmptyState } from '../ui/EmptyState'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import type { Task } from '../../types'

interface TaskListProps {
  tasks: Task[]
  loading?: boolean
  onTaskEdit?: (task: Task) => void
  onTaskDelete?: (task: Task) => void
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, loading, onTaskEdit, onTaskDelete }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={<CheckSquare />}
        title="No tasks found"
        description="Create your first task to get started with organizing your work."
        action={{
          label: "Create Task",
          onClick: () => window.location.href = '/tasks/new'
        }}
      />
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onTaskEdit}
          onDelete={onTaskDelete}
        />
      ))}
    </div>
  )
}