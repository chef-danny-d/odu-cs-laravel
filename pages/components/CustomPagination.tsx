import { connectPagination } from 'react-instantsearch-dom'

const Pagination = ({ currentRefinement, nbPages, refine, createURL }) => (
	<ul>
		{new Array(nbPages).fill(null).map((_, index) => {
			const page = index + 1
			const style = {
				fontWeight: currentRefinement === page ? 'bold' : '',
			}

			return (
				<li
					key={index}
					className="relative z-0 inline-flex shadow-sm sm:flex-wrap"
				>
					<a
						href={createURL(page)}
						onClick={(event) => {
							event.preventDefault()
							refine(page)
						}}
						className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
							currentRefinement === page ? 'bg-blue-300' : ''
						}`}
					>
						{page}
					</a>
				</li>
			)
		})}
	</ul>
)

const CustomPagination = connectPagination(Pagination)

export default CustomPagination
