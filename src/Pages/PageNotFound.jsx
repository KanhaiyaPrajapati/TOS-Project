import { Box } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import pagenotfound from '../Images/illustration_404.svg'

const PageNotFound = () => {
  return (
    <>
    <div className='shadow-lg w-50 mx-auto pagenotfound px-4 py-4'>
        <h2 className='text-center mb-2'>Page Not found</h2>
        <h5 className='px-2 py-2 text-center'>Sorry, we couldn’t find the page you’re looking for. Perhaps <br /> you’ve mistyped the URL? Be sure to check your spelling.</h5>
        <hr />
        <div className='text-center'>
          <img src={pagenotfound} alt="" className='img-fluid h-50 w-50' />
        </div>
        <div className='text-center mt-5'>
         <NavLink to='/dashboard'><button className='btn btn-primary rounded'>Go To Home</button></NavLink> 
        </div>
    </div>
    </>
  )
}
export default PageNotFound