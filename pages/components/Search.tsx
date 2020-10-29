import React, { useState } from 'react'
import QuickResults from './QuickResults'
import { useRouter } from 'next/router'

const SearchBar = (props) => {
	//search holds the search query entered
	const [search, setSearch] = useState('')
	//holds the author's name typed by the user to narrow results
	const [author, setAuthor] = useState('')
	//results holds all of our returned data from db
	const [results, setResults] = useState([])
	//we use display to determine whether search results should be displayed
	const [display, setDisplay] = useState(false)
	//we use submit to determine whether search bar needs to be in the middle of screen or hidden under nav
	const [submit, setSubmit] = useState(false)

	const router = useRouter()

	//stores the recent searches
	const quickResults = []

	const change = (event) => {
		event.preventDefault()
		if (event.target.name === 'query') {
			setSearch(event.target.value)
		}
		if (event.target.name === 'author') {
			setAuthor(event.target.value)
		}
		if (event.target.value.length === 0) {
			setResults([])
		}
	}

	const handleSubmit = () => {
		router.push({
			pathname: '/search',
			query: {
				query: search,
				author,
			},
		})
	}

	return (
		<>
			<form
				className="mx-auto flex justify-center"
				onSubmit={() => handleSubmit()}
			>
				<input
					type="text"
					name="query"
					placeholder="Search through millions of dissertation documents in real-time..."
					className="border border-gray-500 py-4 px-2 text-gray-500 shadow-md rounded-md w-1/2 block"
					onChange={(e) => change(e)}
					value={search}
					autoComplete="off"
				/>
				<input
					type="text"
					name="author"
					placeholder="Specify the author"
					className="border border-gray-500 py-4 px-2 text-gray-500 shadow-md rounded-md w-1/2 block"
					onChange={(e) => change(e)}
					value={author}
					autoComplete="off"
				/>
				<button
					type="submit"
					className="border py-2 px-5 bg-purple-200 rounded-full mx-2"
					onClick={() => {
						router.push({
							pathname: '/search',
							query: { query: search },
						})
					}}
				>
					Search
				</button>
			</form>
		</>
	)
}

export default SearchBar
