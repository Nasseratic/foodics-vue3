<template>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4"
    @click="openModal"
  >
    Add
  </button>
  <router-link
    class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 m-4"
    to="/categories-sort"
  >
    Sort
  </router-link>

  <CategoryModalNew :showModal="isModalOpen" :close="closeModal" />

  <div class="container mx-auto flex flex-col space-y-8 items-center">
    <dynamic-form :form="filtersForm" @submitted="updateFilters" />
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4"
      :form="filtersForm.id"
    >
      Filter
    </button>
  </div>
  <div
    class="container mx-auto h-screen flex flex-col space-y-8 my-8 py-8 items-center"
  >
    <Table
      :loadedData="categories?.data"
      :tableHead="tableHead"
      :meta="categories?.meta"
      :isLoading="isLoading"
      :cuurentPage="page"
      :onPageChange="changePage"
      viewUrlPrefix="/categories"
    />
  </div>
</template>

<script lang="ts">
import chunk from "lodash.chunk";
import { computed, defineComponent, ref, watch } from "vue";
import { Table } from "../../components";
import { useSwitch } from "../../composables/useSwitch";
import CategoryModalNew from "./components/CategoryModalNew.vue";
import { useList } from "./composables/useCategories";
import { useCategoriesFilters } from "./composables/useCategoriesFilters";

export default defineComponent({
  components: {
    CategoryModalNew,
    Table,
  },
  setup() {
    const page = ref<number>(1);
    const changePage = (newPage: number) => {
      page.value = newPage;
    };

    const { filtersForm, filters, updateFilters } = useCategoriesFilters();

    const { isLoading, loadedData: categories, refetch } = useList(
      page,
      filters
    );

    const { state: isModalOpen, on: openModal, off: closeModal } = useSwitch(
      refetch
    );

    const tableHead = ["name", "reference"];

    return {
      changePage,
      page,
      isModalOpen,
      openModal,
      closeModal,
      isLoading,
      categories,
      filtersForm,
      filters,
      updateFilters,
      tableHead,
    };
  },
});
</script>
