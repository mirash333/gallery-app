<template>
    <div>
        <template v-if="!loading && randomImage">
            <banner-component
                :image="randomImage"
                @getRandomImage="getRandomImage"
                :timer-is-needed="true"
            ></banner-component>
            <search-component></search-component>
            <gallery-list
                :items="search.input ? search.results : photos"
            ></gallery-list>
        </template>
        <skeleton v-else></skeleton>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { isEmpty } from "lodash";

export default {
    name: "Home",
    components: {
        SearchComponent: () => import("@/components/SearchComponent"),
        Skeleton: () => import("@/components/Skeleton"),
        GalleryList: () => import("@/components/GalleryList"),
        BannerComponent: () => import("@/components/BannerComponent"),
    },
    data: () => {
        return {
            randomKey: undefined,
        };
    },
    computed: {
        ...mapState(["photos", "search"]),
        loading: {
            get() {
                return this.$store.state.loadings.photos;
            },
        },
        randomImage: {
            get() {
                return this.$store.state.randomImage;
            },
            set(value) {
                this.$store.commit("updateRandomImage", value);
            },
        },
    },
    watch: {
        photos() {
            this.getRandomImage();
        },
    },
    methods: {
        ...mapMutations(["updateSearchInput"]),
        ...mapActions(["getCollections"]),
        getRandomImage() {
            if (!this.photos.length) return;
            const key = Math.floor(Math.random() * this.photos.length);
            this.randomImage = this.photos[key];
        },
    },
    mounted() {
        if (isEmpty(this.randomImage)) {
            this.getRandomImage();
        }
    },
    beforeRouteLeave(to, from, next) {
        this.updateSearchInput("");
        next();
    },
};
</script>

<style scoped></style>
