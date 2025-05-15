import React, { createContext, useContext, useState } from 'react'

const SideBarContext = createContext({})

const SideBarProvider = ({ children }) => {
	const [isSelected, setIsSelected] = useState('Dashboard')
	const [topBarTitle, setTopBarTitle] = useState('Dashboard')
	const [sidebarOpen, setSidebarOpen] = useState(false)

	return (
		<SideBarContext.Provider
			value={{
				isSelected,
				setIsSelected,
				topBarTitle,
				setTopBarTitle,
				sidebarOpen,
				setSidebarOpen,
			}}
		>
			{children}
		</SideBarContext.Provider>
	)
}

const useSidebar = () => {
	const context = useContext(SideBarContext)

	if (context === undefined)
		throw new Error('useSideBar must be used within a SidebarProvider')

	return context
}

export { SideBarProvider, useSidebar }
