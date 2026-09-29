import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import postcss from 'postcss';

function enableHoverOnHybridDevices(source: string) {
	const css = postcss.parse(source);
	css.walkAtRules('media', (rule) => {
		// Tailwind 4 and daisyUI suppress hover styles when a touchscreen is
		// reported as the primary input, even if the device also has a mouse.
		if (rule.params.replaceAll(' ', '') === '(hover:hover)' && rule.nodes) {
			rule.replaceWith(...rule.nodes);
		}
	});
	return css.toString();
}

export default defineConfig({
	plugins: [
		tailwindcss(),
		{
			name: 'enable-hover-on-hybrid-devices',
			transform(source, id) {
				if (!id.match(/\.css(?:\?|$)/) || !source.includes('@media')) return;
				return enableHoverOnHybridDevices(source);
			},
			generateBundle(_, bundle) {
				for (const asset of Object.values(bundle)) {
					if (asset.type !== 'asset' || !asset.fileName.endsWith('.css')) continue;
					asset.source = enableHoverOnHybridDevices(asset.source.toString());
				}
			}
		},
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter()
		})
	]
});
