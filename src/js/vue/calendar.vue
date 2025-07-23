<template>
	<div class="calendar">
		<ul class="months">
			<li class="month" v-for="(month, key) in finalData">
				<p class="month-name">{{ key }}</p>
				<ul class="">
					<li class="month-city" v-for="city in month">
						<button
							@click="
								$emit('selectCity', { city: city.name, country: city.country })
							"
							class=""
							v-if="city.name"
						>
							<div class="month-city-name">{{ city.name }}</div>
							<CityMonth
								class="month-city-content"
								v-if="
									city.months.find((el) => el.name === key)?.pros ||
									city.months.find((el) => el.name === key)?.cons
								"
								:month="city.months.find((el) => el.name === key)"
							/>
						</button>
					</li>
				</ul>
			</li>
		</ul>
		<div class="content"></div>
	</div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import CityMonth from "./components/city-month.vue";
import { TCity, TMonthName, data } from "./data";

defineEmits(["selectCity"]);

const months: TMonthName[] = [
	"Январь",
	"Февраль",
	"Март",
	"Апрель",
	"Май",
	"Июнь",
	"Июль",
	"Август",
	"Сентябрь",
	"Октябрь",
	"Ноябрь",
	"Декабрь",
];

const finalData = {} as { [k in TMonthName]: TCity[] };
months.forEach((element) => {
	finalData[element] = [];
});
const arraData = Object.keys(data)
	.map((key) => data[key].countries)
	.flat();
arraData.forEach((country) => {
	country.cities?.forEach((city) => {
		months.forEach((m) => {
			return city.months.find((el) => el.name === m)
				? finalData[m].push(city)
				: finalData[m].push({} as TCity);
		});
		// city.months?.forEach((month) => finalData[month.name].push(city));
	});
});
</script>

<style lang="scss" scoped>
@import "src/scss/_variables.scss";
.calendar {
	width: 100%;
	margin-bottom: 24px;

	@media (max-width: 1240px) {
		padding-inline: 24px;
	}
	// @media (max-width: 480px) {
	// 	padding: 0 24px;
	// }
	.months {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		max-width: calc(100vw - 48px);
		gap: 2px;
		@media screen and (max-width: 1240px) {
			overflow-y: auto;
		}
	}
	.month {
		p {
			font-size: 12px;
			font-weight: 600;
		}

		&-name,
		&-city {
			text-align: center;
			padding: 1px 4px;
			font-size: 14px;
			position: relative;
			@media screen and (max-width: 480px) {
				min-width: 100px;
			}
			&-content {
				position: absolute;
				z-index: 2;
				top: calc(100% + 4px);
				background-color: $dark;
				max-width: 210px;
				width: max-content;
				padding: 4px 6px;
				opacity: 0;
				pointer-events: none;
				color: white;
				text-align: start;
				@media screen and (max-width: 480px) {
					display: none;
				}
			}
			&:hover {
				.month-city-content {
					opacity: 1;
					pointer-events: auto;
				}
			}
		}
		button {
			font-size: 12px;
			width: 100%;
			padding: 4px 0px;
			background: $gray;
			border-radius: 6px;
			&:hover {
				background: $ll-gray;
			}
		}
		&-name {
			//   background: white;
		}
		ul {
			padding: 4px;
			background: $l-gray;
			border-radius: 8px;
			margin-top: 8px;
			display: grid;
			gap: 2px;
		}
		li {
			padding: 0;
			min-height: 24px;
		}
	}
}
</style>
