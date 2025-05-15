import {
	Form,
	FormField,
	FormLabel,
	FormMessage,
	FormControl,
	FormItem,
} from '../ui/form'
import { Input } from '../ui/input'
import {
	Select,
	SelectTrigger,
	SelectItem,
	SelectValue,
	SelectContent,
} from '../ui/select'
import { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import CustomSelect from '../CustomSelect'
import useOptions from '@/hooks/useOptions'
import VisacSelect from '../visacSelect'

const CheckUpForm = ({ checkUpForm }) => {
	const [isColorBlind, setIsColorBlind] = useState(null)
	const memoizedOptions = useOptions()
	const { sphereOptions, cylinderOptions, axisOptions, visualAcuityOption } =
		memoizedOptions()
	return (
		<Form {...checkUpForm}>
			<div className='space-y-4'>
				<h3 className='text-lg font-semibold'>Visual Acuity</h3>
				<div className='grid grid-cols-1 md:grid-cols-1 gap-4'>
					<div>
						<h4 className='text-sm font-medium mb-2'>Near</h4>
						<div className='grid grid-cols-2 gap-2'>
							<FormField
								control={checkUpForm.control}
								name='visualAcuityNearRight'
								render={({ field }) => (
									<FormItem>
										<p className='text-sm text-foreground'>
											Right
										</p>
										<FormControl>
											<VisacSelect field={field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={checkUpForm.control}
								name='visualAcuityNearLeft'
								render={({ field }) => (
									<FormItem>
										<p className='text-sm text-foreground'>
											Left
										</p>
										<FormControl>
											<VisacSelect field={field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div>
						<h4 className='text-sm font-medium mb-2'>Distance</h4>
						<div className='grid grid-cols-2 gap-2'>
							<FormField
								control={checkUpForm.control}
								name='visualAcuityDistanceRight'
								render={({ field }) => (
									<FormItem>
										<p className='text-sm text-foreground'>
											Right
										</p>
										<FormControl>
											<VisacSelect field={field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={checkUpForm.control}
								name='visualAcuityDistanceLeft'
								render={({ field }) => (
									<FormItem>
										<p className='text-sm text-foreground'>
											Left
										</p>
										<FormControl>
											<VisacSelect field={field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='space-y-4'>
				<h3 className='text-lg font-semibold'>Refraction</h3>

				<div className='grid grid-cols-4 gap-4 text-center font-semibold mb-2 text-sm'>
					<div className='col-span-1'></div>
					<div>SPH</div>
					<div>CYL</div>
					<div>AXIS</div>
				</div>
				<div className='grid grid-cols-4 gap-4 mb-4 items-center'>
					<div className=' text-sm font-semibold text-right'>
						OD (Right)
					</div>
					<FormField
						control={checkUpForm.control}
						name='refractionSphereRight'
						render={({ field }) => {
							return (
								<FormItem>
									<FormControl>
										<CustomSelect
											label='0.00'
											options={sphereOptions}
											field={field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)
						}}
					/>
					<FormField
						control={checkUpForm.control}
						name='refractionCylinderRight'
						render={({ field }) => (
							<FormItem>
								{/* <FormLabel>Cylinder</FormLabel> */}
								<FormControl>
									<CustomSelect
										label='0.00'
										options={cylinderOptions}
										field={field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={checkUpForm.control}
						name='refractionAxisRight'
						render={({ field }) => (
							<FormItem>
								{/* <FormLabel>Axis</FormLabel> */}
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										placement='bottom-end'
									>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='0' />
										</SelectTrigger>
										<SelectContent>
											{axisOptions.map(option => (
												<SelectItem
													key={option.value}
													value={option.value}
												>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='grid grid-cols-4 gap-4 items-center'>
					<div className='font-semibold text-right text-sm'>
						OS (Left)
					</div>
					<FormField
						control={checkUpForm.control}
						name='refractionSphereLeft'
						render={({ field }) => (
							<FormItem>
								{/* <FormLabel>Sphere</FormLabel> */}
								<FormControl>
									<CustomSelect
										label='0.00'
										options={sphereOptions}
										field={field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={checkUpForm.control}
						name='refractionCylinderLeft'
						render={({ field }) => (
							<FormItem>
								{/* <FormLabel>Cylinder</FormLabel> */}
								<FormControl>
									<CustomSelect
										label='0.00'
										options={cylinderOptions}
										field={field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={checkUpForm.control}
						name='refractionAxisLeft'
						render={({ field }) => (
							<FormItem>
								{/* <FormLabel>Axis</FormLabel> */}
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='0' />
										</SelectTrigger>
										<SelectContent>
											{axisOptions.map(option => (
												<SelectItem
													key={option.value}
													value={option.value}
												>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>

			<div className='space-y-4'>
				<h3 className='text-lg font-semibold'>Color Vision</h3>
				<FormField
					control={checkUpForm.control}
					name='colorBlind'
					render={({ field }) => (
						<FormItem className='space-y-3'>
							<FormLabel>Color Blind</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={value => {
										field.onChange(value)
										setIsColorBlind(value === 'Yes')
									}}
									defaultValue={field.value}
									className='flex flex-row space-x-4'
								>
									<FormItem className='flex items-center space-x-3 space-y-0'>
										<FormControl>
											<RadioGroupItem value='Yes' />
										</FormControl>
										<FormLabel className='font-normal'>
											Yes
										</FormLabel>
									</FormItem>
									<FormItem className='flex items-center space-x-3 space-y-0'>
										<FormControl>
											<RadioGroupItem value='No' />
										</FormControl>
										<FormLabel className='font-normal'>
											No
										</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{isColorBlind && (
					<div className='space-y-4'>
						<FormField
							control={checkUpForm.control}
							name='colorBlindType'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Color Blind Type</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										placement='bottom-end'
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select type' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='Protan (red)'>
												Protan (red)
											</SelectItem>
											<SelectItem value='Deutan (green)'>
												Deutan (green)
											</SelectItem>
											<SelectItem value='Tritan (blue)'>
												Tritan (blue)
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={checkUpForm.control}
							name='colorBlindSeverity'
							render={({ field }) => (
								<FormItem className='space-y-3'>
									<FormLabel>Severity</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className='flex flex-row space-x-4'
										>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='Mild' />
												</FormControl>
												<FormLabel className='font-normal'>
													Mild
												</FormLabel>
											</FormItem>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='Severe' />
												</FormControl>
												<FormLabel className='font-normal'>
													Severe
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				)}
			</div>

			<div className='space-y-4'>
				<h3 className='text-lg font-semibold'>Additional Tests</h3>
				<FormField
					control={checkUpForm.control}
					name='eyeMovementCoordination'
					render={({ field }) => (
						<FormItem className='space-y-3'>
							<FormLabel>Eye Movement and Coordination</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className='flex flex-row space-x-4'
								>
									<FormItem className='flex items-center space-x-3 space-y-0'>
										<FormControl>
											<RadioGroupItem value='Normal' />
										</FormControl>
										<FormLabel className='font-normal'>
											Normal
										</FormLabel>
									</FormItem>
									<FormItem className='flex items-center space-x-3 space-y-0'>
										<FormControl>
											<RadioGroupItem value='Abnormal' />
										</FormControl>
										<FormLabel className='font-normal'>
											Abnormal
										</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<FormField
				control={checkUpForm.control}
				name='docNotes'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Additional Notes</FormLabel>
						<FormControl>
							<Textarea
								placeholder='Enter any additional notes or observations'
								className='resize-none'
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</Form>
	)
}

export default CheckUpForm
