import React, { useState, useEffect } from 'react'
import axios from 'axios'

const LoginForm = (props) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const change = (e) => {
		if (e.target.name === 'email') {
			setEmail(e.target.value)
		}
		if (e.target.name === 'password') {
			setPassword(e.target.value)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
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
			.then((res) => {
				return props.history.push(`/account/${res.data._id}`)
			})
			.catch((err) => {
				console.error('error: ', err)
			})
	}

	return (
		<div className="px-20">
			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					className="border"
					placeholder="Email"
					name="email"
					type="email"
					onChange={(e) => change(e)}
					value={email}
				/>
				<input
					className="border"
					placeholder="Password"
					name="password"
					type="password"
					onChange={(e) => change(e)}
					value={password}
				/>
				<button type="submit" className="border">
					Submit
				</button>
			</form>
		</div>
	)
}

export default LoginForm
