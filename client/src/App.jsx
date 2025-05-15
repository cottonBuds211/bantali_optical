import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { getApp } from './utils/urlHelper'
import { TooltipProvider } from './components/ui/tooltip'
const App = () => {
	const CurrentApp = getApp()
	return (
		<BrowserRouter>
			<Toaster />
			<TooltipProvider>
				<CurrentApp />
			</TooltipProvider>
		</BrowserRouter>
	)
}

export default App
