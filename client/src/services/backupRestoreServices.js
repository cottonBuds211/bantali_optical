import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function BackupRestoreServices() {
	const axiosPrivate = useAxiosPrivate()

	const downloadBackup = async () => {
		try {
			const response = await axiosPrivate.get('/backup/backup', {
				responseType: 'blob',
			})

			const contentDisposition = response.headers['content-disposition']
			let fileName = `backup_${Date.now()}.sql` // Default filename
			if (contentDisposition) {
				const match = contentDisposition.match(/filename="(.+)"/)
				if (match[1]) {
					fileName = match[1]
				}
			}

			const url = window.URL.createObjectURL(new Blob([response.data]))
			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', fileName)
			document.body.appendChild(link)
			link.click()
			link.remove()
		} catch (error) {
			console.error('Error creating backup:', error)
			throw new Error('Failed to create backup')
		}
	}

	const restoreDatabase = async file => {
		const formData = new FormData()
		formData.append('backupFile', file)

		try {
			const response = await axiosPrivate.post(
				'/backup/restore',
				formData,
				{
					headers: { 'Content-Type': 'multipart/form-data' },
				}
			)
			return response.data
		} catch (error) {
			console.error('Error restoring database:', error)
			throw new Error('Failed to restore database')
		}
	}
	return {
		restoreDatabase,
		downloadBackup,
	}
}

export default BackupRestoreServices
