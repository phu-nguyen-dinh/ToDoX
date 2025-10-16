import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmptyState = ({filter}) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="mx-auto size-12 text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {filter === "active"
              ? "There is no task is processing"
              : filter === "completed"
              ? "No task has completed."
              : "There is no task."}
          </h3>

          <p className="text-sm text-muted-foreground">
            {filter === "all"
              ? "Adding the first task to start"
              : `Changing to "All" to see all tasks ${
                  filter === "active" ? "completed." : "processing."
                }`}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default TaskEmptyState