import { computed, ref, Ref } from "@vue/runtime-core";
import { HttpClient } from "../utils/http";

export const useFetchAll = <T>(path: string) => {
  const loadedData = ref<T[] | null>(null);
  const isLoading = ref(false);

  const firstPage = encodeURI(`${path}?page=1`);

  const fetch = async (url: string) => {
    isLoading.value = true;

    const { data } = await HttpClient.get(url);

    loadedData.value = [...(loadedData.value ?? []), ...data.data];

    if (data.meta.last_page == data.meta.current_page) {
      isLoading.value = false;
    } else await fetch(encodeURI(`${path}?page=${data.meta.current_page + 1}`));
  };

  fetch(firstPage);
  return {
    isLoading,
    loadedData,
  };
};
