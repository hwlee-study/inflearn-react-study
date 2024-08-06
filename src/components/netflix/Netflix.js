import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Nav from './Nav'

function Netflix() {
  return (
    <div className="w-full h-100% m-auto bg-[#111]">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}
export default Netflix
