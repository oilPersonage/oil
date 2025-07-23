<script setup lang="ts">
import {
	computed,
	defineEmits,
	defineProps,
	onMounted,
	onUnmounted,
	ref,
} from "vue";
const props = defineProps<{
	title: string;
	value: string;
	options?: string[];
}>();
defineEmits(["onChange"]);
const list = ref(null);
const opened = ref(false);
const hasOptions = computed(() => props.options && props.options.length > 0);

function close(e) {
	if (opened.value && !list.value.contains(e.target)) {
		opened.value = !opened.value;
	}
}

onMounted(() => {
	document.addEventListener("click", close);
});
onUnmounted(() => {
	document.removeEventListener("click", close);
});
</script>

<template>
	<div class="select">
		<p class="select-title">{{ title }}</p>
		<div ref="list">
			<button
				class="select-button maskSmall"
				@click.prevent="opened = !opened"
				:disabled="!hasOptions"
				:class="{ empty: !hasOptions }"
			>
				{{ value || "Не выбрано" }}
			</button>
			<div
				v-if="hasOptions"
				:class="{ opened: opened }"
				class="list-wrapper mask"
			>
				<div class="list">
					<div
						class="list-item"
						@click="
							$emit('onChange', item);
							opened = false;
						"
						:class="{ active: item === value }"
						v-for="item in options"
						key="item"
					>
						{{ item }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "/src/scss/variables.scss";
.select {
	min-width: 220px;
	font-size: 14px;
	width: fit-content;
	position: relative;
	@media screen and (max-width: 480px) {
		min-width: 160px;
	}
}
.select-button {
	padding: 8px 12px;
	border-radius: 12px;
	width: 100%;
	background: $l-gray;
	color: $dark;
	&.empty {
		cursor: default;
		color: $d-gray;
	}
}
.select-title {
	margin-bottom: 4px;
	font-size: 14px;
}
.list {
	overflow: hidden;
	display: grid;
	gap: 4px;
}
.list-wrapper {
	padding: 8px 8px;
	position: absolute;
	z-index: 3;
	top: 100%;
	left: 0;
	width: 100%;
	display: grid;
	grid-template-rows: 0fr;
	transition: 0.3s ease-in;
	background: transparent;
	pointer-events: none;
	&.opened {
		pointer-events: auto;
		background-color: $l-gray;
		transition: 0.3s ease-out;
		grid-template-rows: 1fr;
	}
}
.list-item {
	padding: 8px 12px;
	text-align: center;
	cursor: pointer;
	border-radius: 8px;
	transition: 0.12s ease-out;
	&:hover {
		background: $gray;
	}
	&.active {
		background: $gray;
	}
}
</style>
