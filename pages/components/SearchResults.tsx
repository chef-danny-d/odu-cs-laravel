import React, { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import Pagination from './Pagination'
import parse from 'html-react-parser'
import { getID } from '../helper'
import FeatherIcon from 'feather-icons-react'

const SearchResults = (props: object) => {
	const { query } = props.router.query
	let author: string
	let type: string
	if (props.router.query.author) {
		author = props.router.query.author
	}
	if (props.router.query.type) {
		type = props.router.query.type
	}

	const [results, setResults] = useState([])
	const [loading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage] = useState(15)
	const [currentPosts, setCurrentPosts] = useState()
	const [token, setToken] = useState('')
	//changes the current page on click
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	useEffect(() => {
		getID().then((id) => {
			setToken(id)
		})
		const indexOfLastPost = currentPage * postsPerPage
		const indexOfFirstPost = indexOfLastPost - postsPerPage
		axios
			.get(
				`/api/search?query=${query}${
					author ? `&author=${author}` : ''
				}${type ? `&type=${type}` : ''}`
			)
			.then((response) => {
				console.log(response)
				setResults(response.data)
				setCurrentPosts(
					response.data.data.slice(indexOfFirstPost, indexOfLastPost)
				)
				setLoading(false)
			})
			.catch((error) => {
				console.error(error)
			})
	}, [query, currentPage])

	return (
		<div className="px-20">
			{loading ? (
				<p>loading...</p>
			) : (
				<>
					<Results
						results={currentPosts}
						query={query}
						userID={token}
					/>
					<Pagination
						postPerPage={postsPerPage}
						totalPosts={results.data.length}
						paginate={paginate}
						currentPage={currentPage}
					/>
				</>
			)}
		</div>
	)
}

//adds highlight to text that user searched for
const highlight = (title, term) => {
	return title.replace(
		new RegExp(term, 'gi'),
		(match) => `<mark>${match}</mark>`
	)
}

//Renders the subject pills
const subjectMapper = (array) => {
	try {
		return array.subject.map((item: string, index: number) => (
			<Link
				key={index}
				href={{
					pathname: '/search',
					query: { query: item },
				}}
			>
				<a>
					<span
						key={index}
						className="bg-teal-400 rounded px-2 py-1 mx-1 my-3 text-sm"
					>
						{item}
					</span>
				</a>
			</Link>
		))
	} catch (error) {
		console.error(error)
	}
}

const Results = (props: object) => {
	const { results, query, userID } = props
	const [user, setUser] = useState([])

	const saveArticle = (articleID: string, token: string) => {
		axios
			.put(`/api/user/${token}/document`, { _id: articleID }, {})
			.then((result) => {
				setUser(result.data)
			})
			.catch((error) => {
				console.error(error)
			})
	}
	return (
		<>
			{query ? (
				<p className="text-gray-500">{results.length} results found</p>
			) : null}

			{results.map((doc) => (
				<div className="max-w-full flex my-3 mx-auto" key={doc._id}>
					<div className="w-full border border-gray-400 bg-white rounded flex flex-col justify-between leading-normal px-5 py-2">
						<div className="flex flex-row items-center justify-between">
							<Link href={`/document/${doc._id}`}>
								<a className="flex-1">
									<h1 className="text-gray-900 text-xl font-bold hover:underline">
										{parse(highlight(doc.title, query))}
									</h1>
								</a>
							</Link>
							<button
								onClick={() => {
									saveArticle(doc._id, userID)
								}}
							>
								<FeatherIcon icon="bookmark" />
							</button>
						</div>
						<Link
							href={{
								pathname: '/search',
								query: { author: doc.contributor_author },
							}}
						>
							<a>
								<p className="text-gray-500 hover:underline">
									{doc.contributor_author}
								</p>
							</a>
						</Link>
						<p className="text-gray-800">
							{doc.description_abstract
								? doc.description_abstract.substr(0, 150)
								: null}
							...
						</p>
						<p className="text-gray-600 underline">{doc.author}</p>
						<p className="text-gray-600">
							Release on {doc.date_rdate} by {doc.publisher}
						</p>
						<div className="my-3">{subjectMapper(doc)}</div>
					</div>
				</div>
			))}
		</>
	)
}

export default withRouter(SearchResults)
