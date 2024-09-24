<script>
	import { onMount } from 'svelte';
	import Vditor from 'vditor';
	import { browser } from '$app/environment';
	let vditor;
	let vditorHTMLElement;
	let vditorContentTheme;
	let isDarkMode = browser ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;

	onMount(async () => {
		vditor = new Vditor(vditorHTMLElement, {
			theme: browser ? (isDarkMode ? 'dark' : 'classic') : 'classic',
			mode: 'wysiwyg',
			minHeight: 800,
			cdn: '/vditor',
			cache: {
				enable: false
			},
			toolbar: [
				'emoji',
				'headings',
				'bold',
				'italic',
				'strike',
				'|',
				'line',
				'quote',
				'list',
				'ordered-list',
				'check',
				'outdent',
				'indent',
				'code',
				'inline-code',
				'insert-after',
				'insert-before',
				'undo',
				'redo',
				'upload',
				'link',
				'table',
				// 'record',
				'edit-mode',
				'both',
				'preview',
				'fullscreen',
				'outline',
				'code-theme',
				// 'content-theme',
				'export',
				// 'devtools',
				'info',
				'help',
				'br'
				// {
				// 	name: '233321',
				// 	icon: '',
				// 	className: '',
				// 	tip: '',
				// 	hotkey: '',
				// 	suffix: undefined,
				// 	prefix: undefined,
				// 	// ne, nw
				// 	tipPosition: undefined,
				// 	toolbar: [],
				// 	level: undefined,
				// 	click: (event, vditor) => {}
				// }
			],
		});
		if (browser) {
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
				isDarkMode = event.matches;
				if (isDarkMode) {
					vditor.setTheme('dark');
				} else {
					vditor.setTheme('classic');
				}
			});
		}
	});
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<link
	bind:this={vditorContentTheme}
	id="vditorContentTheme"
	rel="stylesheet"
	type="text/css"
	href="/vditor/dist/css/content-theme/{browser ? (isDarkMode ? 'dark' : 'light') : 'light'}.css"
/>
<div class="container mx-auto p-8 space-y-8">
	<div bind:this={vditorHTMLElement} />
</div>

<style lang="css">
</style>
