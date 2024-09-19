<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();

	function drawerClose() {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a href="/" on:click={drawerClose}>看板</a></li>
		<li><a href="/edit" on:click={drawerClose}>攥写</a></li>
		<li><a href="/tmp" on:click={drawerClose}>暂存</a></li>
		<li><a href="/essay" on:click={drawerClose}>文章</a></li>
		<li><a href="/preferences" on:click={drawerClose}>个性化</a></li>
		<li><a href="/setting" on:click={drawerClose}>设置</a></li>
	</ul>
</nav>
