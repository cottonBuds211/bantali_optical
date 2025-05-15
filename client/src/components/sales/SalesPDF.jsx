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
		textAlign: 'right',
	},
})

// Main SalesPDF component
const SalesPDF = ({ reportData, reportType, yearFilter, monthFilter }) => {
	const currentDate = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	// Calculate total sales and quantity
	const totalSales = reportData.reduce(
		(acc, curr) => acc + curr.totalSales,
		0
	)
	const totalQuantity = reportData.reduce(
		(acc, curr) => acc + curr.totalQuantity,
		0
	)

	return (
		<Document>
			<Page size='A4' style={styles.page}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.title}>Sales Report</Text>
					<Text style={styles.date}>{currentDate}</Text>
				</View>

				{/* Report Type and Year */}
				<View style={styles.header}>
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
				</View>

				{/* Table Header */}
				<View style={styles.table}>
					<View style={styles.tableRow}>
						{reportType === 'Daily' && (
							<View style={styles.tableColHeader}>
								<Text style={styles.tableCellHeader}>
									Product
								</Text>
							</View>
						)}
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>Period</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>
								Total Sales
							</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>
								Total Quantity
							</Text>
						</View>
					</View>

					{/* Table Rows */}
					{reportData.map((report, index) => (
						<View style={styles.tableRow} key={index}>
							{reportType === 'Daily' && (
								<View style={styles.tableCol}>
									<Text style={styles.tableCell}>
										{report.product}
									</Text>
								</View>
							)}
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>
									{report.period}
								</Text>
							</View>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>
									{formatNumberWithCommas(report.totalSales)}{' '}
									Php
								</Text>
							</View>
							<View style={styles.tableCol}>
								<Text style={styles.tableCell}>
									{report.totalQuantity}
								</Text>
							</View>
						</View>
					))}
				</View>

				{/* Totals */}
				<View style={styles.totalSection}>
					<Text style={styles.totalText}>
						Total Sales: {formatNumberWithCommas(totalSales)} Php
					</Text>
					<Text style={styles.totalText}>
						Total Quantity Sold: {totalQuantity}
					</Text>
				</View>
			</Page>
		</Document>
	)
}

export default SalesPDF
