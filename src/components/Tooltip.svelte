<script>
	export let data;
	export let xScale;
	export let yScale;
	$: console.log(data.Distance);
</script>

<div
	class="tooltip"
	style="position: absolute;
top: {yScale(data.Distance)}px;
left: {xScale(data.Minutes)}px;"
>
	<p>{data.Distance}</p>
</div>

<style>
	.tooltip {
		padding: 6px;
		background-color: aqua;
		pointer-events: none;
		transition:
			top 300ms ease,
			left 300ms;
	}
</style>
