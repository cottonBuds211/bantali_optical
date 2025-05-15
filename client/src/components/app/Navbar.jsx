import React, { useState } from 'react'
// import { Link } from "react-router-dom";
//import '../index.css'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'

const Navbar = () => {
	return (
		<div className='container font-poppins bg-transparent backdrop-blur-md text-white   flex p-4 justify-between items-center '>
			{/* Logo */}
			<div className='logo flex-shrink-0'>
				<div className='flex items-center font-playfair  text-xl font-bold'>
					<a href='/'>Bantali Optical Clinic</a>
				</div>
				{/* <img src={eye} alt="Logo" className="logo-image rounded-full" /> */}
			</div>
			{/* Desktop Navigation Links */}
			<div className='flex flex-row items-center gap-10'>
				<ul className='hidden md:flex gap-10 text-sm '>
					<li className='hover:scale-110 hover:transition-transform'>
						<a href='/'>Home</a>
					</li>
					<li className='hover:scale-110 hover:transition-transform'>
						<a href='/services' className='hover:text-sec '>
							Services
						</a>
					</li>
					<li className='hover:scale-110 hover:transition-transform'>
						<a href='/about' className='hover:text-sec '>
							About
						</a>
					</li>
					<li className='hover:scale-110 hover:transition-transform'>
						<a href='/appointment' className='hover:text-sec  '>
							Appointment
						</a>
					</li>
				</ul>
				<div className='md:flex md:items-center space-x-3'>
					<Button
						className='rounded-full bg-transparent text-md font-normal'
						variant='outline'
					>
						<a
							href='#'
							className='flex flex-row gap-2 items-center'
						>
							<Phone strokeWidth={1} className='h-5 w-6 ' />
							+63 912 346 4512
						</a>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Navbar
