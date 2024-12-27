import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-around h-10 items-center bg-violet-700 text-white'>
      <div>iTasks</div>
      <div className='flex gap-4'>
        <span>Home</span>
        <span>Your Tasks</span>
      </div>
    </div>
  )
}

export default Navbar
