import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate=useNavigate()
  return (
    <div className='px-5 lg:px-20 flex justify-between bg-[#b9c7b5] py-10 text-[#023020]'>
        <div>
            <p>Company Name</p>
            <p>© XXXX 2024 	</p>
        </div>
        <div>
            <p className='cursor-pointer hover:text-gray-700' onClick={()=>navigate("/tool")}>Tools</p>
            <p className='cursor-pointer hover:text-gray-700' onClick={()=>navigate("/resources")}>Resources</p>
            <p className='cursor-pointer hover:text-gray-700' onClick={()=>navigate("/archive")}>Archive</p>
        </div>
    </div>
  )
}

export default Footer