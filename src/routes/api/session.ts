import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';
import type { Locals } from '$lib/locals';
import { auth } from '$lib/firebase/server';

type PostBody = {
	token: string;
};

const sessionCookieName = 'session';

export const post: RequestHandler<Locals, PostBody> = async ({ body }) => {
	const expiresIn = 60 * 60 * 24 * 5 * 1000;
	const idToken = body.token;
	const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
	return {
		headers: {
			'set-cookie': cookie.serialize(sessionCookieName, sessionCookie, {
				httpOnly: true,
				path: '/',
				secure: true,
				sameSite: 'lax',
				maxAge: expiresIn / 1000
			})
		}
	};
};

export const del: RequestHandler<Locals> = async ({ headers }) => {
	const cookies = cookie.parse(headers.cookie ?? '');

	await auth
		.verifySessionCookie(cookies[sessionCookieName] ?? '')
		.then((token) => auth.revokeRefreshTokens(token.sub))
		.catch(console.error);

	return {
		headers: {
			'set-cookie': cookie.serialize(sessionCookieName, 'revoked', {
				maxAge: 0,
				path: '/'
			})
		}
	};
};
