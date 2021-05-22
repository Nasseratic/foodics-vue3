import { ref } from "@vue/reactivity";
import { useFetch } from "../../../composables/useFetch";
import { useFetchAll } from "../../../composables/useFetchAll";
import { useMutation } from "../../../composables/useMutation";
import { createCrudComposables } from "../../../composables/utils/createCrudComposables";
import { URL_PREFIX, URL_PREFIX_MENU_DISPLAY } from "../constants/urlPrefix";

const { useList, useGet, useCreate, useDelete, useRestore, useUpdate } =
  createCrudComposables<Category>(URL_PREFIX);

const useAll = () => useFetchAll(URL_PREFIX);

const useMenuDisplay = () => {
  const { loadedData: menuDisplay, isLoading: isMenuDisplayLoading } = useFetch(
    ref(URL_PREFIX_MENU_DISPLAY)
  );
  return { menuDisplay, isMenuDisplayLoading };
};

const useEditMenuDisplay = () =>
  useMutation({ url: URL_PREFIX_MENU_DISPLAY, method: "put" });

export {
  useGet,
  useList,
  useAll,
  useCreate,
  useUpdate,
  useDelete,
  useRestore,
  useMenuDisplay,
  useEditMenuDisplay,
};
