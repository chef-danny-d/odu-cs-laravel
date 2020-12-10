import { useRouter } from 'next/router'
import { connectAutoComplete } from 'react-instantsearch-dom'
import FeatherIcons from 'feather-icons-react'

const Autocomplete = ({ hits, currentRefinement, refine }) => {
	const router = useRouter()
	const handleSubmit = (event) => {
		event.preventDefault()
		router.push({
			pathname: '/search',
			query: {
				query: currentRefinement,
			},
		})
	}
	const highlight = (title, term) => {
		return title.replace(
			new RegExp(term, 'gi'),
			(match) => `<mark>${match}</mark>`
		)
	}
	return (
		<div className="relative w-full">
			<form className="flex flex-row">
				<input
					type="search"
					value={currentRefinement}
					onChange={(event) => refine(event.currentTarget.value)}
					placeholder="Search through millions of dissertation documents in real-time..."
					className="border border-gray-500 py-4 px-2 text-gray-500 shadow-md rounded-md block w-full flex-2"
				/>
				<button
					type="submit"
					className="flex-2"
					onClick={(e) => handleSubmit(e)}
				>
					Search
				</button>
			</form>
			{currentRefinement !== '' && (
				<ul className="bg-gray-300 border-2 m-1/2 mx-auto px-2 py-2 rounded shadow-lg text-left">
					{hits.map((hit) => (
						<li className="py-2 hover:underline" key={hit.objectID}>
							<a
								className="flex flex-row items-center"
								href={`/document/${hit._id.$oid}`}
							>
								<FeatherIcons
									icon="search"
									className="mr-5 w-3 h-3"
								/>
								<span className="h-6 overflow-hidden w-full">
									{hit.title}
								</span>
							</a>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

const CustomAutocomplete = connectAutoComplete(Autocomplete)

export default CustomAutocomplete
