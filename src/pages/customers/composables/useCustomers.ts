import { ref, Ref } from "@vue/reactivity";
import { computed, onMounted, watch } from "@vue/runtime-core";
import { useFetch } from "../../../composables/useFetch";
import { useMutation } from "../../../composables/useMutation";
import { URL_PREFIX } from "../constants/urlPrefix";

const getFiltersString = (filters: {}) =>
  Object.entries(filters)
    .map(([key, value]) => (value ? `&filter[${key}]=${value}` : ""))
    .join();

export const useCustomersList = (
  page: Ref<number> = ref(1),
  filters?: Ref<{}>
) => {
  const url = ref("");

  const calcUrl = () => {
    url.value = encodeURI(
      `${URL_PREFIX}?page=${page.value}${
        filters?.value ? getFiltersString(filters.value) : ""
      }`
    );
  };

  onMounted(calcUrl);
  watch([filters, page], calcUrl);
  return useFetch<{ data: Customer[]; meta: any }>(url);
};

export const useCustomer = (id: string) =>
  useFetch<{ data: Customer; meta: any }>({ url: `${URL_PREFIX}/${id}` });

export const useCustomerAdd = () =>
  useMutation<Customer>({ method: "post", url: URL_PREFIX });

export const useCustomerUpdate = (id: string) =>
  useMutation<Customer>({ method: "put", url: `${URL_PREFIX}/${id}` });

export const useCustomerDelete = (id: string) =>
  useMutation({ method: "delete", url: `${URL_PREFIX}/${id}` });

export const useCustomerRestore = (id: string) =>
  useMutation<Customer>({ method: "put", url: `${URL_PREFIX}/${id}/restore` });
