<script>
	import { InputChip } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import essay from '$lib/api/essay';
	import Vditor from 'vditor';
	import { browser } from '$app/environment';
	import { getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();
	let post = {};
	let vditor;
	let vditorHTMLElement;
	let vditorContentTheme;
	let isDarkMode = browser ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
	let selectedTag = [];
	function tmp() {
		post.post = vditor.getValue();
		post.tags = selectedTag.map((item) => {
			return {
				name: item
			};
		});
		post.hide = true;
		essay.add(post).then((response) => {
			let t = {
				message: '暂存成功',
				timeout: 5000
			};
			toastStore.trigger(t);
		});
	}
	function publish() {
		post.post = vditor.getValue();
		post.tags = selectedTag.map((item) => {
			return {
				name: item
			};
		});
		post.hide = false;
		essay
			.add(post)
			.then((response) => {
				return essay.publish(post.id);
			})
			.then((response) => {
				let t = {
					message: '发布成功',
					timeout: 5000
				};
				toastStore.trigger(t);
				goto(`/preview/${post.id}`);
			});
	}
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
			]
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
<div class="container mx-auto px-8 space-y-4">
	<div class="container mx-auto space-y-1 pt-4">
		<div class="flex-wrap flex grid-flow-row justify-between content-center">
			<div class="flex-auto mr-2">
				<input
					type="text"
					placeholder="请输入文章标题"
					class="input rounded"
					bind:value={post.title}
				/>
			</div>
			<div class="btn-group variant-filled rounded">
				<button class="btn variant-filled rounded" on:click={tmp}>暂存</button>
				<button class="btn variant-filled rounded" on:click={publish}>发布</button>
			</div>
		</div>
		<InputChip
			bind:value={selectedTag}
			name="chips"
			placeholder="请输入新的标签"
			rounded="rounded"
		/>
	</div>
	<div bind:this={vditorHTMLElement} class="rounded" />
</div>

<style lang="css">
</style>
