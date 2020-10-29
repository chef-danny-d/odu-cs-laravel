import Nav from './Nav'

export default function Layout({ children }) {
	return (
		<>
			<Nav />
			<main className="bg-gray-200 pb-10 min-h-screen">{children}</main>
		</>
	)
}
