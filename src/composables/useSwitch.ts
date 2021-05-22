import { ref } from "@vue/reactivity";

export function useSwitch(onOff?: () => any) {
  const state = ref<boolean>(false);

  const on = () => (state.value = true);

  const off = () => {
    if (onOff) onOff();
    state.value = false;
  };

  const toggle = () => {
    if (state.value) off();
    else on();
  };

  return { state, on, off, toggle };
}
