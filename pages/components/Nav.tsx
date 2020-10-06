import React from 'react'

const Nav = (props) => {
	return (
		<nav className="w-full py-5">
			<ul className="flex flex-row w-1/2 align-items-center justify-content-end">
				<a href="/" className="px-3 py-1">
					<li className="text-indigo-500 underline">Search</li>
				</a>
				<a href="/register" className="px-3 py-1">
					<li className="">Register</li>
				</a>
				<a href="/login" className="px-3 py-1">
					<li className="">Login</li>
				</a>
				<a href="/account" className="px-3 py-1">
					<li className="">My Account</li>
				</a>
			</ul>
		</nav>
	)
}

export default Nav
