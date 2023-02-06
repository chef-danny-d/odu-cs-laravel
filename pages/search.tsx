import React from 'react'
import withAuth from './auth/withAuth'
import Layout from './components/Layout'
import SearchBar from './components/SearchBar'

const Search = withAuth((props) => {
	return (
		<Layout>
			<SearchBar />
		</Layout>
	)
})

export default Search
