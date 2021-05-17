<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
  name: "App",
});
</script>

<style lang="sass">
@import '@asigloo/vue-dynamic-forms/dist/themes/default.scss'

.form-group
  text-align: left
</style>
