const nodemailer = require('nodemailer')

async function sendTempPasswordEmail(userEmail, tempPassword) {
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	})

	const mailOptions = {
		from: 'yourapp@example.com',
		to: userEmail,
		subject: 'Your Temporary Password',
		text: `Your temporary password is ${tempPassword}. It will expire in 30 minutes. Please log in and reset your password immediately.`,
	}

	return transporter.sendMail(mailOptions)
}

async function sendNotificationEmail(appointment) {
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	})

	const mailOptions = {
		from: 'yourapp@example.com',
		to: appointment.email,
		subject: 'Appointment Accepted - Bantali Optical Clinic',
		text: `Dear ${appointment.first_name},

		We are pleased to inform you that your appointment has been accepted! 

		Here are the details of your appointment:
		- Date: ${new Date(appointment.appointment_date).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		})} 
		- Time: ${new Date(appointment.appointment_time_start).toLocaleTimeString(
			'en-US',
			{
				hour12: true,
				hour: '2-digit',
				minute: 'numeric',
			}
		)}
		- Service: Eye Exam

		If you have any questions or need to reschedule, feel free to contact us at bantaliclinic321@gmail.com or call us at (555) 123-4567.

		We look forward to seeing you!

		Best regards,
		Bantali Optical Clinic`,
	}

	return transporter.sendMail(mailOptions)
}

module.exports = { sendTempPasswordEmail, sendNotificationEmail }
