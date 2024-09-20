<script>
	import { onMount } from 'svelte';
	import Vditor from 'vditor';
	onMount(() => {
		const vditor = new Vditor('vditor', {
			theme: 'dark',
			mode:'wysiwyg',
			minHeight: 600,
			cdn:"vditor",
		});
	});
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container mx-auto p-8 space-y-8">
	<div id="vditor" />
</div>

<style lang="css">
</style>
