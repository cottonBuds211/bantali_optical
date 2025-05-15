import { Button } from './ui/button'
const LinkButton = ({ title, icon }) => {
	const onClick = () => {
		history.back()
	}
	return (
		<Button
			className='rounded-full h-8 w-8'
			size='icon'
			variant='outline'
			onClick={onClick}
		>
			{icon && <icon>{icon}</icon>}
			<p>{title}</p>
		</Button>
	)
}

export default LinkButton
