<template>
    <label for="search">
        <input
            @input="fetchPhotos"
            name="search"
            id="search"
            type="search"
            class="py-3 px-4 bg-gray-100 shadow mb-10 rounded-lg placeholder-gray-400 text-gray-900 appearance-none inline-block w-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search"
        />
    </label>
</template>

<script>
import { debounce } from "lodash";
import { mapActions, mapMutations } from "vuex";
import axios from "@/plugins/axios";

export default {
    name: "SearchComponent",
    data: () => {
        return {
            request: null,
        };
    },
    methods: {
        ...mapMutations(["updateSearchInput"]),
        ...mapActions(["searchPhotos"]),
        fetchPhotos: debounce(function (event) {
            const {
                target: { value },
            } = event;
            this.updateSearchInput(value);
            this.cancelRequest();
            this.searchPhotos({
                query: value,
                cancelToken: this.request.token,
            });
        }, 500),
        cancelRequest() {
            if (this.request) this.request.cancel();
            const axiosSource = axios.CancelToken.source();
            this.request = {
                cancel: axiosSource.cancel,
                token: axiosSource.token,
            };
        },
    },
};
</script>

<style scoped></style>
