<!-- need to try this  https://github.com/stefanreifenberg/three-satellites/tree/main -->
<script>
	import { scaleLinear, line, curveMonotoneX } from 'd3';
	import { dataByYear, dayOfYearDomain, valueDomain } from './stores';

	const colors = {
		2023: '#ffafcc',
		2024: '#bde0fe',
		other: '#ffffff',
	};

	const lineGenerator = line()
		.x((d) => d.x)
		.y((d) => d.y)
		.curve(curveMonotoneX);

	let width, height;

	$: xScale = scaleLinear().domain($dayOfYearDomain).range([0, width]);
	$: yScale = scaleLinear().domain($valueDomain).range([height, 0]);

	// $: console.log({ dataByYear: $dataByYear });

	$: renderedData = $dataByYear.map((d) => {
		const renderedValues = d.values.map((v) => {
			return {
				...v,
				x: xScale(v.day_of_year),
				y: yScale(v.value),
			};
		});
		return {
			...d,
			values: renderedValues,
			path: lineGenerator(renderedValues),
			stroke: colors[d.key] || colors.other,
			strokeWidth: [2024, 2023].includes(d.key) ? 4.0 : 1,
			opacity: [2024, 2023].includes(d.key) ? 1.0 : 0.3,
		};
	});
	$: console.log(renderedData);
</script>

<main
	bind:clientHeight={height}
	bind:clientWidth={width}
>
	<svg
		width={width}
		height={height}
	>
		{#each renderedData as { path, stroke, strokeWidth, opacity }}
			<path
				d={path}
				stroke={stroke}
				stroke-width={strokeWidth}
				opacity={opacity}
			/>
		{/each}
	</svg>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		background: black;
	}
	path {
		fill: none;
		stroke-linecap: round;
		/* stroke: white; */
	}
</style>
