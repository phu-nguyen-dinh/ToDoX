import React, { useState } from 'react'
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import api from '@/lib/axios';
import { toast } from 'sonner';

const TaskCard = ({task, index, handleTaskChanged}) => {
  const [isEditting, setIsEditing] = useState(false);
  const [updateTaskTitle, setUpDateTaskTitle] = useState(task.title || "");

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success('Task has been deleted.')
      handleTaskChanged();
    } catch (error) {
      console.error("Error when delete Task.", error);
      toast.error("Error when delete Task.");
    }
  };


  const handleKeyPress = (event) => {
    if(event.key === "Enter"){
        updateTask();
    }
  }

  const updateTask = async () => {
    try {
      setIsEditing(false);
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle
      });
      toast.success(`Task has been updated to ${updateTaskTitle}`)
      handleTaskChanged();
    } catch (error) {
      console.error("Error when update Task.", error);
      toast.error("Error when update Task.");
    }
  }

  const toggleTaskCompleteButton = async () => {
    try {
      if(task.status==='active'){
        await api.put(`/tasks/${task._id}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });
        toast.success(`${task.title} has been completed`);
      }
      else{
        await api.put(`/tasks/${task._id}`,{
          status: "active",
          completedAt: null,
        });
        toast.success(`${task.title} has been changed to 'active'`);
      }
      handleTaskChanged();
    } catch (error) {
      console.error("Error when changing the status.", error);
      toast.error("Error when changing the status.");
    }
  }

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "complete" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* nút tròn */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "complete"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
          onClick = {toggleTaskCompleteButton}
        >
          {task.status === "completed" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* hiển thị hoặc chỉnh sửa tiêu đề */}
        <div className="flex-1 min-w-0">
          {isEditting ? (
            <Input
              placeholder="What need to do?"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              value = {updateTaskTitle}
              onChange = {(e) => setUpDateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur ={() => {
                setIsEditing(false);
                setUpDateTaskTitle(task.title || "")
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "complete"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {task.title}
            </p>
          )}

          {/* ngày tạo & ngày hoàn thành */}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* nút chỉnh và xoá */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/* nút edit */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick ={() => {
              setIsEditing(true);
              setUpDateTaskTitle(task.title ||"");
            }}
          >
            <SquarePen className="size-4" />
          </Button>

          {/* nút xoá */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick ={() => deleteTask(task._id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default TaskCard