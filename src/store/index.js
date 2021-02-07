import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/plugins/axios'
import {uniqBy} from 'lodash'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        collections: [] = Array.from({length: process.env.COLLECTIONS_PER_PAGE}, Object),
        collection: {},
        photos: [] = Array.from({length: process.env.PHOTOS_PER_PAGE}, Object),
        photo: {},
        loadings: {
            photos: true
        },
        randomImage: {},
        user: {},
        search: {
            results: [],
            input: '',
            meta: {
                total_pages: 0,
                page: 0
            }
        },
        errors: {
            photos: ''
        }
    },
    getters: {},
    mutations: {
        setErrorState(state,{code,key}) {
            state.errors[key] = code
        },
        updateSearchInput(state, payload) {
            state.search.meta.page = 0
            state.search.input = payload
        },
        setCollections(state, payload) {
            state.collections = payload
        },
        setCollection(state, payload) {
            state.collection = payload
        },
        setPhotos(state, {data, loadMore}) {
            if (loadMore) {
                state.photos = uniqBy([...state.photos, ...data], 'id')
            } else {
                state.photos = data

            }
            state.loadings.photos = false
        },
        setSearchResults(state, {results, total_pages, loadMore}) {
            if (loadMore) {
                state.search.results = uniqBy([...state.search.results, ...results], 'id')
            } else {
                state.search.results = results
            }
            state.search.meta.total_pages = total_pages
            state.search.meta.page++
        },
        setPhoto(state, payload) {
            state.photo = payload
        },
        setUser(state, payload) {
            state.user = payload
        },
        updateRandomImage(state, payload) {
            state.randomImage = payload
        },

    },
    actions: {
        getUser: async ({commit}, {username}) => {
            await axios.get(`users/${username}`)
                .then(response => {
                    const {data} = response
                    commit('setUser', data)
                }).catch(error => {
                    const {response: {data: {errors}}} = error
                    commit('setErrorState',{code: errors[0],key: 'user'})
                })
        },
        getCollections: async ({commit}, {page = 1} = {}) => {
            await axios.get('collections', {
                params: {
                    per_page: process.env.COLLECTIONS_PER_PAGE,
                    page
                }
            })
                .then(response => {
                    const {data} = response
                    commit('setCollections', data)
                }).catch(error => {
                    const {response: {data: {errors}}} = error
                    commit('setErrorState',{code: errors[0],key: 'collections'})
                })
        },
        getCollection: async ({commit}, {page = 1, id} = {}) => {
            await axios.get(`collections/${id}`, {
                params: {
                    per_page: process.env.COLLECTIONS_PER_PAGE,
                    page
                }
            })
                .then(response => {
                    const {data} = response
                    commit('setCollection', data)
                }).catch(error => {
                    const {response: {data: {errors}}} = error
                    commit('setErrorState',{code: errors[0],key: 'collection'})
                })
        },
        getPhotos: async ({commit}, {page = 1, loadMore = false} = {}) => {
            await axios.get('photos', {
                params: {
                    per_page: process.env.PHOTOS_PER_PAGE,
                    page
                }
            }).then(response => {
                const {data} = response
                commit('setPhotos', {data, loadMore})
            }).catch(error => {
                const {response: {data: {errors}}} = error
                commit('setErrorState',{code: errors[0],key: 'photos'})
            })
        },
        getPhoto: async ({commit}, {id}) => {
            await axios.get(`photos/${id}`)
                .then(response => {
                    const {data} = response
                    commit('setPhoto', data)
                }).catch(error => {
                    const {response: {data: {errors}}} = error
                    commit('setErrorState',{code: errors[0],key: 'photo'})
                })
        },
        searchPhotos: async ({commit}, {query, page = 1, loadMore = false, cancelToken} = {}) => {
            await axios.get('/search/photos', {
                params: {
                    per_page: process.env.PHOTOS_PER_PAGE,
                    page,
                    query
                },
                cancelToken
            }).then(response => {
                const {data: {results, total_pages}} = response
                commit('setSearchResults', {results, total_pages, loadMore})
            }).catch(error => {
                const {response: {data: {errors}}} = error
                commit('setErrorState',{code: errors[0],key: 'searchPhoto'})
            })
        }
    },
});
