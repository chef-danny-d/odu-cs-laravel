import React, { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
import axios from 'axios'

const SearchResults = (props) => {
	const { query } = props.router.query
	let author: string
	let type: string
	if (props.router.query.author) {
		author = props.router.query.author
	}
	if (props.router.query.type) {
		type = props.router.query.type
	}

	console.log(query)

	const [results, setResults] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		axios
			.get(
				`/api/search?query=${query}${
					author ? `&author=${author}` : ''
				}${type ? `&type=${type}` : ''}`
			)
			.then((response) => {
				console.log(response)
				setResults(response.data)
				setLoading(false)
			})
			.catch((error) => {
				console.error(error)
			})
	}, [query])

	return (
		<div className="px-20">
			{loading ? (
				<p>loading...</p>
			) : (
				<>
					{query ? (
						<p className="text-gray-500">
							{results.data.length} results found
						</p>
					) : null}

					{results.data.map((doc) => (
						<div
							className="max-w-full flex my-3 mx-auto"
							key={doc._id}
						>
							<div className="w-full border border-gray-400 bg-white rounded flex flex-col justify-between leading-normal px-5 py-2">
								<h1 className="text-gray-900 text-xl font-bold">
									{doc.title}
								</h1>
								<p className="text-gray-800">
									{doc.description}
								</p>
								<p className="text-gray-600 underline">
									{doc.author}
								</p>
								<p className="text-gray-600">
									{doc.type} document
								</p>
								<p className="text-gray-600">
									Release on {doc.release.substring(0, 10)}
								</p>
							</div>
						</div>
					))}
				</>
			)}
		</div>
	)
}

export default withRouter(SearchResults)
