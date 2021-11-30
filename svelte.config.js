import adapt from 'svelte-adapter-firebase';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapt(),
		target: '#svelte',
		vite: {
			ssr: { external: ['firebase', 'firebase-admin'] }
		}
	}
};

export default config;
