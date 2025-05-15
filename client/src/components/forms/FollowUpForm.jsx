import {
	Form,
	FormLabel,
	FormField,
	FormItem,
	FormMessage,
	FormControl,
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Separator } from '../ui/separator'

const FollowUpForm = ({ followUpForm }) => {
	return (
		<Form {...followUpForm}>
			<Separator className='my-2' />
			<div className='flex justify-center'>
				<FormLabel className='text-md text-center mt-2'>
					Follow up
				</FormLabel>
			</div>
			<div className='space-y-4'>
				<FormField
					control={followUpForm.control}
					name='reason_for_follow_up'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Reason</FormLabel>
							<FormControl>
								<Input
									placeholder='Pick up glasses etc.'
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={followUpForm.control}
					name='doctor_notes'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Additional Notes</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Enter any additional notes'
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</Form>
	)
}

export default FollowUpForm
