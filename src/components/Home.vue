<template>
  <h2 class="text-3xl font-semibold text-gray-800">Hi, Nice to meet you.</h2>
</template>

<script lang="ts">
import { ref, defineComponent, Ref } from 'vue';
import {useFetch} from '../composables/useFetch';

export default defineComponent({
  setup(){

    useFetch({url:"/customers"});
    
  }
})
</script>

<style scoped>

</style>
