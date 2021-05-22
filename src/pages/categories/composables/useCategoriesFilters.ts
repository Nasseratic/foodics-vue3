import { TextField } from "@asigloo/vue-dynamic-forms";
import { ref } from "@vue/reactivity";

export function useCategoriesFilters() {
  const filtersForm = ref({
    id: "categories-filters",
    fields: {
      name: TextField({
        label: "Name",
      }),
      reference: TextField({
        label: "Reference",
      }),
    },
    options: {
      resetAfterSubmit: false,
    },
  });

  const filters = ref({
    name: "",
    reference: "",
  });

  const updateFilters = (newValues: any) => {
    console.log(newValues);

    filters.value = newValues;
  };

  return { filtersForm, filters, updateFilters };
}
