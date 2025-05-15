import { Button } from './ui/button'
import { SearchIcon } from 'lucide-react'
import { Input } from './ui/input'

const SearchBar = ({ searchTerm, handleSearchChange }) => {
	return (
		<form
			className='w-full mx-2 '
			onSubmit={event => event.preventDefault()}
		>
			<div className='flex h-10 mx-5 items-center rounded-full border border-input pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2'>
				{/* <Input
					name='search'
					placeholder='Search Patients'
					className='w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
					value={searchTerm}
					onChange={handleSearchChange}
				/> */}
				<SearchIcon className='h-[16px] w-[16px]' />
				<Input
					name='search'
					placeholder='Search Patients'
					className='w-full p-2 placeholder:text-muted-foreground rounded-full border-0 ring-offset-background focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50 bg-transparent'
					autocomplete='off'
					value={searchTerm}
					onChange={handleSearchChange}
				/>

				{/* <Button type='submit' className='px-2 rounded-full'></Button> */}
			</div>
		</form>
	)
}

export default SearchBar
