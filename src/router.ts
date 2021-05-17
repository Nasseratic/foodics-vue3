import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import { Home } from "./components";
import { Customers, CustomerView } from "./pages/customers";

const routes: RouteRecordRaw[] = [
  {
    path: "",
    component: Home,
  },
  {
    path: "/customers",
    component: Customers,
  },
  {
    path: "/customers/:id",
    component: CustomerView,
  },
];

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});
