'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import PageWrapper from '@/components/PageWrapper'
import InventoryServices from '@/services/inventoryServices'
import SalesTab from '@/components/sales/SalesTab'
import InventoryTab from '@/components/inventory/InventoryTab'
import SalesServices from '@/services/salesServices'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import SalesReportTab from '@/components/sales/SalesReportTab'
import { formatNumberWithCommas } from '@/utils/formatNumberWithComma'

export default function ResponsiveInventorySalesTracker() {
	const inventoryServices = new InventoryServices()
	const salesServices = new SalesServices()
	const [isLoading, setIsLoading] = useState(true)

	const [inventoryData, setInventoryData] = useState([])
	const [salesData, setSalesData] = useState([])
	const { toast } = useToast()
	const navigate = useNavigate()

	const [refresh, setRefresh] = useState(false)
	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		const getInventory = async () => {
			try {
				const inventory = await inventoryServices.getAllInventory(
					signal
				)
				inventory.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
				setInventoryData(inventory)
			} catch (err) {
				console.error(err)
				if (err.code !== 'ERR_CANCELED') {
					toast({
						title: 'Session Expired',
						description:
							'Your session has expired please log-in again!',
					})
					navigate('/login', {
						state: { from: location },
						replace: true,
					})
				}
			} finally {
				setIsLoading(false)
			}
		}
		getInventory()

		return () => {
			controller.abort()
			setRefresh(false)
		}
	}, [refresh])

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		try {
			const getSales = async () => {
				const sales = await salesServices.getAllSales(signal)
				sales.sort((a, b) => b.saleDate.localeCompare(a.saleDate))
				setSalesData(sales)
			}
			getSales()
		} catch (err) {
			console.error(err)
			if (err.code !== 'ERR_CANCELED') {
				toast({
					title: 'Session Expired',
					description:
						'Your session has expired please log-in again!',
				})
				navigate('/login', {
					state: { from: location },
					replace: true,
				})
			}
		}

		return () => {
			controller.abort()
			setRefresh(false)
		}
	}, [refresh])

	const totalStock = inventoryData.reduce(
		(sum, frame) => sum + frame.stockQuantity,
		0
	)
	const totalValue = inventoryData.reduce(
		(sum, frame) => sum + frame.stockQuantity * frame.price,
		0
	)
	const totalSales = salesData.reduce(
		(sum, item) => sum + parseFloat(item.totalPrice),
		0
	)

	return (
		<PageWrapper title={'Inventory and Sales'}>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Total Stock
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{totalStock}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Total Inventory Value
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>
							₱ {formatNumberWithCommas(totalValue)}
						</div>
					</CardContent>
				</Card>
				<Card className='sm:col-span-2 lg:col-span-1'>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Total Sales
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>
							₱ {formatNumberWithCommas(totalSales)}
						</div>
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue='sales' className='space-y-4'>
				<TabsList className='grid lg:inline-flex w-full grid-cols-2 mb-4  h-9 items-center text-muted-foreground  justify-start rounded-none border-b bg-transparent p-0'>
					<TabsTrigger
						className='inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'
						value='sales'
					>
						Sales
					</TabsTrigger>
					<TabsTrigger
						className='inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'
						value='inventory'
					>
						Inventory
					</TabsTrigger>
					<TabsTrigger
						className='inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none '
						value='reports'
					>
						Reports
					</TabsTrigger>
				</TabsList>

				<TabsContent value='sales' className='space-y-4'>
					<SalesTab salesData={salesData} />
				</TabsContent>
				<TabsContent value='inventory' className='space-y-4'>
					<InventoryTab
						inventoryData={inventoryData}
						setRefresh={setRefresh}
						isLoading={isLoading}
					/>
				</TabsContent>
				<TabsContent value='reports' className='space-y-4'>
					<SalesReportTab salesData={salesData} />
				</TabsContent>
			</Tabs>
		</PageWrapper>
	)
}
