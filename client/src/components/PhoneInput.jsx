'use client'

import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

const countryCodes = [{ code: 'ph', label: 'PH', dialCode: '+63' }]

export const PhoneInput = ({ control, name }) => {
	const formatPhoneNumber = value => {
		if (!value) return value
		const format = '### ### ####'

		const numbers = value.replace(/\D/g, '')
		let result = ''
		let numberIndex = 0
		//console.log(format.length)
		for (
			let i = 0;
			i < format.length && numberIndex < numbers.length;
			i++
		) {
			if (format[i] === '#') {
				result += numbers[numberIndex]
				numberIndex++
			} else {
				result += format[i]
			}
		}
		return result
	}
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Phone Number *</FormLabel>
					<FormControl>
						<div className='flex gap-2 '>
							<Select
								defaultValue={field.value?.countryCode || 'ph'}
							>
								<FormControl>
									<SelectTrigger className='w-[110px] py-5'>
										<SelectValue placeholder='Country' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{countryCodes.map(country => (
										<SelectItem
											key={country.code}
											value={country.code}
										>
											{country.label} ({country.dialCode})
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormControl>
								<Input
									{...field}
									value={formatPhoneNumber(field.value)}
									onChange={e => {
										// Only store up to 10 digits in field.value
										const newValue = e.target.value
											.replace(/\D/g, '')
											.slice(0, 10)
										field.onChange(newValue)
									}}
									className='flex-1 rounded-l-none p-5'
									placeholder='Phone number'
								/>
							</FormControl>
						</div>
					</FormControl>
					{/* <FormDescription>{description}</FormDescription> */}

					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
