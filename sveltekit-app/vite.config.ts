import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	// @ts-expect-error known issue with vite + vitest, should be fixed in future versions 
	plugins: [sveltekit(), tailwindcss()]
});
