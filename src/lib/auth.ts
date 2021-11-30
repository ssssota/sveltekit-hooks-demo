import { browser } from '$app/env';
import { base } from '$app/paths';
import { session } from '$app/stores';
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup
} from 'firebase/auth';
import type { Readable } from 'svelte/store';
import { auth } from './firebase/client';

const authProvider = new GoogleAuthProvider();

const registerSessionToken: (token: string) => Promise<void> = (token) =>
	fetch(`${base}/api/session`, {
		method: 'POST',
		body: JSON.stringify({ token }),
		headers: { 'content-type': 'application/json' }
	}).then(() => undefined);

const unregisterSessionToken: () => Promise<void> = () =>
	fetch(`${base}/api/session`, { method: 'DELETE' }).then(() => undefined);

export const signIn: () => Promise<void> = () =>
	auth.currentUser !== null
		? Promise.reject(new Error('Already signed in.'))
		: signInWithPopup(auth, authProvider)
				.then((result) => result?.user.getIdToken())
				.then(registerSessionToken);

export const signOut: () => Promise<void> = () =>
	unregisterSessionToken().then(() => auth.signOut());

export type User = {
	id: string;
	name: string;
};

if (browser)
	onAuthStateChanged(auth, (u) => {
		console.log('auth state changed', u);
		if (u === null) session.set(undefined);
		else session.set({ id: u.uid, name: u.displayName ?? '' });
	});

export const user: Readable<User | undefined> = session;
