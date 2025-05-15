import { FormControl, FormItem, FormLabel } from './ui/form'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

const GenderSelect = ({ field }) => {
	return (
		<RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
			<div className='flex flex-row gap-4'>
				<FormItem className='flex flex-1 rounded-md border py-2 px-5 items-center'>
					<div className='flex flex-row gap-2'>
						<FormControl>
							<RadioGroupItem value='Male' />
						</FormControl>
						<Label className='text-muted-foreground'>Male</Label>
					</div>
				</FormItem>

				<FormItem className='flex flex-1  rounded-md border p-3 items-center'>
					<div className='flex flex-row gap-2'>
						<FormControl>
							<RadioGroupItem value='Female' />
						</FormControl>
						<Label className='text-muted-foreground'>Female</Label>
					</div>
				</FormItem>
				<FormItem className='flex flex-1  rounded-md border p-3 items-center'>
					<div className='flex flex-row gap-2'>
						<FormControl>
							<RadioGroupItem value='Other' />
						</FormControl>
						<Label className='text-muted-foreground'>Other</Label>
					</div>
				</FormItem>
			</div>
		</RadioGroup>
	)
}

export default GenderSelect
