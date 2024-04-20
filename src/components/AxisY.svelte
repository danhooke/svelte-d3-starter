<script>
	export let width;
	export let margin;

	export let yScale;
	let yTicks = [0, 2, 4, 6, 8, 10];
</script>

<g transform="translate({margin.left} {margin.top})">
	{#each yTicks as tick}
		<text
			y={yScale(tick)}
			x="0"
			dy="-6"
			>{tick} {tick === 10 ? ' km' : ''}
		</text>
		<line
			x1="0"
			y1={yScale(tick)}
			x2={width}
			y2={yScale(tick)}
			stroke="grey"
		/>
	{/each}
</g>
