<template>
    <header class="header bg-gray-50 shadow mb-10 px-8">
        <div class="header__container flex container mx-auto justify-between ">
            <router-link to="/" class="header__logo flex duration-200 flex-grow items-center hover:text-green-500">
                <svg class="duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#374151">
                    <path fill-rule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clip-rule="evenodd"/>
                </svg>
                <p class="font-bold lg:hidden xl:block">Gallery App</p>
            </router-link>
            <nav class="header__links flex flex-grow items-center justify-end">
                <template v-if="!loading && !errors['collections']">
                    <template v-for="collection in collections">
                        <div class="ml-3 inline-flex rounded-md shadow">
                            <router-link :to="{name: 'CollectionCard', params: {
                                collection: collection,
                                id: collection.id
                            }}" :key="collection.id"
                                         class="inline-flex  transition duration-100 text-sm items-center justify-center px-3 py-2 font-medium rounded-md text-gray-700 bg-white hover:bg-green-50 "
                                :class="{'border-b-2 border-green-500': $route.params.id === collection.id}"
                            >
                                {{ collection.title }}
                            </router-link>
                        </div>
                    </template>
                </template>
                <template v-else-if="errors['collections']">
                    <p class="font-bold text-center">{{errors['collections']}}</p>
                </template>
                <template v-else>
                    <template v-for="(collection,index) in collections">
                        <div class="ml-3 inline-flex rounded-md shadow" :key="index">
                            <div
                                class="inline-flex transition duration-100 text-sm items-center justify-center px-3 py-2 border border-transparent font-medium rounded-md text-gray-700 bg-white hover:bg-green-50">
                                <span class="h-5 bg-gray-200 animate-pulse rounded w-24"></span>
                            </div>
                        </div>
                    </template>
                </template>
            </nav>
        </div>
    </header>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
    name: "HeaderComponent",
    computed: {
        ...mapState(['collections','errors'])
    },
    data: () => {
        return {
            loading: true
        }
    },
    methods: {
        ...mapActions(['getCollections'])
    },
    created() {
        this.getCollections().then(() => this.loading = false)
    }
}
</script>

<style scoped lang="scss">
.header {
    height: 72px;

    &__container {
        height: 100%;

        .header__logo {
            height: 100%;
            max-width: 200px;

            &:hover {
                svg {
                    fill: rgba(16, 185, 129, 1);

                }
            }

            svg {
                max-width: 60px;
                margin-right: 10px;
            }
        }

        .header__links {
            a.router-link-active {

            }
        }
    }
}
</style>
