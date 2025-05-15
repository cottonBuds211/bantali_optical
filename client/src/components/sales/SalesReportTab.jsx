import { useState, useMemo, useEffect } from 'react'
import InventoryServices from '@/services/inventoryServices'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import SalesPDF from './salesPDF'
import { pdf } from '@react-pdf/renderer'
import { Download } from 'lucide-react'
import { formatNumberWithCommas } from '@/utils/formatNumberWithComma'
const months = [
	'All Months',
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]
const SalesReportTab = ({ salesData }) => {
	const [reportType, setReportType] = useState('Daily')
	const [yearFilter, setYearFilter] = useState('All Time')
	const [monthFilter, setMonthFilter] = useState('All Months')
	const [dailyReportData, setDailyReportData] = useState([])
	const inventoryServices = new InventoryServices()
	const years = salesData
		.map(sale => new Date(sale.saleDate).getFullYear())
		.filter((year, index, arr) => arr.indexOf(year) === index)

	useEffect(() => {
		if (reportType === 'Yearly') {
			setYearFilter('All Time')
		} else if (reportType === 'Weekly' || reportType === 'Daily') {
			setYearFilter(new Date().getFullYear())
		}
	}, [reportType])

	const fetchDailyReportData = async signal => {
		const filteredSales = salesData.filter(sale => {
			const saleYear = new Date(sale.saleDate).getFullYear()
			const saleMonth = new Date(sale.saleDate).getMonth()
			const matchesYear =
				yearFilter === 'All Time' || saleYear === Number(yearFilter)
			const matchesMonth =
				monthFilter === 'All Months' ||
				saleMonth === months.indexOf(monthFilter) - 1

			return matchesMonth && matchesYear
		})

		const reportPromises = filteredSales.map(async sale => {
			console.log(sale)
			try {
				const item = await inventoryServices.getInventory(
					sale.item_id,
					signal
				)
				return {
					period: new Date(sale.saleDate).toLocaleDateString(
						'en-US',
						{
							month: 'short',
							day: 'numeric',
							year: 'numeric',
						}
					),
					totalSales: parseFloat(sale.totalPrice),
					totalQuantity: sale.quantity,
					product: item?.item_name || 'Unknown Product', // Use frame data or fallback
				}
			} catch (error) {
				console.error('Error fetching product:', error)
				return {
					period: new Date(sale.saleDate).toLocaleDateString(
						'en-US',
						{
							month: 'short',
							day: 'numeric',
							year: 'numeric',
						}
					),
					totalSales: parseFloat(sale.totalPrice),
					totalQuantity: sale.quantity,
					product: 'Error fetching product',
				}
			}
		})

		const reportData = await Promise.all(reportPromises)
		setDailyReportData(reportData)
	}

	useEffect(() => {
		if (reportType === 'Daily') {
			const controller = new AbortController()
			const signal = controller.signal
			fetchDailyReportData(signal)

			return () => controller.abort() // Cleanup signal
		}
	}, [reportType, yearFilter, monthFilter])

	const generateReport = () => {
		if (reportType === 'Daily') {
			return dailyReportData
		}

		const reportData = {}
		salesData.forEach(sale => {
			let key
			const saleDate = new Date(sale.saleDate)
			const saleYear = saleDate.getFullYear()

			if (yearFilter !== 'All Time' && saleYear !== Number(yearFilter)) {
				return // Skip this sale if it doesn't match the selected year
			}

			switch (reportType) {
				case 'Weekly':
					key = `Week ${Math.ceil(
						saleDate.getDate() / 7
					)} of ${saleDate.toLocaleString('default', {
						month: 'long',
					})}`
					break
				case 'Monthly':
					key = saleDate.toLocaleString('default', {
						month: 'long',
						year: 'numeric',
					})
					break
				case 'Yearly':
					key = saleYear.toString()
					break
			}

			if (!reportData[key]) {
				reportData[key] = { totalSales: 0, totalQuantity: 0 }
			}

			reportData[key].totalSales += parseFloat(sale.totalPrice)
			reportData[key].totalQuantity += sale.quantity
		})

		return Object.entries(reportData).map(([period, data]) => ({
			period,
			...data,
		}))
	}

	const handleDownloadPDF = async () => {
		const blob = await pdf(
			<SalesPDF
				reportData={reportData}
				reportType={reportType}
				yearFilter={yearFilter}
				monthFilter={monthFilter}
			/>
		).toBlob()
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		link.download = `Sales_Report_${new Date().toLocaleDateString('en-US', {
			month: 'numeric',
			day: 'numeric',
			year: 'numeric',
		})}.pdf`
		link.click()
		URL.revokeObjectURL(url) // Clean up the URL object
	}

	const reportData = useMemo(generateReport, [
		reportType,
		dailyReportData,
		yearFilter,
	])
	const totalSales = reportData.reduce(
		(acc, curr) => acc + curr.totalSales,
		0
	)
	const totalQuantity = reportData.reduce(
		(acc, curr) => acc + curr.totalQuantity,
		0
	)
	return (
		<Card>
			<CardHeader>
				<CardTitle>Sales Reports</CardTitle>
				<CardDescription>
					Generate and view sales reports
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex justify-between mb-4'>
					<div className='w-1/3 mr-2'>
						<Label htmlFor='reportType'>Report Type</Label>
						<div className='grid grid-cols-3 gap-2'>
							<div className='col-span-1'>
								<Select
									value={reportType}
									onValueChange={setReportType}
								>
									<SelectTrigger id='reportType'>
										<SelectValue placeholder='Select report type' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='Daily'>
											Daily
										</SelectItem>
										<SelectItem value='Weekly'>
											Weekly
										</SelectItem>
										<SelectItem value='Monthly'>
											Monthly
										</SelectItem>
										<SelectItem value='Yearly'>
											Yearly
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							{reportType === 'Daily' && (
								<Select
									value={monthFilter}
									onValueChange={setMonthFilter}
								>
									<SelectTrigger id='monthFilter'>
										<SelectValue placeholder='Select month' />
									</SelectTrigger>
									<SelectContent>
										{months.map((month, index) => (
											<SelectItem
												key={index}
												value={month}
											>
												{month}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
							{reportType !== 'Yearly' && (
								<Select
									value={yearFilter}
									onValueChange={setYearFilter}
									className='col-span-1'
								>
									<SelectTrigger id='yearFilter'>
										<SelectValue placeholder='Select year' />
									</SelectTrigger>
									<SelectContent>
										{reportType !== 'Weekly' && (
											<SelectItem value='All Time'>
												All Time
											</SelectItem>
										)}
										{years?.map((year, index) => (
											<SelectItem
												key={index}
												value={year}
											>
												{year}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						</div>
					</div>
					<div className='w-1/3 ml-2'>
						<Label>&nbsp;</Label>
						<Button className='w-full' onClick={handleDownloadPDF}>
							<Download className='mr-2 h-4 w-4' />
							Export Report
						</Button>
					</div>
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							{' '}
							{reportType === 'Daily' && (
								<TableHead>Product</TableHead>
							)}
							<TableHead>Period</TableHead>
							<TableHead>Total Sales</TableHead>
							<TableHead>Total Quantity</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{reportData?.length === 0 ? (
							<TableRow>
								<TableCell colSpan={4}>
									No sales data found.
								</TableCell>
							</TableRow>
						) : (
							reportData.map((report, index) => (
								<TableRow key={index}>
									{reportType === 'Daily' && (
										<TableCell>{report.product}</TableCell>
									)}
									<TableCell>{report.period}</TableCell>
									<TableCell>
										₱{' '}
										{formatNumberWithCommas(
											report.totalSales
										)}
									</TableCell>
									<TableCell>
										{report.totalQuantity}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
				<div className='flex justify-end'>
					<div className='flex flex-col'>
						<span>
							Total Sales: ₱{formatNumberWithCommas(totalSales)}
						</span>
						<span>Total Quantity Sold: {totalQuantity}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default SalesReportTab
