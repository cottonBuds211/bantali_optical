import { useCallback } from 'react'
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectValue,
	SelectItem,
} from './ui/select'

const CustomSelect = ({ label, options, field }) => {
	//console.log(options) // Debugging statement, consider removing or commenting out in production

	return (
		<Select
			onValueChange={field.onChange}
			defaultValue={field.value}
			placement='bottom-end'
		>
			<SelectTrigger className='w-full'>
				<SelectValue placeholder={label} />
			</SelectTrigger>
			<SelectContent className='h-fit'>
				<div className='grid grid-cols-2 gap-1 p-1 max-h-[300px]'>
					{options.map(option => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</div>
			</SelectContent>
		</Select>
	)
}

export default CustomSelect
