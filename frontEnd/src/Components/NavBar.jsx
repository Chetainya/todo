import React from 'react'
import { Outlet } from 'react-router-dom'

function NavBar() {
  return (
    <div>
      <h1>NavBar</h1>
      <Outlet />
    </div>
  )
}

export default NavBar
