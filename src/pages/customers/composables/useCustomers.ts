import { ref, Ref } from "@vue/reactivity";
import { useFetch } from "../../../composables/useFetch";
import { useMutation } from "../../../composables/useMutation";
import { URL_PREFIX } from "../constants/urlPrefix";

export const useCustomersList = (page: Ref<number> = ref(1)) =>
  useFetch<{ data: Customer[]; meta: any }>({
    url: `${URL_PREFIX}?page=${page.value}`,
  });

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
