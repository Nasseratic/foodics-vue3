<template>
  <div>
    <vue-final-modal v-model="showModal">
      <div
        class="h-screen w-full flex flex-col items-center justify-center bg-teal-lightest font-sans"
      >
        <div class="h-screen w-full absolute flex items-center justify-center bg-modal">
          <div
            class="bg-white rounded shadow p-8 m-4 max-w-xs max-h-full text-center overflow-y-scroll"
          >
            <dynamic-form :form="form" @submitted="formSubmitted" />
            <button
              :disabled="isLoading"
              submit="true"
              :form="form.id"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
            >{{ isLoading ? "Loading..." : "Submit" }}</button>
            <button @click="close">Close</button>
          </div>
        </div>
      </div>
    </vue-final-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from "vue";

import {
  useCategoryForm
} from "../composables/useCategoryForm";
import { useCreate, useUpdate, } from "../composables/useCategories";
import { useRoute } from "vue-router";

export default defineComponent({
  props: {
    showModal: Boolean,
    close: {
      type: Function,
      required: true
    }
  },
  setup({ close }) {
    const route = useRoute();

    const { exec: addUser, isLoading } = useCreate();
    const { exec: updateUser, isLoading: isLoadingUpdate } = useUpdate(route.params.id as string);

    const form = useCategoryForm();

    async function formSubmitted(values: any) {
      if (route.params.id)
        await updateUser(values)
      else
        await addUser(values);
      close();
    }

    return {
      form,
      isLoading: route.params.id ? isLoadingUpdate : isLoading,
      formSubmitted
    };
  },
});
</script>
