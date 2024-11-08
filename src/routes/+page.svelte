<script>
	import * as echarts from 'echarts/core';
	import { Chart } from 'svelte-echarts';
	import { HeatmapChart } from 'echarts/charts';
	import { LineChart } from 'echarts/charts';
	import { init, use } from 'echarts/core';
	import {
		TitleComponent,
		CalendarComponent,
		TooltipComponent,
		VisualMapComponent,
		GridComponent
	} from 'echarts/components';
	import { CanvasRenderer } from 'echarts/renderers';
	import { onMount } from 'svelte';
	// now with tree-shaking
	use([
		LineChart,
		GridComponent,
		CanvasRenderer,
		TitleComponent,
		CalendarComponent,
		TooltipComponent,
		,
		HeatmapChart,
		VisualMapComponent
	]);

	function getVirtualData(year) {
		const date = +echarts.time.parse(year + '-01-01');
		const end = +echarts.time.parse(+year + 1 + '-01-01');
		const dayTime = 3600 * 24 * 1000;
		const data = [];
		for (let time = date; time < end; time += dayTime) {
			data.push([
				echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
				Math.floor(Math.random() * 10000)
			]);
		}
		return data;
	}

	let heatmapOptions = {
		title: {
			top: 30,
			left: 'center',
			text: 'Daily Step Count'
		},
		tooltip: {},
		visualMap: {
			min: 0,
			max: 10000,
			type: 'piecewise',
			orient: 'horizontal',
			left: 'center',
			top: 65
		},
		calendar: {
			top: 120,
			left: 30,
			right: 30,
			cellSize: ['auto', 13],
			range: '2016',
			itemStyle: {
				borderWidth: 0.5
			},
			yearLabel: { show: false }
		},
		series: {
			type: 'heatmap',
			coordinateSystem: 'calendar',
			data: getVirtualData('2016')
		}
	};

	let lineOptions = {
		title: {
			text: '访问量'
		},
		grid: { left: 'auto', right: "auto", top: 40, bottom: 'auto', containLabel: true },
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				type: 'line',
				data: [120, 200, 150, 80, 70, 110, 130]
			}
		]
	};
	onMount(() => {});
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container mx-auto p-8 space-y-8">
	<div class="flex flex-wrap justify-center">
		<div class="card flex-auto min-h-60 min-w-48 max-w-sm p-4 m-2 flex items-center">
			<dl class="list-dl">
				<div>
					<span class="badge bg-primary-500">💀</span>
					<span class="flex-auto">
						<dt>已发布</dt>
						<dd>1024篇</dd>
					</span>
				</div>
				<div>
					<span class="badge bg-primary-500">💀</span>
					<span class="flex-auto">
						<dt>码字</dt>
						<dd>1024字</dd>
					</span>
				</div>
			</dl>
		</div>

		<div class="card flex-auto min-h-60 min-w-48 max-w-lg p-4 m-2 justify-center items-center">
			<Chart {init} options={lineOptions} />
		</div>
		<div class="card flex-auto min-h-60 min-w-48 p-4 m-2 justify-center items-center">
			<Chart {init} options={heatmapOptions} />
		</div>
	</div>
</div>

<style lang="css">
</style>
