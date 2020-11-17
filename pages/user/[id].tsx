import React, { useState, useEffect } from 'react'
import withAuth from '../auth/withAuth'
import Layout from '../components/Layout'
import Link from 'next/link'
import axios from 'axios'
import { getID } from '../helper'
import FeatherIcon from 'feather-icons-react'

export default withAuth(function User() {
	const userSchema = {
		data: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			passwordConf: '',
			searchHistory: [],
		},
	}

	const [token, setToken] = useState('')
	const [user, setUser] = useState(userSchema)
	const [loading, setLoading] = useState(true)

	const deleteInstance = (e, key) => {
		e.preventDefault()
		//run query to remove nth element in array based on the key passed in
		// let data = JSON.stringify({ key })
		// axios
		// 	.post(`/api/user/${token}/searchDelete`, data, {
		// 		headers: { 'Content-Type': 'application/json' },
		// 	})
		// 	.then(() => {})
		// 	.catch((err) => {
		// 		console.error(err)
		// 	})
	}

	useEffect(() => {
		getID()
			.then((id) => {
				console.log(id)
				setToken(id)
			})
			.catch((err) => {
				console.error(err)
			})
		if (token) {
			axios
				.get(`/api/user?token=${token}`)
				.then((response) => {
					console.log(response)
					setUser(response.data)
					setLoading(false)
				})
				.catch((err) => {
					console.error(err)
				})
		}
	}, [token])
	return (
		<>
			{loading ? (
				<Layout>
					<p>Loading...</p>
				</Layout>
			) : (
				<Layout>
					<div className="account w-2/3 bg-white mx-auto px-6 py-2">
						<div className="account--content">
							<div className="user--header flex flex-row items-center justify-between w-1/3">
								<img
									src="https://via.placeholder.com/150"
									alt="user avatar"
									className="user--avatar rounded-full w-20"
								/>
								<div className="user--header-text">
									<h1 className="user--header-text text-md font-bold">
										{user.data.firstName}{' '}
										{user.data.lastName}
									</h1>
									<p className="text-sm text-gray-400">
										{user.data.email}
									</p>
								</div>
							</div>
							<div className="tile--header">
								<h1 className="tile--header-text text-lg">
									Saved articles
								</h1>
							</div>
							<div className="tile--content">
								{user.data.savedArticles.map(
									(instance, key) => (
										<div className="search--item rounded-sm flex flex-wrap flex-row justify-between px-4 py-1 text-white bg-indigo-300 my-2 hover:bg-indigo-400">
											<Link
												href={`/document/${instance}`}
											>
												<a className="">
													<div
														className="search--item__text flex flex-row"
														key={key}
													>
														<FeatherIcon
															icon="search"
															className="mr-2 text-gray-300 hover:text-white"
														/>
														{instance}
													</div>
												</a>
											</Link>
											<button
												onClick={(event: object) =>
													deleteInstance(event, key)
												}
											>
												<div className="search--item__icon hover:text-red-300">
													<FeatherIcon icon="trash" />
												</div>
											</button>
										</div>
									)
								)}
							</div>
						</div>
					</div>
					{/* <form>
						<button>Edit account</button>
					</form> */}
				</Layout>
			)}
		</>
	)
})
