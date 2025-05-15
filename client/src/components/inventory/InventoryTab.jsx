import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Download, SearchIcon } from 'lucide-react'
import AddProductButton from '@/components/forms/AddProductButton'
import InventoryRow from './InventoryRow'
import PaginationPage from '../PaginationPage'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { pdf } from '@react-pdf/renderer'
import InventoryPDF from '../sales/inventoryPDF'

const InventoryTab = ({ inventoryData, setRefresh, isLoading }) => {
	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [postPerPage] = useState(10)
	const lastPostIndex = currentPage * postPerPage
	const firstPostIndex = lastPostIndex - postPerPage
	const [filteredInventory, setFilteredInventory] = useState([])

	const currentPosts = filteredInventory.slice(firstPostIndex, lastPostIndex)

	useEffect(() => {
		if (searchTerm) {
			const filteredData = inventoryData.filter(item => {
				const itemLowerCase = item.item_name.toLowerCase()
				return itemLowerCase.includes(searchTerm.toLowerCase())
			})
			setFilteredInventory(filteredData)
			setCurrentPage(1) // Reset to first page on search
		} else {
			setFilteredInventory(inventoryData)
		}
	}, [searchTerm, inventoryData])
	const handleDownloadPDF = async () => {
		const blob = await pdf(
			<InventoryPDF filteredInventory={filteredInventory} />
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
	return (
		<div>
			<div className='flex flex-col sm:flex-row justify-between gap-4'>
				<div className='flex w-1/3 h-10 items-center border border-input pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2'>
					<SearchIcon className='h-[16px] w-[16px]' />
					<Input
						placeholder='Search inventory...'
						className='w-full p-2 placeholder:text-muted-foreground border-0 ring-offset-background focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50 bg-transparent'
						autoComplete='off'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className='flex items-center gap-3'>
					<AddProductButton setRefresh={setRefresh} />
					<Tooltip>
						<TooltipTrigger>
							<Button onClick={handleDownloadPDF}>
								<Download />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Export Report</p>
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<div className='overflow-x-auto'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Color</TableHead>
							<TableHead>Material</TableHead>
							<TableHead>Stock</TableHead>
							<TableHead>Price</TableHead>
							<TableHead className='text-right'>
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading ? (
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
							currentPosts.map(item => (
								<InventoryRow
									item={item}
									key={item.item_id}
									setRefresh={setRefresh}
								/>
							))
						)}
					</TableBody>
				</Table>
				<div>
					{!isLoading && filteredInventory.length > postPerPage && (
						<PaginationPage
							totalPosts={filteredInventory.length}
							postPerPage={postPerPage}
							setCurrentPage={setCurrentPage}
							currentPage={currentPage}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default InventoryTab
