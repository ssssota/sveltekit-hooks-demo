import type { FirebaseOptions } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig: FirebaseOptions = {
	apiKey: 'AIzaSyDLz5R6pRbMB1sJGGHznoXkMH_J78zhu4g',
	authDomain: 'sveltekit-hooks-demo.firebaseapp.com',
	projectId: 'sveltekit-hooks-demo',
	storageBucket: 'sveltekit-hooks-demo.appspot.com',
	messagingSenderId: '1039473865658',
	appId: '1:1039473865658:web:c0fdce3021b30e03ade383'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
