import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, Tag, MoreVertical } from 'lucide-react'
import { Card, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { formatDate } from '../../lib/utils'
import type { Task } from '../../types'

interface TaskCardProps {
  task: Task
  onEdit?: (task: Task) => void
  onDelete?: (task: Task) => void
}

const statusConfig = {
  todo: { label: 'To Do', variant: 'default' as const },
  'in-progress': { label: 'In Progress', variant: 'info' as const },
  completed: { label: 'Completed', variant: 'success' as const },
}

const priorityConfig = {
  low: { label: 'Low', variant: 'default' as const },
  medium: { label: 'Medium', variant: 'warning' as const },
  high: { label: 'High', variant: 'danger' as const },
  urgent: { label: 'Urgent', variant: 'danger' as const },
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const statusInfo = statusConfig[task.status]
  const priorityInfo = priorityConfig[task.priority]

  return (
    <Card className="hover:shadow-xl transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Link to={`/tasks/${task._id}`} className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {task.title}
            </h3>
          </Link>
          <div className="flex items-center ml-2">
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
          {task.description}
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant={statusInfo.variant}>
            {statusInfo.label}
          </Badge>
          <Badge variant={priorityInfo.variant}>
            {priorityInfo.label}
          </Badge>
          {task.tags.map((tag) => (
            <Badge key={tag} variant="default">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            {task.assignee && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{task.assignee.name}</span>
              </div>
            )}
            {task.dueDate && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}