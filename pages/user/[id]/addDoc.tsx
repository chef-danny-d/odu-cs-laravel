import React, { useState, useEffect } from 'react'
import { withRouter, useRouter } from 'next/router'
import Layout from '../../components/Layout'
import axios from 'axios'

const addDoc = (props) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [release, setRelease] = useState('')
	const [type, setType] = useState('')

	const userID = props.router.query.id

	const handleSubmit = () => {
		const data = JSON.stringify({
			title,
			description,
			release,
			type,
		})
		axios
			.put(`/api/user/${userID}/document`, data, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then(() => {
				useRouter().push(`/user/${userID}`)
			})
	}

	const change = (e) => {
		if (e.target.name === 'title') {
			setTitle(e.target.value)
		}
		if (e.target.name === 'description') {
			setDescription(e.target.value)
		}
		if (e.target.name === 'release') {
			setRelease(e.target.value)
		}
		if (e.target.name === 'type') {
			setType(e.target.value)
		}
	}

	return (
		<Layout>
			<form onSubmit={() => handleSubmit()}>
				<input
					type="text"
					placeholder="title of document"
					value={title}
					name="title"
					onChange={(e) => change(e)}
				/>
				<input
					type="text"
					placeholder="description"
					value={description}
					name="description"
					onChange={(e) => change(e)}
				/>
				<input
					type="date"
					placeholder="release date"
					value={release}
					name="release"
					onChange={(e) => change(e)}
				/>
				<input
					type="text"
					placeholder="type of document"
					value={type}
					name="type"
					onChange={(e) => change(e)}
				/>
				<button type="submit">Add document</button>
			</form>
		</Layout>
	)
}

export default withRouter(addDoc)
