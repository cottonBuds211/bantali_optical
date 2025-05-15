import { useEffect, useState } from 'react'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'

import { ArrowUpDown } from 'lucide-react'
import PageWrapper from '@/components/PageWrapper'
import LogServices from '@/services/logsServices'
import LogRow from './LogRow'
import PaginationPage from '../PaginationPage'

const AuditLogs = () => {
	const logServices = new LogServices()
	const [logs, setLogs] = useState([])
	const [sortColumn, setSortColumn] = useState('name')
	const [sortDirection, setSortDirection] = useState('desc' > 'asc')
	const [searchTerm, setSearchTerm] = useState('')

	const handleSort = column => {
		if (column === sortColumn) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
		} else {
			setSortColumn(column)
			setSortDirection('asc')
		}
	}

	const sortedLogs = [...logs].sort((a, b) => {
		if (a[sortColumn] < b[sortColumn])
			return sortDirection === 'asc' ? -1 : 1
		if (a[sortColumn] > b[sortColumn])
			return sortDirection === 'asc' ? 1 : -1
		return 0
	})

	const filteredLogs = sortedLogs?.filter(
		log =>
			log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
			log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
			log.action_date.toLowerCase().includes(searchTerm.toLowerCase())
	)
	const [currentPage, setCurrentPage] = useState(1)
	const [postPerPage] = useState(12)

	const lastPostIndex = currentPage * postPerPage
	const firstPostIndex = lastPostIndex - postPerPage
	const currentPosts = filteredLogs?.slice(firstPostIndex, lastPostIndex)
	useEffect(() => {
		let isMounted = true
		const controller = new AbortController()
		const signal = controller.signal

		const getLogs = async () => {
			try {
				const logs = await logServices.getLogs(signal)
				logs.sort((a, b) => b.createdAt.localeCompare(a.createdAt))

				isMounted && setLogs(logs)
			} catch (err) {
				console.error(err)
			}
		}
		getLogs()

		return () => {
			isMounted = false
			controller.abort()
		}
	}, [])

	return (
		<PageWrapper title={'Logs'}>
			<Input
				placeholder='Search logs...'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				className='max-w-sm mb-4'
			/>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead
							onClick={() => handleSort('name')}
							className='cursor-pointer'
						>
							User <ArrowUpDown className='ml-2 h-4 w-4 inline' />
						</TableHead>
						<TableHead
							onClick={() => handleSort('email')}
							className='cursor-pointer'
						>
							Action
							<ArrowUpDown className='ml-2 h-4 w-4 inline' />
						</TableHead>
						<TableHead
							onClick={() => handleSort('role')}
							className='cursor-pointer'
						>
							Details{' '}
							<ArrowUpDown className='ml-2 h-4 w-4 inline' />
						</TableHead>
						<TableHead>Action Date</TableHead>
						<TableHead>Time</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{currentPosts.map((log, index) => (
						<LogRow key={index} log={log} />
					))}
				</TableBody>
			</Table>
			<div>
				{currentPosts.length > 0 ? (
					<PaginationPage
						totalPosts={filteredLogs?.length}
						postPerPage={postPerPage}
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
					/>
				) : null}
			</div>
		</PageWrapper>
	)
}

export default AuditLogs
