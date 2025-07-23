<template>
	<div class="maskMd">
		<ul class="pros" v-if="month.pros">
			<li v-for="item in month.pros" :key="item" class="grey">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
						fill="inherit"
					/>
					<path
						d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z"
						fill="inherit"
					/>
				</svg>
				{{ item }}
			</li>
		</ul>
		<ul class="cons" v-if="month.cons">
			<li v-for="item in month.cons" :key="item" class="grey">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
						fill="inherit"
					/>
				</svg>
				{{ item }}
			</li>
		</ul>
	</div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import { TMonth } from "../data";
defineProps<{ month: TMonth }>();
</script>

<style lang="scss" scoped>
@import "/src/scss/_variables.scss";
.pros svg,
.cons svg {
	width: 12px;
	height: 12px;
}
.pros,
.cons {
	display: grid;
	gap: 2px;
}
.pros {
	svg {
		fill: $dark;
	}
}
.cons {
	svg {
		fill: $red;
	}
}
</style>
