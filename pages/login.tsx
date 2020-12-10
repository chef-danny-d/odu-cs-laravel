import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Layout from './components/Layout'
import withoutAuth from './auth/withoutAuth'
import { useAuth } from './providers/Auth'
import ReCAPTCHA from 'react-google-recaptcha'

export default withoutAuth(function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [captchaID, setCaptchaID] = useState('')

	const router = useRouter()
	const { setAuthenticated } = useAuth()

	const change = (e) => {
		if (e.target.name === 'email') {
			setEmail(e.target.value)
		}
		if (e.target.name === 'password') {
			setPassword(e.target.value)
		}
	}
	const captcha = (value) => {
		setCaptchaID(value)
		console.log('Captcha value:', value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (captchaID === '') {
			setError('Please verify you are not a robot')
			return false
		}
		let data = JSON.stringify({
			email,
			password,
		})

		axios
			.post('/api/login', data, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then(() => {
				setAuthenticated(true)
				return router.push(`/`)
			})
			.catch((err) => {
				console.error('error: ', err)
				setError(err.message)
			})
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
				className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2 mx-auto"
				onSubmit={(e) => handleSubmit(e)}
			>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="email"
						placeholder="Email"
						name="email"
						value={email}
						onChange={(e) => change(e)}
					/>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Password
					</label>
					<input
						className={
							password.length !== 0 && password.length < 8
								? `shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`
								: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`
						}
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={(e) => change(e)}
					/>
					{password.length !== 0 && password.length < 8 && (
						<p className="text-red-500 text-xs italic">
							Make sure password is more than 8 characters.
						</p>
					)}
				</div>
				<div className="flex flex-1 items-center justify-center">
					<ReCAPTCHA
						sitekey="6LfDD-QZAAAAAIYmFRZorFHTtSZDrhd3q7HlSm52"
						onChange={captcha}
					/>
				</div>
				<div className="flex items-center justify-between">
					<a
						className="inline-block align-baseline font-bold text-sm text-blue-500 border-transparent hover:text-blue-800 hover:border-blue-500"
						href="/register"
					>
						Create a new account
					</a>
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
						onClick={(e) => handleSubmit(e)}
					>
						Sign In
					</button>
				</div>
				<p className="text-blue-500 text-center underline text-xs pt-3">
					<a href="/forgot">Forgot password ?</a>
				</p>
			</form>
		</Layout>
	)
})
