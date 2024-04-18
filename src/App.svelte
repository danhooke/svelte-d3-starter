<!-- need to try this  https://github.com/stefanreifenberg/three-satellites/tree/main -->
<script>
	import { scaleLinear } from 'd3';
	import Circle from './Circle.svelte';

	let data = [];
	setInterval(() => {
		data = Array.from({ length: 100 }).map(() => {
			return {
				a: Math.random(),
				b: Math.random(),
				r: Math.random(),
				fill: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
			};
		});
	}, 2000);

	// const data = Array.from({ length: 1000 }).map(() => {
	// 	return {
	// 		a: Math.random(),
	// 		b: Math.random(),
	// 		r: Math.random(),
	// 		fill: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
	// 	};
	// });
	// const data = [
	// 	{ a: 155, b: 384, r: 20, fill: '#0000FF' },
	// 	{ a: 340, b: 238, r: 52, fill: '#FF0AAE' },
	// 	{ a: 531, b: 151, r: 20, fill: '#00E1FF' },
	// 	{ a: 482, b: 307, r: 147, fill: '#7300FF' },
	// 	{ a: 781, b: 91, r: 61, fill: '#0FFB33' },
	// 	{ a: 668, b: 229, r: 64, fill: '#D400FF' },
	// ];

	let width = 1000;
	let height = 500;

	$: xScale = scaleLinear().domain([0, 1]).range([0, width]);
	$: yScale = scaleLinear().domain([0, 1]).range([height, 0]);
	$: rScale = scaleLinear()
		.domain([0, 1])
		.range([5, width / 100]);
</script>

<main
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	<svg
		width={width}
		height={height}
	>
		{#each data as { a, b, r, fill }}
			<Circle
				x={xScale(a)}
				y={yScale(b)}
				r={rScale(r)}
				fill={fill}
			/>
		{/each}
	</svg>
</main>

<style>
	main {
		width: 80vw;
		height: 80vh;
	}
	svg {
		background: #f3fff0;
	}
</style>
