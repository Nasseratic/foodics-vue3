import { ComputedRef, Ref, ref, toRef } from "@vue/reactivity";
import { onMounted, watch, watchEffect } from "@vue/runtime-core";
import { HttpClient } from "../utils/http";

export function useFetch<T>(url: string | Ref<string>) {
  const isLoading = ref(false);
  const loadedData = ref<T | null>(null);

  const fetch = async () => {
    loadedData.value = null;
    isLoading.value = true;

    const { data } = await HttpClient.get(url.value ?? url);

    loadedData.value = data;
    isLoading.value = false;
  };

  onMounted(fetch);
  watch([url], fetch);

  return {
    loadedData,
    isLoading,
    refetch: fetch,
  };
}
