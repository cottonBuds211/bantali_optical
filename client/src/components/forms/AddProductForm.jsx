import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	Select,
	SelectTrigger,
	SelectItem,
	SelectValue,
	SelectContent,
} from '../ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

import productSchema from '../zodSchema/productFormSchema'
import { useState } from 'react'
import InventoryServices from '@/services/inventoryServices'
import { useToast } from '../ui/use-toast'
import useAuth from '@/hooks/useAuth'

const AddProductForm = ({ setIsDialogOpen, setRefresh }) => {
	const { auth } = useAuth()
	const { toast } = useToast()
	const inventoryServices = new InventoryServices()

	const [preview, setPreview] = useState(null) // for image preview

	const productForm = useForm({
		resolver: zodResolver(productSchema),
		defaultValues: {
			item_name: '',
			color: '',
			item_type: '',
			material: '',
			stockQuantity: '',
			price: '',
			image: null,
		},
	})
	const onSubmit = async data => {
		try {
			const product = await inventoryServices.addInventory({
				...data,
				user_id: auth.user.user_id,
			})
			toast({
				title: 'Success',
				description: `${product.item_name} added to the database`,
				duration: 3000,
			})
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Failed',
				description: error.response?.data.error,
				duration: 3000,
			})
		} finally {
			setRefresh(true)
			setIsDialogOpen(false)
		}
	}

	return (
		<Form {...productForm}>
			<form
				onSubmit={productForm.handleSubmit(onSubmit)}
				className='space-y-2'
			>
				<FormField
					name='image'
					control={productForm.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Image</FormLabel>
							<FormControl>
								<>
									<Input
										type='file'
										accept='image/*'
										onChange={e => {
											const file = e.target.files[0]
											if (
												file &&
												file.size > 2 * 1024 * 1024
											) {
												// Check if file exceeds 2MB
												alert(
													'File size should not exceed 2MB'
												)
												return
											}
											field.onChange(file) // Bind to form state
											setPreview(
												URL.createObjectURL(file)
											) // Preview image
										}}
									/>
									{preview && (
										<div className='flex justify-center '>
											<img
												src={preview}
												alt='Preview'
												className=' mt-2 w-42 h-40 object-contain'
											/>
										</div>
									)}
								</>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={productForm.control}
					name='item_name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder='Item name'
									{...field}
									className='col-span'
									onChange={e => {
										const value = e.target.value
										if (/^[A-Za-z0-9-/ ]*$/.test(value)) {
											field.onChange(value) // Only update if input is valid
										}
									}}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={productForm.control}
					name='item_type'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Item Type</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder='Type' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='Frame'>
											Frame
										</SelectItem>
										<SelectItem value='Accessories'>
											Accessories
										</SelectItem>
										<SelectItem value='Other'>
											Other
										</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='grid lg:grid-cols-2 gap-4'>
					<FormField
						control={productForm.control}
						name='color'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Color</FormLabel>
								<FormControl>
									<Input
										placeholder='Product color'
										{...field}
										className='col-span'
										onChange={e => {
											const value = e.target.value
											if (/^[A-Za-z ]*$/.test(value)) {
												field.onChange(value) // Only update if input is valid
											}
										}}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={productForm.control}
						name='material'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Material</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger>
											<SelectValue placeholder='Material' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='Metal'>
												Metal
											</SelectItem>
											<SelectItem value='Plastic'>
												Plastic
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='grid lg:grid-cols-2 gap-4'>
					<FormField
						control={productForm.control}
						name='stockQuantity'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Stock</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter stock quantity'
										{...field}
										type='text'
										inputMode='numeric'
										step={0.01}
										onChange={e => {
											const value =
												e.target.value.replace(
													/\D/g,
													''
												)
											field.onChange(value)
										}}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={productForm.control}
						name='price'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter price amount'
										{...field}
										type='text'
										inputMode='numeric'
										step={0.01}
										onChange={e => {
											const value =
												e.target.value.replace(
													/\D/g,
													''
												)
											field.onChange(value)
										}}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='flex justify-end'>
					<Button
						className='w-full'
						type='submit'
						disabled={productForm.formState.isSubmitting}
					>
						{productForm.formState.isSubmitting ? (
							<l-ring
								size='20'
								stroke='2'
								bg-opacity='0'
								speed='2'
								color='white'
							></l-ring>
						) : (
							'Submit'
						)}
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default AddProductForm
