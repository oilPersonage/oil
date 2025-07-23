<template>
	<div
		class="collapseText"
		:class="{ opened: opened }"
		@click="opened = !opened"
		v-if="value && MAX_INFO_LENGTH < value.length"
	>
		<p class="collapse-text">{{ value }}</p>
	</div>
	<div v-else class="grey">{{ value }}</div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
defineProps<{ value: string }>();

const MAX_INFO_LENGTH = 174;

const opened = ref(false);
</script>

<style lang="scss" scoped>
@import "/src/scss/variables.scss";
.collapse-text,
.grey {
	color: $d-gray;
}
.collapseText {
	transition: 0.6s ease;
	cursor: pointer;
	&.opened {
		.collapse-text {
			-webkit-line-clamp: 33;
		}
	}
}
.collapse-text {
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}
</style>
