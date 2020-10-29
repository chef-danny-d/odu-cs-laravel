import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { CookiesPageContext } from '../@types'

function isBrowser(): boolean {
	return typeof window !== 'undefined'
}

export default function withConditionalRedirect<CP = {}, IP = CP>({
	WrappedComponent,
	clientCondition,
	serverCondition,
	location,
}: {
	WrappedComponent: NextPage<CP, IP>
	clientCondition(): boolean
	serverCondition(ctx: CookiesPageContext): boolean
	location: string
}): NextPage<CP, IP> {
	const WithConditionalRedirectWrapper: NextPage<CP, IP> = (props) => {
		const router = useRouter()
		const redirectCondition = clientCondition()
		if (isBrowser() && redirectCondition) {
			router.push(location)
			return <></>
		}
		return <WrappedComponent {...props} />
	}

	WithConditionalRedirectWrapper.getInitialProps = async (
		ctx
	): Promise<IP> => {
		if (!isBrowser() && ctx.res) {
			if (serverCondition(ctx as CookiesPageContext)) {
				ctx.res.writeHead(302, { Location: location })
				ctx.res.end()
			}
		}

		const componentProps =
			WrappedComponent.getInitialProps &&
			(await WrappedComponent.getInitialProps(ctx))

		return { ...(componentProps as IP) }
	}

	return WithConditionalRedirectWrapper
}
