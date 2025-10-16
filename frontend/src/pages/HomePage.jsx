import React from 'react'
import Header from '@/components/Header'
import AddTask from '@/components/AddTask'
import StatsAndFilters from '@/components/StatsAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'

const HomePage = () => {
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
              <AddTask>

              </AddTask>

              {/* Stats and Filters */}
              <StatsAndFilters>
                
              </StatsAndFilters>

              {/* Task List */}
              <TaskList>

              </TaskList>

              {/* Pagination and filter by DateTime */}
              <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
                    <TaskListPagination>

                    </TaskListPagination>

                    <DateTimeFilter>

                    </DateTimeFilter>
              </div>

              {/* Footer */}
              <Footer>

              </Footer>
          </div>
        </div>
    </div>
  )
}

export default HomePage