import type { User } from '$lib/auth';
import { auth } from '$lib/firebase/server';
import type { Locals } from '$lib/locals';
import type { GetSession, Handle } from '@sveltejs/kit';
import cookie from 'cookie';

const getUserFromSession: (session: string) => Promise<User> = async (
	session
) => {
	console.log({ session });
	const decoded = await auth.verifySessionCookie(session);
	const user = await auth.getUser(decoded.uid);
	return {
		id: user.uid,
		name: user.displayName ?? ''
	};
};

export const handle: Handle<Locals> = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	if (cookies['session'])
		request.locals.user = await getUserFromSession(cookies['session']);
	return resolve(request);
};

export const getSession: GetSession<Locals, unknown, User | undefined> = (
	request
) => {
	console.log('getSession called', request.locals);
	return request.locals?.user;
};
