
import NavBar from '@/components/NavBar'
import React from 'react'

import AddNewInterview from '../_components/AddNewInterview'
const page = ({params}) => {
  
  // console.log(params)

  return (
    <div>
        {/* <NavBar/> */}
        <br />
        <br />
        <br />
        <br />
        <AddNewInterview username={params.username}/>
         
    </div>
  )
}

export default page
