<template>
  <div class="m-4">
    <router-link
      class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4"
      to="/categories"
    >
      Back to Table View
    </router-link>
    <Spinner v-if="isLoading" />
    <div v-else-if="lists" class="grid grid-rows-2 grid-flow-col gap-2">
      <div v-for="(list, i) of lists" :key="i" class="row-span-2">
        <draggable
          class="list-group"
          :list="list"
          group="people"
          itemKey="name"
          @change="onChange"
        >
          <template #item="{ element }">
            <div
              class="list-group-item border w-full app border-gray-300 p-2 my-2 focus:outline-none ring-blue-200"
            >
              {{ element.name }}
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import chunk from "lodash.chunk";
import { defineComponent, ref, watch } from "vue";
import {
  useAll,
  useEditMenuDisplay,
  useMenuDisplay,
} from "./composables/useCategories";
import draggable from "vuedraggable/src/vuedraggable";
import { Spinner } from "../../components";
import { useFetch } from "../../composables/useFetch";
import { useMutation } from "../../composables/useMutation";

export default defineComponent({
  components: {
    draggable,
    Spinner,
  },
  setup() {
    const { isLoading, loadedData: categories } = useAll();

    const { menuDisplay, isMenuDisplayLoading } = useMenuDisplay();
    const { exec } = useEditMenuDisplay();
    const lists = ref([]);

    watch([categories, menuDisplay], ([cats, sortRef]: [any, any]) => {
      if (cats && sortRef) {
        const sortMap = sortRef.data.categories.reduce(
          (p: any, c: any, i: any) => ({ ...p, [c.category_id]: i }),
          {}
        );
        lists.value = chunk(
          cats.sort((a: any, b: any) => sortMap[a.id] - sortMap[b.id]),
          10
        );
      }
    });

    const onChange = () => {
      const list = lists.value.reduce((p, c) => [...p, ...c], []);
      lists.value = chunk(list, 10);
      exec({
        categories: list.map((e: any) => ({
          category_id: e.id,
        })),
      });
    };

    return {
      isLoading,
      categories,
      lists,
      onChange,
    };
  },
});
</script>
