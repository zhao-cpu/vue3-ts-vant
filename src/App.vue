<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCommonStore } from "@/store/common";

const store = useCommonStore();
const { keepAlive } = storeToRefs(store);
</script>

<template>
	<router-view v-slot="{ Component }">
		<keep-alive :include="keepAlive">
			<component :is="Component" :key="$route.path" />
		</keep-alive>
	</router-view>
</template>

<style>
:root:root {
	--van-text-ellipsis-action-color: theme("colors.primary");
	--van-picker-confirm-action-color: theme("colors.primary");
	--van-overlay-background: rgba(51, 51, 51, 0.5);
}
img {
	object-fit: cover;
}
</style>
