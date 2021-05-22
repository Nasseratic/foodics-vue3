<template>
  <Spinner v-if="isLoading" />
  <template v-else>
    <div>
      <nav
        class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <button
          aria-current="page"
          v-for="page of pages"
          :key="page"
          :disabled="cuurentPage == page"
          class="`bg-indigo-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium mx-2"
          @click.prevent="onPageChange(page)"
        >
          {{ page }}
        </button>
      </nav>
    </div>
    <div class="overflow-y-visible w-full">
      <!-- Table -->
      <table
        class="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden"
        v-if="!isLoading && loadedData"
      >
        <thead class="bg-gray-50">
          <tr class="text-gray-600 text-left">
            <th
              class="font-semibold text-sm uppercase px-6 py-4"
              v-for="key of tableHead"
              :key="key"
            >
              {{ key.replace(/_/g, " ") }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="row of loadedData" :key="row">
            <td class="px-6 py-4" v-for="key of tableHead" :key="key">
              <router-link :to="viewUrlPrefix + '/' + row.id">
                <p class>{{ row[key] }}</p>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
</template>
  
<script lang="ts">
import { computed, defineComponent, PropType } from "@vue/runtime-core";
import { Spinner } from "./index";

export default defineComponent({
  components: {
    Spinner,
  },
  props: {
    loadedData: Object,
    viewUrlPrefix: String,
    tableHead: {
      type: Array as PropType<string[]>,
      required: true,
    },
    meta: Object,
    isLoading: Boolean,
    cuurentPage: Number,
    onPageChange: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const pages = computed(() =>
      Array.from({ length: props.meta?.last_page ?? 1 }, (_, i) => i + 1)
    );
    return { pages };
  },
});
</script>

<style scoped>
button:disabled {
  opacity: 0.6;
}
</style>