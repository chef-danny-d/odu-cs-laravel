import React, { useEffect, useState } from 'react'
import axios from 'axios'

const QuickResults = (props) => {
	const [quick, setQuick] = useState('')
	const { display } = props

	useEffect(() => {
		const quickResults = localStorage.getItem('query')
		setQuick(quickResults)
	}, [])

	return display ? (
		<div>
			Recent searches: <p>{quick}</p>
		</div>
	) : null
}

export default QuickResults
