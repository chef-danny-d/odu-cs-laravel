import React, { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
import axios from 'axios'

const Item = (props) => {
	const [loading, setLoading] = useState(true)
	const [document, setDocument] = useState({
		data: { title: '', identifier_uri: '', description_abstract: '' },
	})

	const id = props.router.query.id

	useEffect(() => {
		axios
			.get(`/api/document/${id}`)
			.then((result) => {
				setDocument(result.data)
				setLoading(false)
			})
			.catch((error) => {
				console.error(error)
			})
	}, [])

	const getDownload = (uri: string, document: any) => {
		const split = uri.split(/([0-9]+)/)
		console.log(typeof document)
		if (document === undefined) {
			return false
		}
		if (typeof document === 'object') {
			return (
				<div className="flex flex-col">
					{document.map((index: string, key: number) => (
						<a
							className="bg-teal-400 py-2 px-3 rounded text-white inline-block my-3 hover:bg-purple-700"
							href={`https://vtechworks.lib.vt.edu/bitstream/handle/${split[1]}/${split[3]}/${index}`}
							target="_blank"
							key={key}
						>
							Download {index}
						</a>
					))}
				</div>
			)
		} else {
			const link = `https://vtechworks.lib.vt.edu/bitstream/handle/${split[1]}/${split[3]}/${document}`
			return (
				<a
					className="bg-teal-400 py-2 px-3 rounded text-white inline-block my-3 hover:bg-purple-700"
					href={link}
					target="_blank"
				>
					Download document
				</a>
			)
		}
	}

	return loading ? (
		<p>loading...</p>
	) : (
		<div className="w-2/3 mx-auto flex">
			<div className="w-1/5 flex flex-col">
				<a
					className="bg-blue-400 py-2 px-3 rounded text-white inline-block my-3 hover:bg-indigo-400"
					href={document.data.identifier_uri}
					target="_blank"
				>
					Access document
				</a>
				<h3 className="text-lg">Supporting documents</h3>
				{getDownload(
					document.data.identifier_uri,
					document.data.relation_haspart
				)}
			</div>
			<div className="flex-1 pl-5">
				<h1 className="text-3xl">{document.data.title}</h1>
				<p>{document.data.description_abstract}</p>
			</div>
		</div>
	)
}

export default withRouter(Item)
