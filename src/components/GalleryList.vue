<template>
    <div v-if="items.length" class="gallery-wrapper">
        <div class="grid grid-cols-4 gap-10 gallery mb-10" ref="grid">
            <template v-for="item in items">
                <gallery-item :key="item.id" :image="item"> </gallery-item>
            </template>
        </div>
        <button
            v-if="
                search.input
                    ? search.meta.page < search.meta.total_pages
                    : items.length && $route.name !== 'CollectionCard'
            "
            @click="loadMoreItems"
            class="focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent inline-flex mb-20 transition duration-100 text-sm items-center justify-center px-3 py-2 border border-transparent font-medium rounded-md mx-auto text-gray-700 bg-white hover:bg-green-50"
        >
            <template v-if="loading">
                <svg
                    class="animate-spin h-5 w-5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    ></circle>
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            </template>
            <template v-else> Show more </template>
        </button>
    </div>
    <div class="mb-10" v-else>
        <p class="text-center">
            {{
                search.input
                    ? errors["searchPhoto"]
                        ? errors["searchPhoto"]
                        : "No photo for the given search"
                    : "No photos"
            }}
        </p>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "GalleryList",
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    data: () => {
        return {
            page: 1,
            loading: false,
        };
    },
    components: {
        GalleryItem: () => import("@/components/GalleryItem"),
    },
    computed: {
        ...mapState(["photos", "search", "errors"]),
    },
    methods: {
        ...mapActions(["getPhotos", "searchPhotos"]),
        loadMoreItems() {
            if (this.search.input) {
                this.loading = true;
                this.searchPhotos({
                    query: this.search.input,
                    page: this.search.meta.page + 1,
                    loadMore: true,
                })
                    .then(() => (this.loading = false))
                    .catch(() => (this.loading = false));
            } else {
                this.page++;
                this.loading = true;
                this.getPhotos({
                    page: this.page,
                    loadMore: true,
                })
                    .then(() => (this.loading = false))
                    .catch(() => (this.loading = false));
            }
        },
    },
};
</script>

<style lang="scss">
.gallery-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    .gallery {
        width: 100%;
    }
}
</style>
