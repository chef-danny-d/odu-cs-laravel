import React, { useEffect, useState } from 'react'
import axios from 'axios'

const RegisterForm = (props) => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConf, setPasswordConf] = useState('')

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
			.then((res) => {
				return props.history.push(`/account/${res.data._id}`)
			})
			.catch((err) => {
				console.error('error: ', err)
			})
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
		<div className="px-20">
			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					className="border"
					placeholder="First name"
					name="fname"
					type="text"
					onChange={(e) => change(e)}
					value={firstName}
				/>
				<input
					className="border"
					placeholder="Last name"
					name="lname"
					type="text"
					onChange={(e) => change(e)}
					value={lastName}
				/>
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
				<input
					className="border"
					placeholder="Password confirmation"
					name="passwordConf"
					type="password"
					onChange={(e) => change(e)}
					value={passwordConf}
				/>
				<button type="submit" className="border">
					Submit
				</button>
			</form>
		</div>
	)
}

export default RegisterForm
