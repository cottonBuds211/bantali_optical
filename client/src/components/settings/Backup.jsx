import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Download, Upload, AlertCircle } from 'lucide-react'
import { Input } from '../ui/input'
import { Progress } from '@/components/ui/progress'
import PageWrapper from '../PageWrapper'
import BackupRestoreServices from '@/services/backupRestoreServices'
const Backup = () => {
	const backupRestoreServices = new BackupRestoreServices()
	const [backupProgress, setBackupProgress] = useState(0)
	const [restoreProgress, setRestoreProgress] = useState(0)
	const [message, setMessage] = useState(null)
	const [selectedFile, setSelectedFile] = useState(null)
	const fileInputRef = useRef(null)

	const handleProgress = async (promise, onFulfill) => {
		try {
			await promise
			onFulfill()
		} catch (error) {
			setMessage({ type: 'error', content: 'An error occurred.' })
		} finally {
			setBackupProgress(0)
			setRestoreProgress(0)
		}
	}

	const handleBackup = async () => {
		setMessage(null)
		handleProgress(backupRestoreServices.downloadBackup(), () => {
			setMessage({
				type: 'success',
				content: 'Backup completed successfully!',
			})
		})
	}

	const handleFileChange = event => {
		const file = event.target.files?.[0]
		if (file && file.name.endsWith('.sql')) {
			setSelectedFile(file)
			setMessage(null)
		} else {
			setSelectedFile(null)
			setMessage({
				type: 'error',
				content: 'Please select a valid SQL file.',
			})
		}
	}

	const handleRestore = async () => {
		if (!selectedFile) {
			setMessage({
				type: 'error',
				content: 'Please select a SQL file to restore from.',
			})
			return
		}
		setMessage(null)
		handleProgress(
			backupRestoreServices.restoreDatabase(selectedFile),
			() => {
				setMessage({
					type: 'success',
					content: 'Restore completed successfully!',
				})
				setSelectedFile(null)
				if (fileInputRef.current) {
					fileInputRef.current.value = ''
				}
			}
		)
	}

	return (
		<PageWrapper title={'Backup and Restore'}>
			<CardHeader>
				<CardDescription>
					Manage your data backups and restorations
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='space-y-2'>
					<h3 className='text-lg font-semibold'>Backup</h3>
					<p className='text-sm text-gray-500 dark:text-gray-400'>
						Create a backup of your current data. This process may
						take a few minutes.
					</p>
					{backupProgress > 0 && (
						<Progress value={backupProgress} className='w-full' />
					)}
					<Button
						onClick={handleBackup}
						disabled={backupProgress > 0 || restoreProgress > 0}
					>
						<Download className='mr-2 h-4 w-4' />
						Create Backup
					</Button>
				</div>

				<div className='space-y-2'>
					<h3 className='text-lg font-semibold'>Restore</h3>
					<p className='text-sm text-gray-500 dark:text-gray-400'>
						Restore your data from a previous SQL backup. This will
						overwrite your current data.
					</p>
					<div className='flex items-center space-x-2'>
						<Input
							type='file'
							accept='.sql'
							onChange={handleFileChange}
							ref={fileInputRef}
							className='flex-grow'
							disabled={backupProgress > 0 || restoreProgress > 0}
						/>
						<Button
							onClick={handleRestore}
							disabled={
								!selectedFile ||
								backupProgress > 0 ||
								restoreProgress > 0
							}
						>
							<Upload className='mr-2 h-4 w-4' />
							Restore
						</Button>
					</div>
					{selectedFile && (
						<p className='text-sm text-gray-500 dark:text-gray-400'>
							Selected file: {selectedFile.name}
						</p>
					)}
					{restoreProgress > 0 && (
						<Progress value={restoreProgress} className='w-full' />
					)}
				</div>
			</CardContent>
			<CardFooter>
				{message && (
					<Alert
						variant={
							message.type === 'success'
								? 'default'
								: 'destructive'
						}
					>
						<AlertCircle className='h-4 w-4' />
						<AlertTitle>
							{message.type === 'success' ? 'Success' : 'Error'}
						</AlertTitle>
						<AlertDescription>{message.content}</AlertDescription>
					</Alert>
				)}
			</CardFooter>
		</PageWrapper>
	)
}

export default Backup
