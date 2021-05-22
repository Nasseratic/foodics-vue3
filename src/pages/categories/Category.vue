<template>
  <Spinner v-if="isLoading" />
  <div v-else class="max-w-sm overflow-hidden shadow-lg">
    <img
      :style="{ opacity: isDeleted ? 0.5 : 1 }"
      class="w-full"
      src="https://v1.tailwindcss.com/img/card-top.jpg"
      alt="Sunset in the mountains"
    />
    <div :style="{ opacity: isDeleted ? 0.5 : 1 }" class="px-6 py-4">
      <div class="font-bold text-xl mb-2">
        {{ loadedData?.data.name }} {{ isDeleted ? "(DELETED)" : "" }}
      </div>
      <p class="text-gray-700 text-base">{{ loadedData?.data.name }}</p>
      <p class="text-gray-700 text-base">{{ loadedData?.data.reference }}</p>
    </div>
    <div :style="{ opacity: isDeleted ? 0.5 : 1 }" class="px-6 pt-4 pb-2"></div>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4"
      @click="openEditModal"
    >
      Edit
    </button>
    <button
      @click="isDeleted ? restoreUser() : deleteUser()"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4"
    >
      {{ isDeleted ? "Restore" : "Delete" }}
    </button>
    <CategoryModalNew :showModal="showEditModal" :close="closeEditModal" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useGet, useDelete, useRestore } from "./composables/useCategories";
import { Spinner } from "../../components";
import CategoryModalNew from "./components/CategoryModalNew.vue";

export default defineComponent({
  components: {
    Spinner,
    CategoryModalNew,
  },
  setup() {
    const route = useRoute();

    const id = computed(() => route.params.id);

    const { loadedData, isLoading: isLoadingData, refetch } = useGet(id);

    const { isLoading: isLoadingDelete, ...del } = useDelete(id);
    const { isLoading: isLoadingRestore, ...restore } = useRestore(id);

    const deleteUser = async () => {
      await del.exec();
      refetch();
    };
    const restoreUser = async () => {
      await restore.exec();
      refetch();
    };

    const isDeleted = computed(() => loadedData.value?.data.deleted_at);
    const isLoading = computed(
      () =>
        isLoadingData.value || isLoadingDelete.value || isLoadingRestore.value
    );

    const showEditModal = ref<boolean>(false);
    const openEditModal = () => (showEditModal.value = true);
    const closeEditModal = () => {
      refetch();
      showEditModal.value = false;
    };

    return {
      isDeleted,
      deleteUser,
      restoreUser,
      showEditModal,
      openEditModal,
      closeEditModal,
      isLoading,
      loadedData,
      del,
    };
  },
});
</script>
