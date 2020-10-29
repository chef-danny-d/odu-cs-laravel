import Head from 'next/head'
import SearchBar from './components/Search'
import Nav from './components/Nav'
import React from 'react'
import Layout from './components/Layout'

export default function Home() {
	return (
		<Layout>
			<Head>
				<title>Triple P Search</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="text-center text-gray-800">
				<h1 className="text-3xl">
					Welcome to The Thesis Search Engine
				</h1>
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
			</main>

			<footer className="mx-auto max-w-lg text-center absolute bottom-0">
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
