<template>
  <div class="wrapper">
    <div class="country">
      <div class="country-wrapper mask">
        <div class="country-heading">
          <h4>{{ item.name }}</h4>
          <p v-if="item.description" class="grey">{{ item.description }}</p>
        </div>
        <div class="titles">
          <p>Город</p>
          <p>Месяца</p>
          <p>Мероприятия</p>
        </div>
      </div>
      <!-- <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="var(--dark)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.92 15.8001C19.73 15.8001 19.54 15.7301 19.39 15.5801L12.87 9.06008C12.39 8.58008 11.61 8.58008 11.13 9.06008L4.61002 15.5801C4.32002 15.8701 3.84002 15.8701 3.55002 15.5801C3.26002 15.2901 3.26002 14.8101 3.55002 14.5201L10.07 8.00008C11.13 6.94008 12.86 6.94008 13.93 8.00008L20.45 14.5201C20.74 14.8101 20.74 15.2901 20.45 15.5801C20.3 15.7201 20.11 15.8001 19.92 15.8001Z"
        />
      </svg> -->
    </div>
    <div class="collapse" :class="{ opened: opened }">
      <div class="collapse-wrapper">
        <div class="collapse-wrapper-padding">
          <div class="box">
            <ul>
              <Item v-for="city in item.cities" :city="city" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";
import Item from "./item.vue";
import { TCountry } from "./data";
const props = defineProps<{
  title: string;
  defOpened?: boolean;
  item: TCountry;
}>();

const opened = ref(props.defOpened || false);
</script>

<style lang="scss" scoped>
@import "src/scss/_variables.scss";

.country {
  top: 0px;
  padding-top: 20px;
  z-index: 2;
  position: sticky;
  display: grid;
  //   justify-content: space-between;
  background: none;
  text-align: left;
  margin-bottom: 6px;
  margin: 0 -24px 8px;
  background: $gray;
  &-wrapper {
    background: white;
    padding: 12px 24px;
  }
  svg {
    transform: rotate(180deg);
  }

  &.opened svg {
    transform: rotate(0deg);
  }

  p {
    font-size: 14px;
  }
  &-heading {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
  }
}

.titles {
  display: grid;
  grid-template-columns: 320px 240px 1fr;
  gap: 32px;
  margin-top: 12px;
  p {
    font-size: 14px;
    color: $d-gray;
  }
}
.box {
  display: flex;
  gap: 20px;

  ul {
    width: 100%;
  }
}
.wrapper {
  position: relative;
}
.grey {
  color: $d-gray;
}
.collapse {
  display: grid;
  //   grid-template-rows: 0fr;
  gap: 32px;
  transition: 0.4s ease-out;
  &.opened {
    transition: 0.4s ease-in;
    grid-template-rows: 1fr;
  }
}
// .collapse-wrapper-padding {
//   padding: 0 24px 24px;
// }
.collapse-wrapper {
  //   overflow: hidden;
}
</style>
