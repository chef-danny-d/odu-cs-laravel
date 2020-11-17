import React, { useState, useEffect } from 'react'
import withAuth from '../auth/withAuth'
import Layout from '../components/Layout'
import Item from '../components/Item'

export default withAuth(function Document() {
	return (
		<Layout>
			<Item />
		</Layout>
	)
})
