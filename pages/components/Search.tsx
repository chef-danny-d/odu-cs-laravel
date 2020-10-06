import React, { useState, useEffect } from 'react'
import QuickResults from './QuickResults'
import SearchResults from './SearchResults'
import axios from 'axios'

const SearchBar = () => {
	const [search, setSearch] = useState('')
	const [results, setResults] = useState([])

	const change = (event) => {
		event.preventDefault()
		setSearch(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
	}

	useEffect(() => {
		axios
			.get(`/api/search?query=${search}`)
			.then((res) => {
				setResults(res.data)
			})
			.catch((err) => {
				console.error(err)
			})
	}, [search])

	return (
		<>
			<form className="mx-auto w-full" onSubmit={(e) => handleSubmit(e)}>
				<input
					type="text"
					name="query"
					placeholder="Search through millions of dissertation documents in real-time..."
					className="border border-gray-500 py-4 px-2 text-gray-500 shadow-md rounded-md w-1/2 mx-auto block"
					onChange={(e) => change(e)}
				/>
			</form>
			<SearchResults results={search.length == 0 ? [] : results} />
		</>
	)
}

export default SearchBar
