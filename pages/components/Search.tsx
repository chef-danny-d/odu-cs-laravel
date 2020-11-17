import React, { useState } from 'react'
import { useRouter } from 'next/router'

const SearchBar = (props) => {
	//search holds the search query entered
	const [search, setSearch] = useState('')
	//holds the author's name typed by the user to narrow results
	const [author, setAuthor] = useState('')
	//results holds all of our returned data from db
	const [results, setResults] = useState([])

	const router = useRouter()

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

	const san = (str: string) => {
		if (str === null || str === '') {
			return false
		} else {
			str = str.toString()
			setSearch(str.replace(/(<([^>]+)>)/gi, ''))
		}
	}

	const handleSubmit = () => {
		san(search)
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
					defaultValue={search != '' ? search : router.query.query}
					autoComplete="off"
				/>
				<input
					type="text"
					name="author"
					placeholder="Specify the author"
					className="border border-gray-500 py-4 px-2 text-gray-500 shadow-md rounded-md w-1/2 block"
					onChange={(e) => change(e)}
					defaultValue={author != '' ? author : router.query.author}
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
