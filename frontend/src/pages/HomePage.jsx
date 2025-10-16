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
import { visibleTaskLimit } from '@/lib/data'

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1)
  
  useEffect(() => {
    fetchTasks();
  }, [dateQuery]); 

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  //logic
  const fetchTasks = async() => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
    } catch (error) {
      console.error("Error tasks processing.", error);
      toast.error("Error tasks processing");
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  
  const handleTaskChanged = () => {
    fetchTasks();
  }

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

   const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  if (visibleTasks.length === 0) {
    handlePrev();
  }

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

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
                filterTasks = {visibleTasks}
                filter ={filter}
                handleTaskChanged={handleTaskChanged}  
              >
                
              </TaskList>

              {/* Pagination and filter by DateTime */}
              <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
                    <TaskListPagination
                      handleNext={handleNext}
                      handlePrev={handlePrev}
                      handlePageChange={handlePageChange}
                      page={page}
                      totalPages={totalPages}
                    >

                    </TaskListPagination>

                    <DateTimeFilter
                    dateQuery={dateQuery}
                    setDateQuery={setDateQuery}
                    >

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