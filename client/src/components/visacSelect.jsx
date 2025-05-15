import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from './ui/select'
const visacSelect = ({ field }) => {
	return (
		<Select
			onValueChange={field.onChange}
			defaultValue={field.value}
			placement='bottom-end'
		>
			<SelectTrigger className='w-fit'>
				<SelectValue placeholder='0' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='20/20'>20/20</SelectItem>
				<SelectItem value='20/25'>20/25</SelectItem>
				<SelectItem value='20/30'>20/30</SelectItem>
				<SelectItem value='20/40'>20/40</SelectItem>
				<SelectItem value='20/50'>20/50</SelectItem>
				<SelectItem value='20/70'>20/70</SelectItem>
				<SelectItem value='20/100'>20/100</SelectItem>
				<SelectItem value='20/200'>20/200</SelectItem>
			</SelectContent>
		</Select>
	)
}

export default visacSelect
