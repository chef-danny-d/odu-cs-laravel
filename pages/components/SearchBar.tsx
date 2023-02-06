import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import algoliasearch from 'algoliasearch/lite'
import {
	InstantSearch,
	Hits,
	Highlight,
	Stats,
	PoweredBy,
	RefinementList,
	Menu,
	VoiceSearch,
} from 'react-instantsearch-dom'
import PropTypes from 'prop-types'
import Link from 'next/link'
import CustomSearchBox from './CustomSearchBox'
import CustomPagination from './CustomPagination'
import FeatherIcon from 'feather-icons-react'
import axios from 'axios'
import { getID } from '../../helper'

const SearchBar = (props) => {
	//search holds the search query entered
	const [search, setSearch] = useState('')
	//holds the author's name typed by the user to narrow results
	const [author, setAuthor] = useState('')
	//results holds all of our returned data from db
	const [results, setResults] = useState([])

	const [token, setToken] = useState('')

	const router = useRouter()
	console.log(router.query.query)

	const handleSubmit = () => {
		console.log(search)
		router.push({
			pathname: '/search',
			query: {
				query: search,
				author,
			},
		})
	}

	const saveArticle = (articleID: string, token: string) => {
		console.log({ articleID, token })

		axios
			.put(`/api/user/${token}/document`, { _id: articleID }, {})
			.catch((error) => {
				console.error(error)
			})
	}

	useEffect(() => {
		if (router.query.query !== '') {
			setSearch(router.query.query as string)
		}
		getID().then((id) => {
			setToken(id)
		})
	}, [])

	const searchClient = algoliasearch(
		'R0WRQIWMY7',
		'38847230fed81cdba195078ef5b35770'
	)

	function Hit({ hit }) {
		return (
			<div className="max-w-full flex my-3 mx-auto" key={hit._id}>
				<div className="w-full border border-gray-400 bg-white rounded flex flex-col justify-between leading-normal px-5 py-2">
					<div className="flex flex-row items-center justify-between">
						<Link href={`/document/${hit._id.$oid}`}>
							<a className="flex-1">
								<h1 className="text-gray-900 text-xl font-bold hover:underline">
									<Highlight
										attribute="title"
										hit={hit}
										tagName="mark"
									/>
								</h1>
							</a>
						</Link>
						<button
							onClick={() => {
								saveArticle(hit._id.$oid, token)
							}}
						>
							<FeatherIcon icon="bookmark" />
						</button>
					</div>
					<Link
						href={{
							pathname: '/search',
							query: {
								query: '',
								author: hit.contributor_author,
							},
						}}
					>
						<a>
							<p className="text-gray-500 hover:underline">
								<Highlight
									attribute="contributor_author"
									hit={hit}
									tagName="mark"
								/>
							</p>
						</a>
					</Link>
					<p className="text-gray-800">
						<Highlight
							attribute="description_abstract"
							hit={hit}
							tagName="mark"
						/>
					</p>
					<p className="text-gray-600 underline">{hit.author}</p>
					<p className="text-gray-600">
						Release on {hit.date_rdate} by {hit.publisher}
					</p>
					<div className="my-3">
						{hit.subject && typeof hit.subject === 'object'
							? hit.subject.map((item: string, key: number) => (
									<span
										key={key}
										className="bg-teal-400 rounded px-2 py-1 mx-1 my-1 text-sm inline-block"
									>
										{item}
									</span>
							  ))
							: null}
					</div>
				</div>
			</div>
		)
	}

	Hit.propTypes = {
		hit: PropTypes.object.isRequired,
	}

	return (
		<div className="w-full px-3 pt-2 flex flex-row">
			<InstantSearch
				searchClient={searchClient}
				indexName="cs418"
				searchState={{ query: search }}
			>
				<div className="w-1/5 px-3 py-2">
					<h3 className="text-md">Department</h3>
					<RefinementList
						attribute="contributor_department"
						withSearchBox
					/>
					<h3 className="text-md">Author</h3>
					<RefinementList
						attribute="contributor_author"
						withSearchBox
					/>
					<h3 className="text-md">Type</h3>
					<Menu attribute="type" />
				</div>
				<div className="search-panel w-2/3 flex-1">
					<div className="search-panel__results">
						<div className="flex flex-row w-full items-center justify-center">
							<VoiceSearch />
							<CustomSearchBox />
							<PoweredBy />
						</div>
						<Stats />
						<CustomPagination
							showLast
							translations={{
								previous: '‹',
								next: '›',
								first: '«',
								last: '»',
								page(currentRefinement) {
									return currentRefinement
								},
								ariaPrevious: 'Previous page',
								ariaNext: 'Next page',
								ariaFirst: 'First page',
								ariaLast: 'Last page',
								ariaPage(currentRefinement) {
									return `Page ${currentRefinement}`
								},
							}}
						/>
						<Hits hitComponent={Hit} />
						<CustomPagination
							showLast
							translations={{
								previous: '‹',
								next: '›',
								first: '«',
								last: '»',
								page(currentRefinement) {
									return currentRefinement
								},
								ariaPrevious: 'Previous page',
								ariaNext: 'Next page',
								ariaFirst: 'First page',
								ariaLast: 'Last page',
								ariaPage(currentRefinement) {
									return `Page ${currentRefinement}`
								},
							}}
						/>
					</div>
				</div>
			</InstantSearch>
		</div>
	)
}

export default SearchBar
