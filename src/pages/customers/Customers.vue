<template>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-14"
    @click="openAddModal"
  >
    Add
  </button>

  <div class="container mx-auto flex flex-col space-y-8 items-center">
    <dynamic-form :form="filtersForm" @submitted="updateFilters" />
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-14"
      submit="true"
      :form="filtersForm.id"
    >
      Filter
    </button>
  </div>
  <div
    class="container mx-auto h-screen flex flex-col space-y-8 my-8 py-8 items-center"
  >
    <Table
      :loadedData="customers?.data"
      :tableHead="tableHead"
      :meta="customers?.meta"
      :isLoading="isLoading"
      :onPageChange="changePage"
      viewUrlPrefix="/customers"
    />
    <CustomerNewModal :showModal="showAddModal" :close="closeAddModal" />
  </div>
</template>

<script lang="ts">
import { TextField } from "@asigloo/vue-dynamic-forms";
import { defineComponent, ref } from "vue";
import { Table } from "../../components";
import CustomerNewModal from "./components/CustomerNewModal.vue";
import { useList } from "./composables/useCustomers";
import { useCustomersFilters } from "./composables/useCustomersFilter";

export default defineComponent({
  components: {
    CustomerNewModal,
    Table,
  },
  setup() {
    const page = ref<number>(1);
    const filtersForm = useCustomersFilters();

    const filters = ref({
      phone: "",
      email: "",
    });

    const updateFilters = (newValues: any) => {
      filters.value = newValues;
    };

    const { isLoading, loadedData: customers, refetch } = useList(
      page,
      filters
    );

    const changePage = (newPage: number) => (page.value = newPage);

    const showAddModal = ref<boolean>(false);
    const openAddModal = () => (showAddModal.value = true);
    const closeAddModal = () => {
      refetch();
      showAddModal.value = false;
    };
    const tableHead = ["name", "email", "phone", "last_order_at"];
    return {
      openAddModal,
      closeAddModal,
      changePage,
      showAddModal,
      isLoading,
      customers,
      filtersForm,
      filters,
      updateFilters,
      tableHead,
    };
  },
});
</script>
