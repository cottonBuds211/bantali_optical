import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import { formatNumberWithCommas } from '@/utils/formatNumberWithComma'

// Define styles
const styles = StyleSheet.create({
	page: {
		padding: 40,
		fontFamily: 'Helvetica',
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	subtitle: {
		fontSize: 12,
		color: '#6b7280', // muted color similar to screenshot
	},
	date: {
		fontSize: 12,
		color: '#555',
	},
	table: {
		width: '100%',
		marginBottom: 10,
	},
	tableRow: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0', // Light gray bottom border
		borderBottomStyle: 'solid',
	},
	tableColHeader: {
		width: '33%',
		padding: 8,
		backgroundColor: '#f0f0f0',
	},
	tableCol: {
		width: '33%',
		padding: 8,
	},
	tableCellHeader: {
		fontSize: 10,
		fontWeight: 'bold',
	},
	tableCell: {
		fontSize: 10,
	},
	totalSection: {
		marginTop: 20,
	},
	totalText: {
		fontSize: 12,
		fontWeight: 'bold',
		textAlign: 'left',
	},
})

// Main SalesPDF component
const InventoryPDF = ({ filteredInventory }) => {
	const currentDate = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	//Calculate total sales and quantity
	const totalValue = filteredInventory.reduce(
		(acc, curr) => acc + curr.price * curr.stockQuantity,
		0
	)
	const totalQuantity = filteredInventory.reduce(
		(acc, curr) => acc + curr.stockQuantity,
		0
	)

	return (
		<Document>
			<Page size='A4' style={styles.page}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.title}>Inventory Report</Text>
					<Text style={styles.date}>{currentDate}</Text>
				</View>

				{/* Report Type and Year */}
				{/* <View style={styles.header}>
					<Text style={styles.subtitle}>
						Report Type: {reportType}
					</Text>
					{monthFilter && reportType === 'Daily' && (
						<Text style={styles.subtitle}>
							Month: {monthFilter}
						</Text>
					)}
					{yearFilter && yearFilter !== 'All Time' ? (
						<Text style={styles.subtitle}>Year: {yearFilter}</Text>
					) : (
						<Text style={styles.subtitle}>All-Time Report</Text>
					)}
				</View> */}

				{/* Table Header */}
				<View style={styles.table}>
					<View style={styles.tableRow}>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>Product</Text>
						</View>

						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>Type</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>
								Stock Quantity
							</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>Price</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>
								Total Value
							</Text>
						</View>
					</View>

					{/* Table Rows */}
					{filteredInventory.map((item, index) => (
						<View style={styles.tableRow} key={index}>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>
									{item.item_name} (
									{item.color ? item.color : null})
								</Text>
							</View>

							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>
									{item.item_type}
								</Text>
							</View>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>
									{item.stockQuantity}
								</Text>
							</View>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>
									{item.price} Php
								</Text>
							</View>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>
									{formatNumberWithCommas(
										item.price * item.stockQuantity
									)}{' '}
									Php
								</Text>
							</View>
						</View>
					))}
				</View>

				{/* Totals */}
				<View style={styles.totalSection}>
					<Text style={styles.totalText}>
						Total Value: {formatNumberWithCommas(totalValue)} Php
					</Text>
					<Text style={styles.totalText}>
						Total Stock: {totalQuantity}
					</Text>
				</View>
			</Page>
		</Document>
	)
}

export default InventoryPDF
