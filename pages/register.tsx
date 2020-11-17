import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Layout from './components/Layout'
import withoutAuth from './auth/withoutAuth'
import { useAuth } from './providers/Auth'
import ReCAPTCHA from 'react-google-recaptcha'

export default withoutAuth(function Register() {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConf, setPasswordConf] = useState('')
	const [error, setError] = useState('')

	const { setAuthenticated } = useAuth()

	const handleSubmit = (e) => {
		e.preventDefault()
		let data = JSON.stringify({
			firstName,
			lastName,
			email,
			password,
			passwordConf,
		})

		axios
			.post('/api/register', data, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then(() => {
				setAuthenticated(true)
				useRouter().push(`/`)
			})
			.catch((err) => {
				console.error('error: ', err.message)
				setError(err.message)
			})
	}
	function captcha(value) {
		console.log('Captcha value:', value)
	}
	const change = (e) => {
		if (e.target.name === 'fname') {
			setFirstName(e.target.value)
		}
		if (e.target.name === 'lname') {
			setLastName(e.target.value)
		}
		if (e.target.name === 'email') {
			setEmail(e.target.value)
		}
		if (e.target.name === 'password') {
			setPassword(e.target.value)
		}
		if (e.target.name === 'passwordConf') {
			setPasswordConf(e.target.value)
		}
	}
	return (
		<Layout>
			{error != '' && (
				<div role="alert">
					<div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
						Error
					</div>
					<div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
						<p>{error}</p>
					</div>
				</div>
			)}
			<form
				className="w-1/2 mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={(e) => handleSubmit(e)}
			>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
							First Name
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							type="text"
							name="fname"
							placeholder="First name"
							onChange={(e) => change(e)}
							value={firstName}
						/>
					</div>
					<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
							Last Name
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							type="text"
							placeholder="Last name"
							name="lname"
							onChange={(e) => change(e)}
							value={lastName}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full px-3">
						<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
							Email
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							type="email"
							name="email"
							placeholder="example@example.com"
							value={email}
							onChange={(e) => change(e)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
							Password
						</label>
						<input
							className={
								password.length !== 0 && password.length < 8
									? `appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white border-red-500`
									: `appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`
							}
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e) => change(e)}
							value={password}
						/>
						{(password.length !== 0 && password.length < 8 && (
							<p className="text-red-500 text-xs italic">
								Make sure password is more than 8 characters.
							</p>
						)) ||
							(password !== passwordConf && (
								<p className="text-red-500 text-xs italic">
									Make sure passwords match
								</p>
							))}
					</div>
					<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
							Password Confirm
						</label>
						<input
							className={
								passwordConf.length !== 0 &&
								passwordConf.length < 8
									? `appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white border-red-500`
									: `appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`
							}
							type="password"
							name="passwordConf"
							placeholder="Confirm password"
							onChange={(e) => change(e)}
							value={passwordConf}
						/>
						{(passwordConf.length !== 0 &&
							passwordConf.length < 8 && (
								<p className="text-red-500 text-xs italic">
									Make sure password is more than 8
									characters.
								</p>
							)) ||
							(password !== passwordConf && (
								<p className="text-red-500 text-xs italic">
									Make sure passwords match
								</p>
							))}
					</div>
				</div>
				<div className="flex flex-1 items-center justify-center mb-6">
					<ReCAPTCHA
						sitekey={`${process.env.REACT_APP_SITEKEY}`}
						onChange={captcha}
					/>
				</div>
				<div className="flex items-center justify-around w-full">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="button"
						onClick={(e) => handleSubmit(e)}
					>
						Register
					</button>
				</div>
			</form>
		</Layout>
	)
})
