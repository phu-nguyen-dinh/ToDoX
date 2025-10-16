import React from 'react'

const Footer = ({completedTasksCount = 0, activeTasksCount = 0}) => {
  return <>
    {completedTasksCount+activeTasksCount>0 && (
      <div className='text-center'>
       <p className='text-sm text-muted-foreground'>
       {
        completedTasksCount > 0 && (
          <>
              Great! you have completed {completedTasksCount} tasks
              {
                activeTasksCount > 0 && `, just ${activeTasksCount} tasks left. Fighting!!!`
              }
          </>
        )
       }

       {completedTasksCount === 0 && activeTasksCount > 0 && (
        <>
          Let do {activeTasksCount} tasks!!
        </>
       )}
       </p>
      </div>
  )}
  
  </>;
}

export default Footer