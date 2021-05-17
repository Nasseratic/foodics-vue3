import { ref } from "@vue/reactivity";
import { onMounted, watch, watchEffect } from "@vue/runtime-core";
import { HttpClient } from "../utils/http";

export function useFetch<T>(props: { url: string }) {
  const url = ref(props.url);

  const isLoading = ref(false);
  const loadedData = ref<T | null>(null);

  const fetch = async () => {
    loadedData.value = null;
    isLoading.value = true;

    const { data } = await HttpClient.get(url.value);

    loadedData.value = data;
    isLoading.value = false;
  };

  onMounted(fetch);
  watch(props, fetch);

  return {
    loadedData,
    isLoading,
    refetch: fetch,
  };
}
