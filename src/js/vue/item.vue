<template>
	<li class="city-item maskBig" :id="city.name">
		<p class="city-name bold">{{ city.name }}</p>
		<div class="city-content">
			<div>
				<!-- <p class="title grey">Плюсы:</p> -->
				<ul>
					<li class="pros" v-for="plus in city.pros" :key="plus">
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
						{{ plus }}
					</li>
					<li v-if="city.cons" class="cons" v-for="con in city.cons" :key="con">
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
						{{ con }}
					</li>
				</ul>
			</div>

			<div>
				<!-- <p class="title grey">Месяца:</p> -->
				<ul class="city-months">
					<li
						v-for="month in city.months"
						:key="month.name"
						:class="{ allowSelect: month.pros || month.cons }"
					>
						<p class="month maskSmall">{{ month.name }}</p>
						<div
							class="city-months-content maskMd"
							v-if="month.pros || month.cons"
						>
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
					</li>
				</ul>
			</div>
			<div>
				<!-- <p class="title grey">Мероприятия:</p> -->
				<ul class="events">
					<li v-for="ev in city.events" :key="ev.name">
						<div class="ev-header">
							<a :href="ev.link" v-if="ev.link">
								{{ ev.name }}
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M18.0701 10.3199C17.8801 10.3199 17.6901 10.2499 17.5401 10.0999L12.0001 4.55994L6.46012 10.0999C6.17012 10.3899 5.69012 10.3899 5.40012 10.0999C5.11012 9.80994 5.11012 9.32994 5.40012 9.03994L11.4701 2.96994C11.7601 2.67994 12.2401 2.67994 12.5301 2.96994L18.6001 9.03994C18.8901 9.32994 18.8901 9.80994 18.6001 10.0999C18.4601 10.2499 18.2601 10.3199 18.0701 10.3199Z"
										fill="inherit"
									/>
									<path
										d="M12 21.2499C11.59 21.2499 11.25 20.9099 11.25 20.4999V3.66992C11.25 3.25992 11.59 2.91992 12 2.91992C12.41 2.91992 12.75 3.25992 12.75 3.66992V20.4999C12.75 20.9099 12.41 21.2499 12 21.2499Z"
										fill="inherit"
									/>
								</svg>
							</a>
							<p v-else class="ev-name">{{ ev.name }}</p>
							<p>
								{{ ev.month }} <span class="grey">{{ ev.date }}</span>
							</p>
						</div>
						<TextCollapse v-if="ev.description" :value="ev.description" />
					</li>
				</ul>
			</div>
		</div>
	</li>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { TCity } from "./data";
import TextCollapse from "./text-collapse.vue";
defineProps<{ city: TCity }>();
</script>

<style lang="scss" scoped>
@import "/src/scss/_variables.scss";

.title,
.month {
	margin-bottom: 12px;
}
.events {
	display: grid;
	gap: 12px;
}
.pros svg,
.cons svg {
	width: 12px;
	height: 12px;
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
.ev-header {
	display: flex;
	justify-content: space-between;

	a svg {
		width: 15px;
		height: 15px;
		fill: $d-gray;
		margin-left: 6px;
		margin-bottom: -2px;
		transform: rotate(45deg);
	}
	a:hover svg {
		fill: $dark;
	}
}

.ev-name {
	font-weight: 500;
	margin-bottom: 2px;
}
.month {
	margin-bottom: 0px;
}
.city-name {
	margin-bottom: 8px;
	font-size: 16px !important;
}
.city-months {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;

	> li > p {
		padding-inline: 8px;
		background-color: $l-gray;
	}
	.allowSelect {
		cursor: pointer;
		p {
			height: 24px;
			display: flex;
			justify-items: center;
		}
	}
	li {
		position: relative;
		color: white;
		&:hover {
			.city-months-content {
				opacity: 1;
				pointer-events: auto;
			}
		}
	}
	&-content {
		position: absolute;
		z-index: 2;
		top: calc(100% + 4px);
		background-color: $dark;
		max-width: 240px;
		width: max-content;
		padding: 4px 12px;
		opacity: 0;
		pointer-events: none;
		@media screen and (max-width: 480px) {
			display: none;
		}
	}
}
.city-content {
	display: grid;
	grid-template-columns: 320px 240px 1fr;
	gap: 32px;

	@media screen and (max-width: 480px) {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}
}
.grey {
	color: $d-gray;
	max-width: 720px;
}

.city-item {
	padding: 16px 24px;
	margin: 0 -24px;
	transition: 0.12s ease;
	scroll-margin-top: 112px;
	@media screen and (max-width: 480px) {
		display: flex;
		flex-wrap: wrap;
		margin: 0;
		padding: 16px 0;

		&:hover {
			background: transparent !important;
		}
	}
	&:hover {
		background: $ll-gray;
	}
	* {
		font-size: 14px;
	}
}

.bold {
	font-weight: 500;
}
</style>
