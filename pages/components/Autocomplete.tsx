import algoliasearch from 'algoliasearch'
import React from 'react'
import { InstantSearch, VoiceSearch } from 'react-instantsearch-dom'
import CustomAutocomplete from './CustomAutocomplete'

const Autocomplete = () => {
	const searchClient = algoliasearch(
		'R0WRQIWMY7',
		'38847230fed81cdba195078ef5b35770'
	)
	return (
		<div>
			<InstantSearch searchClient={searchClient} indexName="cs418">
				<div className="flex flex-row justify-center w-1/2 mx-auto mt-5">
					<div className="flex items-center">
						<VoiceSearch />
					</div>
					<CustomAutocomplete />
				</div>
			</InstantSearch>
		</div>
	)
}

export default Autocomplete
