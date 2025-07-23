import anime from "animejs";
import { computed, createApp, ref } from "vue/dist/vue.esm-bundler.js";

const button = [...document.querySelectorAll(".exchangeOpenBtn")];
const modal = document.querySelector(".exchange");
const body = document.querySelector("#exchange");

modal.style.zIndex = "-1";
button.forEach(
	(el) =>
		(el.onclick = (e) => {
			modal.classList.add("opened");
			modal.style.zIndex = "10";
			anime({
				targets: modal,
				background: "rgba(0, 0, 0, 0.2)",
			});
			anime({
				targets: body,
				scale: [0.5, 1],
				opacity: [0, 1],
				easing: "easeOutCubic",
				duration: 300,
			});
		})
);

function hide() {
	modal.classList.remove("opened");
	anime({
		targets: modal,
		background: "rgba(0, 0, 0, 0)",
	});
	anime({
		targets: body,
		scale: 0.7,
		opacity: 0,
		easing: "easeInCubic",
		duration: 300,
		complete() {
			modal.style.zIndex = "-1";
		},
	});
}

modal.addEventListener("click", (e) => {
	if (e.target !== modal) return;
	hide();
});

createApp({
	setup() {
		const rub = ref(50000);
		const rubUsdt = ref(103);
		const usdtKzt = ref(526);
		const kztThb = ref(15.6);
		const currency = ref("THB");
		const currencyList = ref(["THB", "KZT", "VND"]);
		const freeNKZT = 0.995;
		const priceRubUsdt = computed(() => rub.value / rubUsdt.value);
		const priceUsdtKzt = computed(() => priceRubUsdt.value * usdtKzt.value);
		const total = computed(
			() => (priceUsdtKzt.value / kztThb.value) * freeNKZT
		);

		function formattingPrice(cur, value) {
			return new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: cur,
			}).format(value);
		}

		const formattedTotal = computed(() =>
			formattingPrice(currency.value, total.value)
		);

		function onChangeRub({ target }) {
			if (isNaN(Number(target.value))) return;
			const value = Number(target.value);
			rub.value = value < 10 ? 10 : value > 1000000 ? 1000000 : value;
		}

		function onChangeRubUsdt({ target }) {
			if (isNaN(Number(target.value))) return;
			const value = Number(target.value);
			rubUsdt.value = value < 10 ? 10 : value > 1000000 ? 1000000 : value;
		}

		function onChangeUsdtKzt({ target }) {
			if (isNaN(Number(target.value))) return;
			const value = Number(target.value);
			usdtKzt.value = value < 10 ? 10 : value > 1000000 ? 1000000 : value;
		}

		function onChangeKtzThb({ target }) {
			if (isNaN(Number(target.value))) return;
			const value = Number(target.value);
			kztThb.value = value < 10 ? 10 : value > 1000000 ? 1000000 : value;
		}

		return {
			rub,
			rubUsdt,
			usdtKzt,
			kztThb,
			currency,
			total,
			formattedTotal,
			onChangeRub,
			onChangeRubUsdt,
			onChangeKtzThb,
			onChangeUsdtKzt,
			priceRubUsdt,
			priceUsdtKzt,
			currencyList,
			onHide: hide,
		};
	},
}).mount("#exchange");
