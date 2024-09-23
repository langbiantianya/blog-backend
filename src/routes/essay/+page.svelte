<script>
	import { onMount } from 'svelte';
	import essay from '$lib/api/essay';
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
	async function loadEssayPage({ page, limit } = {}) {
		let response = await essay.list({
			page: page ?? paginationSettings.page + 1,
			limit: limit ?? paginationSettings.limit,
			hide: false
		});
		let body = await response.json();
		let list = [];
		if (body.data) {
			for (let index = 0; index < body.data.length; index++) {
				const row = body.data[index];
				row.html = await Vditor.md2html(row.post, { cdn: 'vditor' });
				row.tags = row.tags ?? [];
				list.push(row);
			}
		}
		essayList = list;
		paginationSettings.size = body.size ?? 0;
		paginationSettings.page = body.page - 1;
		paginationSettings.limit = body.limit;
	}
	function pageAmount(limit) {
		loadEssayPage({ limit: limit.detail });
	}
	function page(page) {
		loadEssayPage({ page: page.detail + 1 });
	}
	function hideEssay(id) {
		essay.hide(id).then((response) => {
			loadEssayPage();
		});
	}

	onMount(() => {
		loadEssayPage();
	});
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<div class="container mx-auto p-8 space-y-8">
	<ul>
		{#each essayList as row}
			<li class="card px-4 card-hover pb-4 mb-4">
				<header
					class="card-header flex-wrap flex flex-auto grid-flow-row justify-between content-center"
				>
					<h1>{row.title}</h1>
					<button class="chip variant-soft hover:variant-filled" on:click={hideEssay(row.id)}>
						<span>撤回</span>
					</button>
				</header>
				<a href="/preview/{row.id}">
					<section class="p-4 mb-4 truncate max-h-48 min-h-16">
						{@html row.html}
					</section>
				</a>
				<footer
					class="card-footer flex-wrap flex flex-auto grid-flow-row justify-between content-center"
				>
					<div>
						{#each row.tags as tag}
							<span class="chip variant-filled m-0.5">{tag.name}</span>
						{/each}
					</div>
					<div class="flex flex-wrap content-center justify-end flex-auto">
						<span class="h-6 leading-6"
							>{dayjs(new Date(row.updatedAt ?? row.createdAt)).format('YYYY/MM/DD HH:mm:ss')}</span
						>
					</div>
				</footer>
			</li>
		{/each}
	</ul>

	<Paginator
		bind:settings={paginationSettings}
		showFirstLastButtons={true}
		showPreviousNextButtons={true}
		on:amount={pageAmount}
		on:page={page}
	/>
</div>

<style lang="css">
</style>
