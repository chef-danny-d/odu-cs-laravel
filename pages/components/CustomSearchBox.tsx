import { connectSearchBox } from 'react-instantsearch-dom'
import FeatherIcon from 'feather-icons-react'
import { useState } from 'react'
import { useRouter } from 'next/router'

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => {
	const router = useRouter()
	const [search, setSearch] = useState(router.query.query)
	const handleChange = (event) => {
		setSearch(event.target.value)
		console.log(search)
	}
	return (
		<form
			noValidate
			action=""
			className="flex flex-row flex-1"
			role="search"
		>
			<div className="mt-1 relative rounded-md shadow-sm flex flex-row flex-1">
				{search !== '' && (
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center">
						<span className="text-gray-500 sm:text-sm">
							<button>
								<FeatherIcon icon="x" />
							</button>
						</span>
					</div>
				)}
				<input
					type="text"
					name="query"
					id="search"
					className={`border border-gray-500 py-4 ${
						search !== '' ? 'pl-12' : 'pl-3'
					} pr-12 text-gray-500 shadow-md rounded-md block w-full`}
					value={search}
					onChange={(event) => handleChange(event)}
					autoComplete="off"
				/>
				<div className="absolute inset-y-0 right-0 flex items-center mr-5">
					<button onClick={() => refine(search)}>
						<FeatherIcon icon="search" />
					</button>
				</div>
			</div>
			{isSearchStalled ? 'My search is stalled' : ''}
		</form>
	)
}

const CustomSearchBox = connectSearchBox(SearchBox)

export default CustomSearchBox
