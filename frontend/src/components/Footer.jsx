import React from 'react'

const Footer = ({completedTaskCount = 0, activeTaskCount = 0}) => {
  return <>
    {completedTaskCount+activeTaskCount>0 && (
      <div className='text-center'>
       <p className='text-sm text-muted-foreground'>
       {
        completedTaskCount > 0 && (
          <>
              Great! you have completed {completedTaskCount} tasks
              {
                activeTaskCount > 0 && `, just ${activeTaskCount} tasks left. Fighting!!!`
              }
          </>
        )
       }

       {completedTaskCount === 0 && activeTaskCount > 0 && (
        <>
          Let do {activeTaskCount} tasks!!
        </>
       )}
       </p>
      </div>
  )}
  
  </>;
}

export default Footer