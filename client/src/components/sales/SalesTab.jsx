import { useEffect, useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import PatientServices from '@/services/patientServices'
import InventoryServices from '@/services/inventoryServices'
import { SearchIcon } from 'lucide-react'
import PaginationPage from '../PaginationPage'
import BillingServices from '@/services/billingServices'
import { Badge } from '../ui/badge'
import { formatNumberWithCommas } from '@/utils/formatNumberWithComma'

const SalesTab = ({ salesData }) => {
	const [salesWithDetails, setSalesWithDetails] = useState([])
	const [loading, setLoading] = useState(true)
	const inventoryServices = new InventoryServices()
	const patientServices = new PatientServices()
	const billingServices = new BillingServices()
	const [timeFilter, setTimeFilter] = useState('all')
	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [postPerPage] = useState(10)
	const lastPostIndex = currentPage * postPerPage
	const firstPostIndex = lastPostIndex - postPerPage

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal
		const fetchSalesDetails = async () => {
			try {
				const salesDetails = await Promise.all(
					salesData.map(async sale => {
						const patient = await patientServices.getPatient(
							sale.patient_id,
							signal
						)
						const item = await inventoryServices.getInventory(
							sale.item_id,
							signal
						)
						const billing = await billingServices.getBilling(
							sale.billing_id,
							signal
						)
						return {
							...sale,
							patientName: `${patient.first_name} ${patient.last_name}`,
							itemName: item.item_name,
							billingStatus: billing.status,
							initialPaymentDate: billing.initialPaymentDate,
							finalPaymentDate: billing.finalPaymentDate,
						}
					})
				)
				setSalesWithDetails(
					salesDetails.sort((a, b) =>
						b.saleDate.localeCompare(a.saleDate)
					)
				)
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}
		if (salesData) {
			fetchSalesDetails()
		}
		return () => {
			controller.abort()
		}
	}, [salesData])

	useEffect(() => {
		setCurrentPage(1) // Reset to first page on filter change
	}, [searchTerm, timeFilter])

	// const getFilteredSalesData = () => {
	// 	const now = new Date()
	// 	const filtered = salesWithDetails?.filter(sale => {
	// 		const saleDate = new Date(sale.saleDate)
	// 		switch (timeFilter) {
	// 			case 'weekly':
	// 				return (
	// 					now.getTime() - saleDate.getTime() <=
	// 					7 * 24 * 60 * 60 * 1000
	// 				)
	// 			case 'monthly':
	// 				return (
	// 					now.getMonth() === saleDate.getMonth() &&
	// 					now.getFullYear() === saleDate.getFullYear()
	// 				)
	// 			case 'yearly':
	// 				return now.getFullYear() === saleDate.getFullYear()
	// 			default:
	// 				return true
	// 		}
	// 	})
	// 	return filtered.filter(
	// 		sale =>
	// 			sale.frameName
	// 				.toLowerCase()
	// 				.includes(searchTerm.toLowerCase()) ||
	// 			sale.patientName
	// 				.toLowerCase()
	// 				.includes(searchTerm.toLowerCase()) ||
	// 			sale.billing_id.toLowerCase().includes(searchTerm.toLowerCase())
	// 	)
	// }

	const filteredSales = salesWithDetails.filter(
		sale =>
			sale.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			sale.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			sale.billing_id.toLowerCase().includes(searchTerm.toLowerCase())
	)
	const currentPosts = filteredSales?.slice(firstPostIndex, lastPostIndex)

	return (
		<div>
			<div className='flex mb-4'>
				<div className='flex items-center w-1/3 mr-2'>
					<div className='flex w-full h-10 items-center border border-input pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2'>
						<SearchIcon className='h-[16px] w-[16px]' />
						<Input
							placeholder='Search sales...'
							className='w-full p-2 placeholder:text-muted-foreground border-0 ring-offset-background focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50 bg-transparent'
							autoComplete='off'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
					</div>
				</div>
				{/* <div className='flex flex-row w-fit ml-2 items-center gap-2'>
					<Label htmlFor='timeFilter' className='w-fit'>
						Filter
					</Label>
					<Select
						value={timeFilter}
						onValueChange={setTimeFilter}
						className='w-fit'
					>
						<SelectTrigger id='timeFilter'>
							<SelectValue placeholder='Select time range' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>All Time</SelectItem>
							<SelectItem value='weekly'>Weekly</SelectItem>
							<SelectItem value='monthly'>Monthly</SelectItem>
							<SelectItem value='yearly'>Yearly</SelectItem>
						</SelectContent>
					</Select>
				</div> */}
			</div>
			<div className='overflow-x-auto'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[200px]'>
								Invoice ID
							</TableHead>
							<TableHead>Product</TableHead>
							<TableHead>Customer</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Quantity</TableHead>
							<TableHead>Payment Status</TableHead>
							<TableHead>Payment Dates</TableHead>
							<TableHead className='text-right'>Total</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell
									colSpan='6'
									className='h-[350px] text-center p-4'
								>
									<l-ring
										size='40'
										stroke='5'
										bg-opacity='0'
										speed='2'
										color='gray'
									></l-ring>
								</TableCell>
							</TableRow>
						) : (
							currentPosts.map(sale => (
								<TableRow key={sale.sales_id}>
									<TableCell className='font-medium'>
										{sale.billing_id}
									</TableCell>
									<TableCell>{sale.itemName}</TableCell>
									<TableCell>{sale.patientName}</TableCell>
									<TableCell>
										{new Date(
											sale.saleDate
										).toLocaleDateString('en-US', {
											month: 'long',
											year: 'numeric',
											day: 'numeric',
										})}
									</TableCell>
									<TableCell>{sale.quantity}</TableCell>
									<TableCell>
										{sale.billingStatus === 'Paid' ? (
											<Badge className='bg-green-500'>
												{sale.billingStatus}
											</Badge>
										) : (
											<Badge className='bg-red-500'>
												{sale.billingStatus}
											</Badge>
										)}
									</TableCell>
									<TableCell>
										<div>
											Initial:{' '}
											{new Date(
												sale.initialPaymentDate
											).toLocaleDateString('en-US', {
												month: 'long',
												year: 'numeric',
												day: 'numeric',
											})}
										</div>
										<div>
											Final:{' '}
											{new Date(
												sale.finalPaymentDate
											).toLocaleDateString('en-US', {
												month: 'long',
												year: 'numeric',
												day: 'numeric',
											})}
										</div>
									</TableCell>
									<TableCell className='text-right'>
										₱{' '}
										{formatNumberWithCommas(
											sale.totalPrice
										)}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
			<div>
				{!loading && currentPosts.length > 0 ? (
					salesWithDetails.length > postPerPage ? (
						<PaginationPage
							totalPosts={filteredSales?.length}
							postPerPage={postPerPage}
							setCurrentPage={setCurrentPage}
							currentPage={currentPage}
						/>
					) : null
				) : null}
			</div>
		</div>
	)
}

export default SalesTab
