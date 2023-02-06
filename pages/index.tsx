import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Autocomplete from './components/Autocomplete'
import Layout from './components/Layout'
import { getID } from '../helper'
import { useIsAuthenticated } from '../providers/Auth'

export default function Home() {
	const isAuthenticated = useIsAuthenticated()
	const [token, setToken] = useState('')
	useEffect(() => {
		getID().then((id) => {
			setToken(id)
		})
	}, [])
	return (
		<Layout>
			<Head>
				<title>Triple P Search</title>
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.0.0/themes/algolia-min.css"
				/>
				<link
					rel="stylesheet"
					href="https://raw.githubusercontent.com/algolia/examples/master/instant-search/react-instantsearch/public/style.css"
				/>
			</Head>

			<main className="text-center text-gray-800">
				<h1 className="text-3xl">Welcome to The ETD search engine</h1>
				{!isAuthenticated ? (
					<p className="mt-5">
						Please{' '}
						<a className="underline font-bold" href="/login">
							log in
						</a>{' '}
						or{' '}
						<a className="underline font-bold" href="/register">
							register
						</a>
						, in order to search through our database of documents.
					</p>
				) : (
					<Autocomplete />
				)}
			</main>

			<footer className="w-full text-center absolute bottom-0">
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<img
						src="/vercel.svg"
						alt="Vercel Logo"
						className="mx-auto w-23"
					/>
				</a>
			</footer>
		</Layout>
	)
}
