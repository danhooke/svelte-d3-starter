<script>
	import data from './data/data.json';
	import { scaleLinear } from 'd3-scale';
	import AxisX from './components/AxisX.svelte';
	import AxisY from './components/AxisY.svelte';
	import Tooltip from './components/Tooltip.svelte';
	import Circle from './Circle.svelte';
	console.log(data);
	const margin = { top: 20, right: 80, left: 0, bottom: 20 };
	let width = 400;
	let height = 400;
	$: xScale = scaleLinear()
		.domain([0, 60])
		.range([0, width - margin.left - margin.right]);
	const yScale = scaleLinear()
		.domain([0, 10])
		.range([height - margin.top - margin.bottom, 0]);

	let hoveredData;
	$: console.log(hoveredData);
</script>

<h1>Random Activities</h1>
<div
	class="chart-container"
	bind:clientWidth={width}
	on:mouseleave={() => {
		hoveredData = null;
	}}
>
	<svg
		width={width}
		height={height}
	>
		<AxisX
			height={height}
			xScale={xScale}
			margin={margin}
		/>
		<AxisY
			width={width}
			yScale={yScale}
			margin={margin}
		/>
		<g
			class="circles"
			transform="translate({margin.left} {margin.top}"
		>
			{#each data.sort((a, b) => a.Minutes - b.Minutes) as act}
				<circle
					cx={xScale(act.Minutes)}
					cy={yScale(act.Distance)}
					r={hoveredData && hoveredData == act ? '10' : '4'}
					fill="orange"
					stroke="black"
					on:mouseover={() => {
						hoveredData = act;
					}}
					on:focus={() => {
						hoveredData = act;
					}}
					tabindex="0"
				/>
			{/each}</g
		>
	</svg>
	{#if hoveredData}
		<Tooltip
			data={hoveredData}
			xScale={xScale}
			yScale={yScale}
		/>
	{/if}
</div>

<style>
	svg {
		background-color: aliceblue;
		/* padding: 20px; */
	}
	circle {
		transition: all 300ms ease;
		cursor: pointer;
	}
</style>
