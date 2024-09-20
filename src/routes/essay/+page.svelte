<script>
	import { onMount } from 'svelte';
	import { essay } from './+server';
	import { Paginator } from '@skeletonlabs/skeleton';
	import dayjs from 'dayjs';
	import Vditor from 'vditor';
	let essayList = [];
	let paginationSettings = {
		page: 0,
		limit: 5,
		size: 0,
		amounts: [1, 2, 5, 10]
	};

	onMount(async () => {
		let response = await essay.list();
		let body = await response.json();
		for (let index = 0; index < body.length; index++) {
			const row = body[index];
			row.html = await Vditor.md2html(row.post, { cdn: 'https://unpkg.com/vditor/' });
		}
		essayList = body;
		paginationSettings.size = body.length;
	});
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<div class="container mx-auto p-8 space-y-8">
	<ul>
		{#each essayList as row}
			<li class="card px-4 pb-4 mb-4">
				<header class="card-header">
					<h1>{row.title}</h1>
				</header>
				<section class="p-4 mb-4 truncate max-h-48 min-h-16">
					{@html row.html}
				</section>
				<footer class="card-footer flex-wrap flex flex-auto grid-flow-row justify-between content-center">
					<div>
						{#each row.tags as tag}
							<span class="chip variant-filled m-0.5">{tag.name}</span>
						{/each}
					</div>
					<div class="flex flex-wrap content-center justify-end flex-auto">
						<span class="h-6 leading-6">{dayjs(new Date(row.updatedAt ?? row.createdAt)).format("YYYY/MM/DD HH:mm:ss")}</span>
					</div>
				</footer>
			</li>
		{/each}
	</ul>

	<Paginator
		bind:settings={paginationSettings}
		showFirstLastButtons={true}
		showPreviousNextButtons={true}
	/>
</div>

<style lang="css">
</style>
