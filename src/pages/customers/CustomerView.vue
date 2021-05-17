<template>
  <Spinner v-if="isLoading" />
  <div v-else class="max-w-sm rounded overflow-hidden shadow-lg">
    <img
      :style="{ opacity: isDeleted ? 0.5 : 1 }"
      class="w-full"
      src="https://v1.tailwindcss.com/img/card-top.jpg"
      alt="Sunset in the mountains"
    />
    <div :style="{ opacity: isDeleted ? 0.5 : 1 }" class="px-6 py-4">
      <div
        class="font-bold text-xl mb-2"
      >{{ loadedData?.data.name }} {{ isDeleted ? "(DELETED)" : "" }}</div>
      <p class="text-gray-700 text-base">{{ loadedData?.data.email }}</p>
      <p class="text-gray-700 text-base">{{ loadedData?.data.phone }}</p>
    </div>
    <div :style="{ opacity: isDeleted ? 0.5 : 1 }" class="px-6 pt-4 pb-2">
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      >Gender: {{ loadedData?.data.gender }}</span>

      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      >Birth Date: {{ loadedData?.data.birth_date ?? "Unknown" }}</span>
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      >Last Order At: {{ loadedData?.data.last_order_at ?? "Unknown" }}</span>
    </div>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
      @click="openEditModal"
    >Edit</button>
    <button
      @click="isDeleted ? restoreUser() : deleteUser()"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
    >{{ isDeleted ? "Restore" : "Delete" }}</button>
    <CustomerNewModal :showModal="showEditModal" :close="closeEditModal" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useCustomer, useCustomerDelete, useCustomerRestore } from "./composables/useCustomers";
import { Spinner } from "../../components";
import CustomerNewModal from "./components/CustomerNewModal.vue";

export default defineComponent({
  components: {
    Spinner,
    CustomerNewModal
  },
  setup() {

    const route = useRoute()
    const { loadedData, isLoading, refetch } = useCustomer(route.params.id as string);

    const del = useCustomerDelete(route.params.id as string);
    const restore = useCustomerRestore(route.params.id as string);
    const deleteUser = async () => {
      await del.exec();
      refetch();
    }
    const restoreUser = async () => {
      await restore.exec();
      refetch();
    }

    const isDeleted = computed(() => loadedData.value?.data.deleted_at)


    const showEditModal = ref<boolean>(false);
    const openEditModal = () => showEditModal.value = true;
    const closeEditModal = () => { refetch(); showEditModal.value = false; }


    return { isDeleted, deleteUser, restoreUser, showEditModal, openEditModal, closeEditModal, isLoading, loadedData, del }
  },
});
</script>
