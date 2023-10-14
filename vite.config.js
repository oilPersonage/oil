import {defineConfig} from "vite";

export default defineConfig({
	base: "/oil",
	build: {
		// sourcemap: true,
		// Reduce bloat from legacy polyfills.
		target: "esnext",
		// Leave minification up to applications.
		// minify: false,
	}
})