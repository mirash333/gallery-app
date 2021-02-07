import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/plugins/axios'
import {uniqBy} from 'lodash'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        collections: [] = Array.from({length: process.env.COLLECTIONS_PER_PAGE}, Object),
        photos: [] = Array.from({length: process.env.PHOTOS_PER_PAGE}, Object),
        photo: {}
    },
    getters: {},
    mutations: {
        setCollections(state, payload) {
            state.collections = payload
        },
        setPhotos(state, {data, loadMore}) {
            if (loadMore) {
                state.photos = uniqBy([...state.photos,...data],'id')
            } else {
                state.photos = data

            }
        },
        setPhoto(state, payload) {
            state.photo = payload
        }
    },
    actions: {
        getCollections: async ({commit}, {page = 1} = {}) => {
            const {data} = await axios.get('collections', {
                params: {
                    per_page: process.env.COLLECTIONS_PER_PAGE,
                    page
                }
            })
            commit('setCollections', data)
        },
        getPhotos: async ({commit}, {page = 1, loadMore = false} = {}) => {
            const {data} = await axios.get('photos', {
                params: {
                    per_page: process.env.PHOTOS_PER_PAGE,
                    page
                }
            })
            commit('setPhotos', {data, loadMore})
        },
        getPhoto: async ({commit}, {id}) => {
            const {data} = await axios.get(`photos/${id}`)
            commit('setPhoto', data)
        }
    },
});
