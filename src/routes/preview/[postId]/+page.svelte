<script>
	import essay from '$lib/api/essay';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import dayjs from 'dayjs';
	import Vditor from 'vditor';

	export let data;
	let post = {};
	async function loadEssay() {
		let response = await essay.info(data.post.id);
		let body = await response.json();
		body.html = (await Vditor.md2html(body.post, { cdn: '/vditor' })) ?? '';
		body.tags = body.tags ?? [];
		post = body;
	}
	function publish(id) {
		essay.publish(id).then((response) => {
			loadEssay();
		});
	}
	function hideEssay(id) {
		essay.hide(id).then((response) => {
			loadEssay();
		});
	}
	function edit(id) {
		goto(`/edit/${id}`);
	}
	onMount(async () => {
		loadEssay();
	});
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container mx-auto p-8 space-y-8">
	<div class="card p-4">
		<header
			class="card-header flex-wrap flex flex-auto grid-flow-row justify-between content-center"
		>
			{#if post.title}
				<h1>{post.title}</h1>
				<div class="">
					{#if post.hide}
						<button class="chip variant-soft hover:variant-filled" on:click={edit(post.id)}>
							<span>编辑</span>
						</button>
						<button class="chip variant-soft hover:variant-filled" on:click={publish(post.id)}>
							<span>发布</span>
						</button>
					{:else}
						<button class="chip variant-soft hover:variant-filled" on:click={hideEssay(post.id)}>
							<span>撤回</span>
						</button>
					{/if}
				</div>
			{/if}
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
