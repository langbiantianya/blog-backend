<script>
	import { onMount } from 'svelte';
	import { essay } from './+server';

	onMount(() => {
		essay
			.list()
			.then((value) => {
				console.log(value);
			})
			.catch((error) => {
				console.error(error);
			});
	});
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container mx-auto p-8 space-y-8">essay</div>

<style lang="css">
</style>
