import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectTrigger,
	SelectItem,
	SelectValue,
	SelectContent,
} from '../ui/select'
import { Textarea } from '../ui/textarea'
import CustomSelect from '../CustomSelect'
import useOptions from '@/hooks/useOptions'
import VisacSelect from '../visacSelect'

const VisitationForm = ({ visitForm, handleSubmit }) => {
	const memoizedOptions = useOptions()
	const { sphereOptions, cylinderOptions, addOptions } = memoizedOptions()
	return (
		<div className='mx-5'>
			<Form {...visitForm}>
				<form
					onSubmit={visitForm.handleSubmit(handleSubmit)}
					className='space-y-8'
				>
					<div className=' text-sm'>
						<div className='flex gap-2 items-center'>
							<Label>Date: </Label>
							<p className='text-muted-foreground'>
								{new Date().toLocaleDateString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric',
								})}
							</p>
						</div>
						<div className='flex gap-2 items-center'>
							<Label>Time: </Label>
							<p className='text-muted-foreground'>
								{new Date().toLocaleTimeString('en-US', {
									hour12: true,
									hour: 'numeric',
									minute: 'numeric',
								})}
							</p>
						</div>
					</div>
					<div className='flex flex-col gap-5'>
						<div className='grid grid-cols-1 md:grid-cols-1 gap-4'>
							<h3 className='text-lg font-semibold space-y-5'>
								Visual Acuity
							</h3>
							<div className='grid grid-cols-2 gap-2 ml-5'>
								<div>
									<p className='text-sm text-muted-foreground '>
										Distance: 20 feet (Far)
									</p>
									<div className='flex lg:flex-col gap-3'>
										<FormField
											control={visitForm.control}
											name='visit_data.visualAcuityNearRight'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<div className='flex flex-row gap-2 items-center'>
															<p className='text-sm font-semibold text-foreground'>
																OD
															</p>
															<VisacSelect
																field={field}
															/>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={visitForm.control}
											name='visit_data.visualAcuityNearLeft'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<div className='flex flex-row gap-2 items-center'>
															{' '}
															<p className='text-sm font-semibold text-foreground'>
																OS
															</p>
															<VisacSelect
																field={field}
															/>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
								<div>
									<p className='text-sm text-muted-foreground '>
										Distance: 14 to 16 inches (Near)
									</p>
									<div className='flex lg:flex-col gap-3'>
										<FormField
											control={visitForm.control}
											name='visit_data.visualAcuityDistanceRight'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<div className='flex flex-row items-center gap-2'>
															<p className='text-sm font-semibold text-foreground'>
																OD
															</p>
															<VisacSelect
																field={field}
															/>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={visitForm.control}
											name='visit_data.visualAcuityDistanceLeft'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<div className='flex flex-row gap-2 items-center'>
															<p className='text-sm font-semibold text-foreground'>
																OS
															</p>
															<VisacSelect
																field={field}
															/>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>
						</div>

						<div>
							<h3 className='text-lg font-semibold'>
								Refraction
							</h3>

							<div className='ml-5'>
								<div className='grid grid-cols-5 gap-4 text-center font-semibold mb-2 text-sm'>
									<div className='col-span-1'></div>
									<div>SPH</div>
									<div>CYL</div>
									<div>AXIS</div>
									<div>ADD</div>
								</div>
								<div className='grid grid-cols-5 gap-4 mb-4 items-center'>
									<div className=' text-sm font-semibold text-right'>
										OD (Right)
									</div>
									<FormField
										control={visitForm.control}
										name='visit_data.odSphere'
										render={({ field }) => {
											return (
												<FormItem>
													<FormControl>
														<CustomSelect
															label='0.00'
															options={
																sphereOptions
															}
															field={field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)
										}}
									/>
									<FormField
										control={visitForm.control}
										name='visit_data.odCyl'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<CustomSelect
														label='0.00'
														options={
															cylinderOptions
														}
														field={field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={visitForm.control}
										name='visit_data.odAxis'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														placeholder='eg.45'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={visitForm.control}
										name='visit_data.odAdd'
										render={({ field }) => (
											<FormItem>
												{/* <FormLabel>Add</FormLabel> */}
												<FormControl>
													<CustomSelect
														label='0.00'
														options={addOptions}
														field={field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='grid grid-cols-5 gap-4 items-center'>
									<div className='font-semibold text-right text-sm'>
										OS (Left)
									</div>
									<FormField
										control={visitForm.control}
										name='visit_data.osSphere'
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
										control={visitForm.control}
										name='visit_data.osCyl'
										render={({ field }) => (
											<FormItem>
												{/* <FormLabel>Cylinder</FormLabel> */}
												<FormControl>
													<CustomSelect
														label='0.00'
														options={
															cylinderOptions
														}
														field={field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={visitForm.control}
										name='visit_data.osAxis'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														placeholder='eg. 45'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={visitForm.control}
										name='visit_data.osAdd'
										render={({ field }) => (
											<FormItem>
												{/* <FormLabel>Add</FormLabel> */}
												<FormControl>
													<CustomSelect
														label='0.00'
														options={addOptions}
														field={field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={visitForm.control}
									name='visit_data.lensType'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Lens Type</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select lens type' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='Single'>
														Single Vision
													</SelectItem>
													<SelectItem value='Bifocal'>
														Bifocal
													</SelectItem>
													<SelectItem value='Progressive'>
														Progressive
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className='flex flex-col gap-2'>
							<div className='ml-5 flex flex-col gap-2'>
								<FormField
									control={visitForm.control}
									name='visit_data.docNotes'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Additional Notes
											</FormLabel>
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
							</div>
						</div>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default VisitationForm
