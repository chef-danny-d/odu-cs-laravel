import React from 'react'
import Layout from './components/Layout'
import Nav from './components/Nav'
import SearchBar from './components/Search'
import SearchResults from './components/SearchResults'

const Search = (props) => {
	return (
		<Layout>
			<SearchBar />
			<SearchResults />
		</Layout>
	)
}

export default Search
