<template>
	<div class="seasons-wrapper">
		<h2>График благоприятных сезонов</h2>
		<MyCalendar @selectCity="changeCountry" />
		<div class="tabs">
			<MySelect title="Регион" :value="region" />
			<MySelect
				title="Страна"
				:value="country"
				:options="options"
				@onChange="country = $event"
			/>
		</div>
		<div>
			<ul class="list" v-if="country === 'Все страны'">
				<MyCollapse
					:defOpened="idx === 0"
					:title="country.name"
					:key="country.name"
					v-for="(country, idx) in data[region].countries"
					:item="country"
				/>
			</ul>
			<MyCollapse
				v-else
				defOpened
				:title="country"
				:item="data[region].countries.find((e) => e.name === country)"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue/dist/vue.esm-bundler.js";
import MyCalendar from "./calendar.vue";
import MyCollapse from "./collapse.vue";
import { data } from "./data.js";
import MySelect from "./select.vue";

type TRange = "year" | "3 months";
const mapRange = {
	year: { title: "Год", range: "all" },
	"3 months": { title: "3 месяца", range: 3 },
};

const region = ref(data.Asia.name);
const country = ref(data[region.value].countries[1].name);
const options = computed(() => [
	"Все страны",
	...data[region.value].countries.map((c) => c.name),
]);
const rangeOptions: TRange[] = ["year", "3 months"];
const range = ref<TRange>("year");

function changeCountry(ev) {
	country.value = ev.country;

	setTimeout(() => {
		const el = document.getElementById(ev.city);
		if (!el) return;
		el.scrollIntoView({ behavior: "smooth" });
	}, 100);
}
</script>

<style scoped lang="scss">
.tabs {
	display: flex;
	gap: 24px;
	margin-top: 36px;
	@media screen and (max-width: 480px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
}
.list {
	display: grid;
	gap: 20px;
}
.seasons-wrapper {
	width: 100%;
	max-width: 1280px;
	margin: 0 auto;
}
h2 {
	margin-bottom: 48px;
	@media screen and (max-width: 480px) {
		font-size: 14px;
		margin-bottom: 24px;
	}
}
</style>
