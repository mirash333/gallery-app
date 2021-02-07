<template>
    <div>
        <template v-if="!loading">
            <banner-component :image="collectionCopy.cover_photo"></banner-component>
            <gallery-list :items="collectionCopy.preview_photos"></gallery-list>
        </template>
        <template v-else>
            <skeleton :off-gallery="true"></skeleton>
        </template>
    </div>
</template>

<script>


import {mapActions, mapState} from "vuex";
import {isEmpty} from "lodash";

export default {
    name: "CollectionCard",
    components: {
        Skeleton: () => import("@/components/Skeleton"),
        GalleryList: () => import("@/components/GalleryList"),
        BannerComponent: () => import("@/components/BannerComponent")
    },
    data: () => {
        return {
            loading: false
        }
    },
    methods: {
        ...mapActions(['getCollection'])
    },
    computed: {
        ...mapState(['collection']),
        collectionCopy() {
            return this.$route.params.collection || this.collection
        }
    },
    created() {
        if (isEmpty(this.collectionCopy)) {
            this.loading = true
            this.getCollection({id: this.$route.params.id}).then(() => this.loading = false)
        }
    }
}
</script>

<style scoped>

</style>
