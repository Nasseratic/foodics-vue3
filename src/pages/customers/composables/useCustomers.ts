import { createCrudComposables } from "../../../composables/utils/createCrudComposables";
import { URL_PREFIX } from "../constants/urlPrefix";

const { useList, useGet, useCreate, useDelete, useRestore, useUpdate } =
  createCrudComposables<Customer>(URL_PREFIX);

export { useGet, useList, useCreate, useUpdate, useDelete, useRestore };
