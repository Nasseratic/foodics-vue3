import {
  computed,
  ComputedRef,
  onMounted,
  Ref,
  ref,
  watch,
} from "@vue/runtime-core";
import { useFetch } from "../useFetch";
import { useMutation } from "../useMutation";

export function createCrudComposables<T>(pathPrefix: string) {
  const getFiltersString = (filters: {}) =>
    Object.entries(filters)
      .map(([key, value]) => (value ? `&filter[${key}]=${value}` : ""))
      .join("");

  const useList = (page: Ref<number>, filters?: Ref<{}>) => {
    const url = computed(() =>
      encodeURI(
        `${pathPrefix}?page=${page.value}${
          filters?.value ? getFiltersString(filters.value) : ""
        }`
      )
    );

    return useFetch<{ data: T[]; meta: any }>(url);
  };

  const useGet = (id: ComputedRef<string | string[]>) => {
    const url = computed(() => `${pathPrefix}/${id.value}`);
    return useFetch<{ data: T; meta: any }>(url);
  };

  const useCreate = () => useMutation<T>({ method: "post", url: pathPrefix });

  const useUpdate = (id: string) =>
    useMutation<T>({ method: "put", url: `${pathPrefix}/${id}` });

  const useDelete = (id: string) =>
    useMutation({ method: "delete", url: `${pathPrefix}/${id}` });

  const useRestore = (id: string) =>
    useMutation<T>({
      method: "put",
      url: `${pathPrefix}/${id}/restore`,
    });

  return {
    useList,
    useGet,
    useCreate,
    useUpdate,
    useDelete,
    useRestore,
  };
}
