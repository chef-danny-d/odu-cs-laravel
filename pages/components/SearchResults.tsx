import React from 'react'

const SearchResults = (props) => {
	const documents = props.results

	return (
		<div className="px-20">
			{documents.data !== undefined
				? documents.data.map((doc) => (
						<div
							className="w-full lg:max-w-full lg:flex my-3 mx-auto"
							key={doc._id}
						>
							<div className="border border-gray-400 bg-white rounded flex flex-col justify-between leading-normal px-5 py-2">
								<h1 className="text-gray-900 text-xl font-bold">
									{doc.title}
								</h1>
								<p className="text-gray-800">
									{doc.description}
								</p>
								<p className="text-gray-600 underline">
									{doc.author}
								</p>
								<p className="text-gray-600">
									{doc.type} document
								</p>
								<p className="text-gray-600">
									Release on {doc.release.substring(0, 10)}
								</p>
							</div>
						</div>
				  ))
				: null}
		</div>
	)
}

export default SearchResults
