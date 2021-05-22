import { NumberField, TextField } from "@asigloo/vue-dynamic-forms";
import { ref } from "@vue/reactivity";

export const useCustomersForm = () =>
  ref({
    id: "basic-demo",
    fields: {
      name: TextField({
        label: "Name",
      }),
      dial_code: NumberField({
        label: "Dial Code",
      }),
      phone: TextField({
        label: "Phone",
      }),
      email: TextField({
        label: "Email",
      }),
    },
  });
