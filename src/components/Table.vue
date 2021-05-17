<template>
    <div class="min-h-screen flex items-center px-4">
        <div class="overflow-x-auto w-full">
            <!-- Table -->
            <table
                class="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden"
                v-if="!isLoading && loadedData"
            >
                <thead class="bg-gray-50">
                    <tr class="text-gray-600 text-left">
                        <th
                            class="font-semibold text-sm uppercase px-6 py-4"
                            v-for="key of tableHead "
                        >{{ key.replace(/_/g, " ") }}</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="row of loadedData">
                        <td class="px-6 py-4" v-for="key of tableHead">
                            <router-link :to="'/customers/' + row.id">
                                <p class>{{ row[key] }}</p>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Spinner v-else-if="isLoading" />
            <div v-if="!isLoading">
                <nav
                    class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                >
                    <a
                        href="#"
                        aria-current="page"
                        class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        v-for=" page of Array.from({length: meta?.last_page ?? 1}, (_, i) => i + 1)"
                        @click.prevent="onPageChange(page)"
                    >{{ page }}</a>
                </nav>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { Spinner } from "./index"

export default defineComponent({
    components: {
        Spinner
    },
    props: {
        loadedData: Object,
        tableHead: {
            type: Array,
            required: true
        },
        meta: Object,
        isLoading: Boolean,
        onPageChange: {
            type: Function,
            required: true
        }
    }
})

</script>