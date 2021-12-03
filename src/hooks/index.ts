import type { User } from '$lib/auth';
import { auth } from '$lib/firebase/server';
import type { Locals } from '$lib/locals';
import { sessionKey } from '$lib/session';
import type { GetSession, Handle } from '@sveltejs/kit';
import cookie from 'cookie';

const getUserFromSession: (session: string) => Promise<User> = async (
	session
) => {
	const decoded = await auth.verifySessionCookie(session);
	const user = await auth.getUser(decoded.uid);
	return {
		id: user.uid,
		name: user.displayName ?? ''
	};
};

export const handle: Handle<Locals> = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	request.locals.user = cookies[sessionKey]
		? await getUserFromSession(cookies[sessionKey]).catch(() => undefined)
		: undefined;
	return resolve(request);
};

export const getSession: GetSession<Locals, unknown, User | undefined> = (
	request
) => {
	console.log('getSession called', request.locals);
	return request.locals.user;
};
