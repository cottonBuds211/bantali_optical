import { Button } from '@/components/ui/button'

const NotFound = () => {
	const handleClick = () => {
		window.history.back()
	}
	return (
		<div className='flex flex-col gap-5 h-screen justify-center items-center'>
			<p className='text-muted-foreground text-9xl'>404</p>
			<p className='text-xl font-bold'>Page Not Found</p>
			<Button onClick={handleClick} variant='outline'>
				Go back
			</Button>
		</div>
	)
}

export default NotFound
