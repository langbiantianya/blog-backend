<script>
	import essay from '$lib/api/essay';
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';
	import Vditor from 'vditor';

	export let data;
	let post = {};
	onMount(async () => {
		let response = await essay.info(data.post.id);
		let body = await response.json();
		body.html = (await Vditor.md2html(body.post, { cdn: '/vditor' })) ?? '';
		body.tags = body.tags ?? [];
		post = body;
	});
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container mx-auto p-8 space-y-8">
	<div class="card p-4">
		<header
			class="card-header flex-wrap flex flex-auto grid-flow-row justify-between content-center"
		>
			{#if post.html}
				<h1>{post.title}</h1>{/if}
		</header>
		<div>
			{#if post.html}
				<section class="p-4 mb-4 min-h-16">
					{@html post.html}
				</section>
			{/if}
		</div>
		<footer
			class="card-footer flex-wrap flex flex-auto grid-flow-row justify-between content-center"
		>
			{#if post.tags}
				<div>
					{#each post.tags as tag}
						<span class="chip variant-filled m-0.5">{tag.name}</span>
					{/each}
				</div>
			{/if}

			<div class="flex flex-wrap content-center justify-end flex-auto">
				<span class="h-6 leading-6"
					>{dayjs(new Date(post.updatedAt ?? post.createdAt)).format('YYYY/MM/DD HH:mm:ss')}</span
				>
			</div>
		</footer>
	</div>
</div>

<style lang="css">
</style>
