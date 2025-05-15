import React from 'react'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
} from '@/components/ui/pagination'

const PaginationPage = ({
	totalPosts,
	postPerPage,
	setCurrentPage,
	currentPage,
}) => {
	const MAX_VISIBLE_PAGES = 10 // Maximum number of pages to display

	// Calculate total pages
	const totalPages = Math.ceil(totalPosts / postPerPage)

	// Determine visible page range based on current page
	const visiblePages = calculateVisiblePages(
		currentPage,
		MAX_VISIBLE_PAGES,
		totalPages
	)

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className='cursor-pointer'
						onClick={() =>
							setCurrentPage(Math.max(currentPage - 1, 1))
						}
						disabled={currentPage === 1} // Disable on first page
					/>
				</PaginationItem>

				{visiblePages.map((page, index) => (
					<PaginationItem key={index}>
						<PaginationLink
							onClick={() => setCurrentPage(page)}
							className={`cursor-pointer ${
								currentPage === page ? 'bg-secondary/90' : ''
							}`}
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}

				{totalPages > MAX_VISIBLE_PAGES && (
					<>
						{visiblePages.length < MAX_VISIBLE_PAGES && ( // Show ellipsis only if needed
							<PaginationItem>
								<PaginationLink className='cursor-pointer text-gray-400'>
									<PaginationEllipsis />
								</PaginationLink>
							</PaginationItem>
						)}
						<PaginationItem>
							<PaginationLink
								onClick={() => setCurrentPage(totalPages)}
								className={`cursor-pointer ${
									currentPage === totalPages
										? 'bg-secondary/90'
										: ''
								}`}
							>
								{totalPages}
							</PaginationLink>
						</PaginationItem>
					</>
				)}

				<PaginationItem>
					<PaginationNext
						className='cursor-pointer'
						onClick={() =>
							setCurrentPage(
								Math.min(currentPage + 1, totalPages)
							)
						}
						disabled={currentPage === totalPages} // Disable on last page
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}

export default PaginationPage

// Helper function to calculate visible page range
function calculateVisiblePages(currentPage, maxVisiblePages, totalPages) {
	if (totalPages <= maxVisiblePages) {
		return [...Array(totalPages).keys()].map(i => i + 1) // Show all pages
	}

	const half = Math.floor(maxVisiblePages / 2)
	let startPage = currentPage - half
	let endPage = currentPage + half

	// Handle edge cases (beginning and end of page range)
	startPage = Math.max(startPage, 1)
	endPage = Math.min(endPage, totalPages)

	// Adjust start and end pages to ensure at least half on each side
	const numMissingFromStart = half - (currentPage - startPage)
	const numMissingFromEnd = half - (endPage - currentPage)

	if (numMissingFromStart > 0 && numMissingFromEnd > 0) {
		startPage = Math.max(startPage - numMissingFromStart, 1)
		endPage = Math.min(endPage + numMissingFromEnd, totalPages)
	} else if (numMissingFromStart > 0) {
		startPage = Math.max(startPage - numMissingFromStart, 1)
	} else if (numMissingFromEnd > 0) {
		endPage = Math.min(endPage + numMissingFromEnd, totalPages)
	}

	return [...Array(endPage - startPage + 1).keys()].map(i => startPage + i)
}
