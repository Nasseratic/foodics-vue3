import { TextField } from "@asigloo/vue-dynamic-forms";
import { ref } from "@vue/reactivity";

export const useCustomersFilters = () =>
  ref({
    id: "customers-filters",
    fields: {
      phone: TextField({
        label: "Phone",
      }),
      email: TextField({
        label: "Email",
      }),
    },
    options: {
      resetAfterSubmit: false,
    },
  });
