import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { app } from "../main";
import { HttpClient } from "../utils/http";

type MUTATION_METHODS = "post" | "put" | "delete";
export function useMutation<BodyType>(props: {
  url: string;
  method: MUTATION_METHODS;
}) {
  const url = ref(props.url);

  const response = ref(null);
  const isLoading = ref(false);

  const exec = async (body?: BodyType) => {
    response.value = null;
    isLoading.value = true;

    try {
      const { data } = await HttpClient[props.method](
        url.value,
        ...(body ? [body] : [])
      );

      response.value = data;
      isLoading.value = false;

      return response.value;
    } catch (error) {
      isLoading.value = false;
    }
  };

  return {
    exec,
    response,
    isLoading,
  };
}
