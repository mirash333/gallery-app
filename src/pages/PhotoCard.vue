<template>
    <div>
        <template v-if="!loading">
            <banner-component :image="photoCopy" :full-screen="true"></banner-component>
            <div class="container mx-auto absolute author-wrapper">
                <router-link v-if="photoCopy.user" :to="{name: 'UserCard' ,params: {
                        username: photoCopy.user.username  ,
                    user: photoCopy.user
                        }}"
                             class="author shadow-2xl h-10 flex items-center left-2 bottom-5 font-bold absolute z-10 focus:outline-none ring-2 ring-green-500 focus:border-transparent inline-flex transition duration-100 text-sm items-center justify-center px-3 py-2 border border-transparent font-medium rounded-md mx-auto text-gray-700 bg-white hover:text-green-500">
                    <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fill-rule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                              clip-rule="evenodd"/>
                    </svg>
                    {{ photoCopy.user.first_name }} {{ photoCopy.user.last_name }}
                </router-link>
                <button @click="$router.back()"
                             class="back shadow-2xl h-10 flex items-center left-2 top-5 font-bold absolute z-10 focus:outline-none ring-2 ring-green-500 focus:border-transparent inline-flex transition duration-100 text-sm items-center justify-center px-1 py-1 border border-transparent font-medium rounded-md mx-auto text-gray-700 bg-white hover:text-green-500">
                    <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                              clip-rule="evenodd"/>
                    </svg>
                    Back
                </button>
            </div>
        </template>
        <template v-else>
            <skeleton :off-gallery="true" :full-screen="true"></skeleton>
        </template>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {isEmpty} from "lodash";

export default {
    name: "PhotoCard",
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
        ...mapActions(['getPhoto'])
    },
    computed: {
        ...mapState(['photo']),
        photoCopy() {
            return this.$route.params.image || this.photo
        }
    },
    created() {
        if (isEmpty(this.photoCopy)) {
            this.loading = true
            this.getPhoto({id: this.$route.params.id}).then(() => this.loading = false)
        }
    }
}
</script>

<style scoped lang="scss">
.author-wrapper {
    left: 50%;
    transform: translateX(-50%);
    top: 72px;
    height: calc(100% - 72px);
}

::v-deep .banner {
    img {
        object-fit: contain;
    }
}
</style>
