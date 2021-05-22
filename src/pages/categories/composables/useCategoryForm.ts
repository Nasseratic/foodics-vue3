import {
  DynamicForm,
  NumberField,
  TextField,
} from "@asigloo/vue-dynamic-forms";
import { Ref, ref } from "@vue/reactivity";

export const useCategoryForm = (): Ref<DynamicForm> =>
  ref({
    id: "new-category",
    fields: {
      name: TextField({
        label: "Name",
      }),
      reference: TextField({
        label: "Reference",
      }),
    },
  });
