import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import AddTask from '@/components/AddTask'
import StatsAndFilters from '@/components/StatsAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import { toast } from 'sonner'
import api from '@/lib/axios'

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, []); 

  //logic
  const fetchTasks = async() => {
    try {
      const res = await api.get("/tasks");
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
    } catch (error) {
      console.error("Error tasks processing.", error);
      toast.error("Error tasks processing");
    }
  };

  //variable
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "completed";
      default:
        return true;
    }
  });

  const handleTaskChanged = () => {
    fetchTasks();
  }

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Emerald Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #10b981 100%)
          `,
          backgroundSize: "100% 100%",
        }}
      />
      {/* Your Content/Components */}
        <div className='container pt-8 mx-auto relative z-10'> 
          <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
              {/* Header */}
              <Header>

              </Header>

              {/* Adding Task */}
              <AddTask
                handleNewTaskAdded = {handleTaskChanged}
              >

              </AddTask>

              {/* Stats and Filters */}
              <StatsAndFilters
                filter = {filter}
                setFilter = {setFilter}
                activeTasksCount = {activeTaskCount}
                completedTasksCount = {completeTaskCount} >
              </StatsAndFilters>

              {/* Task List */}
              <TaskList 
                filterTasks = {filteredTasks}
                filter ={filter}
                handleTaskChanged={handleTaskChanged}  
              >
                
              </TaskList>

              {/* Pagination and filter by DateTime */}
              <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
                    <TaskListPagination>

                    </TaskListPagination>

                    <DateTimeFilter>

                    </DateTimeFilter>
              </div>

              {/* Footer */}
              <Footer
                activeTasksCount = {activeTaskCount}
                completedTasksCount = {completeTaskCount} >

              </Footer>
          </div>
        </div>
    </div>
  )
}

export default HomePage