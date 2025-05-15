const { exec } = require('child_process')
const path = require('path')
const backUpRouter = require('express').Router()
const fs = require('fs')
const multer = require('multer')
require('dotenv').config()

// Configure multer for handling file uploads
const upload = multer({
	dest: 'uploads/', // Temporary storage for uploaded files
})

// Backup route
backUpRouter.get('/backup', (req, res) => {
	const date = new Date()
		.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		})
		.replace(/ /g, '_')
	const fileName = `backup_${date}.sql`
	const backupFilePath = path.join(__dirname, '..', 'backups', fileName)

	// Set the PostgreSQL password environment variable temporarily
	process.env.PGPASSWORD = process.env.DB_PASSWORD
	const backupCommand = `pg_dump -U ${process.env.DB_USERNAME} --clean -d ${process.env.DB_NAME} -f ${backupFilePath}`

	// Execute the backup command
	exec(backupCommand, (error, stdout, stderr) => {
		if (error) {
			console.error(`Error backing up database: ${error.message}`)
			return res.status(500).json({ error: 'Backup failed' })
		}

		if (stderr) {
			console.error(`Backup stderr: ${stderr}`)
		}

		// Send the file for download
		res.setHeader(
			'Content-Disposition',
			`attachment; filename="${fileName}"`
		)
		res.download(backupFilePath, fileName, err => {
			if (err) {
				console.error('Error downloading file:', err)
				return res
					.status(500)
					.json({ error: 'Failed to download backup' })
			}

			// Delete the backup file after sending it
			fs.unlink(backupFilePath, err => {
				if (err) {
					console.error('Error deleting backup file:', err)
				} else {
					console.log(`Backup file ${fileName} deleted successfully.`)
				}
			})
		})
	})
})

// Restore route
backUpRouter.post('/restore', upload.single('backupFile'), (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: 'No file uploaded' })
	}

	const fullPath = path.resolve(__dirname, '..', req.file.path)

	// Set the PostgreSQL password environment variable temporarily
	process.env.PGPASSWORD = process.env.DB_PASSWORD
	const restoreCommand = `psql -U ${process.env.DB_USERNAME} -d ${process.env.DB_NAME} -f ${fullPath}`

	// Execute the restore command
	exec(restoreCommand, (restoreError, restoreStdout, restoreStderr) => {
		// Remove the uploaded file once the restore is done
		fs.unlink(fullPath, err => {
			if (err) {
				console.error('Error deleting uploaded backup file:', err)
			} else {
				console.log(
					`Uploaded backup file ${req.file.filename} deleted successfully.`
				)
			}
		})

		if (restoreError) {
			console.error(`Error restoring database: ${restoreError.message}`)
			return res.status(500).json({ error: 'Restore failed' })
		}

		if (restoreStderr) {
			console.error(`Restore stderr: ${restoreStderr}`)
			return res.status(500).json({ error: 'Restore error occurred' })
		}

		console.log('Database restored successfully.')
		return res
			.status(200)
			.json({ message: 'Database restored successfully.' })
	})
})

module.exports = backUpRouter
