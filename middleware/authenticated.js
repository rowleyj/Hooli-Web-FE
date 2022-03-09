import cookies from 'browser-cookies';

const protectedRoutes = ['dashboard', 'activity'];

const getAuthTokenCookie = (cookieHeader) => {
	if (!cookieHeader) return null;
	const cookies = cookieHeader.split(';');
	return cookies.find(cookie => cookie.startsWith('token'));
};

/**
 * This function is not meant as a security measure. Authentication is verified per request, this
 * is intended to improve user experience by informing them they are not logged in
 * @param {*} param0
 */
export default function ({
	req, store, redirect, route
}) {
	const paths = route.path.split('/');
	const firstLayerRoute = paths.length > 1 ? paths[1] : null;
	if (protectedRoutes.includes(firstLayerRoute)) {
		// If the user is not authenticated
		if (!process.server) {
			if (!cookies.get('token')) {
				store.dispatch('logout');
				redirect('/');
			}
		} else {
			const authCookies = getAuthTokenCookie(req.headers.cookie);
			if (!authCookies) redirect('/');
		}
	}
}
