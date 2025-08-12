import React from 'react'

const Loader = () => {
  return (
    <div className='flex flex-col items-center m-50'>
        <span className="loading loading-infinity size-15"></span>
        <span>Loading...</span>
    </div>
  )
}

export default Loader