<template>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-14 rounded"
    @click="openAddModal"
  >Add</button>
  <div class="container mx-auto h-screen flex flex-col space-y-8 my-8 py-8 items-center">
    <Table
      :loadedData="customers?.data"
      :tableHead="tableHead"
      :meta="customers?.meta"
      :isLoading="isLoading"
      :onPageChange="changePage"
    />
    <CustomerNewModal :showModal="showAddModal" :close="closeAddModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Table } from "../../components";
import CustomerNewModal from "./components/CustomerNewModal.vue";
import { useCustomersList } from "./composables/useCustomers";

export default defineComponent({
  components: {
    CustomerNewModal,
    Table
  },
  setup() {
    const page = ref<number>(1);
    const { isLoading, loadedData: customers, refetch } = useCustomersList(page);

    const changePage = (newPage: number) => page.value = newPage;

    const showAddModal = ref<boolean>(false);
    const openAddModal = () => showAddModal.value = true;
    const closeAddModal = () => {
      refetch();
      showAddModal.value = false;
    }
    const tableHead = [
      'name',
      'email',
      'phone',
      'last_order_at'
    ]
    return { openAddModal, closeAddModal, changePage, showAddModal, isLoading, customers, tableHead };
  },
});
</script>
