<template>
	<svg aria-hidden="true" :style="styles">
		<use :xlink:href="iconName" :fill="color" />
	</svg>
</template>

<script setup lang="ts">
interface Props {
	iconClass: string;
	color: string;
	width: string;
	height: string;
}

const props = withDefaults(defineProps<Props>(), {
	width: "20px",
	height: "20px",
});

const styles = computed(() => {
	return `width: ${props.width}; height:${props.height}`;
});

const iconName = computed(() => {
	return `#icon-${props.iconClass}`;
});
</script>
