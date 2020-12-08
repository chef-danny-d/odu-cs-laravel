import { connectSearchBox } from 'react-instantsearch-dom'
import FeatherIcon from 'feather-icons-react'

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
	<form noValidate action="" className="flex flex-row flex-1" role="search">
		<input
			type="text"
			name="query"
			placeholder="Search through millions of dissertation documents in real-time..."
			className="border border-gray-500 py-4 px-2 text-gray-500 shadow-md rounded-md block w-full"
			value={currentRefinement}
			onChange={(event) => refine(event.currentTarget.value)}
			autoComplete="off"
		/>
		<button onClick={() => refine('')}>
			<FeatherIcon icon="x" />
		</button>
		{isSearchStalled ? 'My search is stalled' : ''}
	</form>
)

const CustomSearchBox = connectSearchBox(SearchBox)

export default CustomSearchBox
