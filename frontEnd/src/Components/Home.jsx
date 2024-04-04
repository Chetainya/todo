import React from 'react'
import {  useSelector } from 'react-redux'


function Home() {
  const user = useSelector(state => state.user);
  console.log(user);




  return (
    <div>
      Home Page
    </div>
  )
}

export default Home
