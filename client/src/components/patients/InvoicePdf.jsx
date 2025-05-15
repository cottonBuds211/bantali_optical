import ReactPDF, {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
	page: {
		padding: 20,
		fontFamily: 'Helvetica',
	},
	titleSection: {
		marginBottom: 20,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'left',
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 10,
		color: '#6b7280', // muted color similar to screenshot
		marginBottom: 4,
	},
	patientInfo: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	table: {
		marginVertical: 12,
	},
	tableHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: '#e5e7eb',
		borderBottomStyle: 'solid',
		paddingBottom: 4,
		fontSize: 10,
		color: '#6b7280',
	},
	tableRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#e5e7eb',
		borderBottomStyle: 'solid',
	},
	amountSection: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
		marginTop: 12,
	},
	otherTexts: {
		fontSize: 10,
	},
	mutedText: {
		fontSize: 10,
		color: '#6b7280',
	},
	totalAmount: {
		fontSize: 11,
		fontWeight: 'bold',
	},
	footer: {
		marginTop: 20,
		fontSize: 10,
		textAlign: 'center',
		color: '#6b7280',
	},
})

const InvoicePDF = ({ billingData, patient, lineItems }) => (
	<Document>
		<Page size='A6' style={styles.page}>
			<View style={styles.titleSection}>
				<Text style={styles.title}>Bantali Optical Clinic</Text>
			</View>

			<View style={styles.patientInfo}>
				<View>
					<Text style={styles.subtitle}>Invoice To:</Text>
					<Text
						style={styles.otherTexts}
					>{`${patient.first_name} ${patient.last_name}`}</Text>
				</View>
				<View>
					<Text style={styles.subtitle}>Date Issued:</Text>
					<Text style={styles.otherTexts}>
						{new Date().toLocaleDateString('en-US', {
							month: 'long',
							day: 'numeric',
							year: 'numeric',
						})}
					</Text>
				</View>
			</View>

			<View style={styles.table}>
				<View style={styles.tableHeader}>
					<Text>Description</Text>
					<Text>Amount</Text>
				</View>

				<View style={styles.tableRow}>
					<Text style={styles.otherTexts}>Service Fee</Text>
					<Text style={styles.otherTexts}>
						{billingData?.serviceFee}
					</Text>
				</View>
				<View style={styles.tableRow}>
					<Text style={styles.otherTexts}>Lens Fee</Text>
					<Text style={styles.otherTexts}>
						{billingData?.lensCost}
					</Text>
				</View>
				{lineItems.map((item, index) => (
					<View style={styles.tableRow} key={index}>
						<Text
							style={styles.otherTexts}
						>{`${item.description} x${item.quantity}`}</Text>
						<Text style={styles.otherTexts}>
							{(item.unitPrice * item.quantity).toFixed(2)}
						</Text>
					</View>
				))}
			</View>

			<View style={styles.amountSection}>
				<Text style={styles.mutedText}>
					Subtotal: Pesos {calculateSubtotal(billingData, lineItems)}
				</Text>
				<Text style={styles.mutedText}>
					Discount: Pesos {billingData?.discount}
				</Text>
				<Text style={styles.totalAmount}>
					Total Amount: Pesos {calculateTotal(billingData, lineItems)}
				</Text>
			</View>

			<Text style={styles.footer}>Bantali Optical Clinic</Text>
		</Page>
	</Document>
)

const calculateSubtotal = (billingData, lineItems) => {
	return (
		parseFloat(billingData?.serviceFee || 0) +
		parseFloat(billingData?.lensCost || 0) +
		lineItems.reduce(
			(total, item) => total + item.unitPrice * item.quantity,
			0
		)
	).toFixed(2)
}

const calculateTotal = (billingData, lineItems) => {
	return (
		parseFloat(calculateSubtotal(billingData, lineItems)) -
		parseFloat(billingData?.discount || 0)
	).toFixed(2)
}

export default InvoicePDF
