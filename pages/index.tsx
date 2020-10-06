import Head from 'next/head'
import Search from './components/Search'
import Nav from './components/Nav'
import React from 'react'

export default function Home() {
	return (
		<div className="bg-gray-200 pb-10 h-screen">
			<Head>
				<title>Triple P Search</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Nav />

			<main>
				<Search />
			</main>

			<footer className="mx-auto max-w-lg text-center fixed bottom-0">
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
		</div>
	)
}
