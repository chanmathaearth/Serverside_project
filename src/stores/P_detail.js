import { defineStore } from 'pinia'
export const useProductDetailStore = defineStore('user-product', {
    state: () => ({
        list: [
            {
            name: 'ASICS DS LIGHT X-FLY PRO 2 PARIS',
            imageUrl: [
                "https://www.arifootballstore.com/media/catalog/product/cache/6e478a31517304dced53ac4d3f3d5560/a/s/asics_ds_light_x-fly_pro_2_paris_1101a074.750__03.jpg",
                "https://www.arifootballstore.com/media/catalog/product/cache/6e478a31517304dced53ac4d3f3d5560/a/s/asics_ds_light_x-fly_pro_2_paris_1101a074.750__04.jpg",
                "https://www.arifootballstore.com/media/catalog/product/cache/6e478a31517304dced53ac4d3f3d5560/a/s/asics_ds_light_x-fly_pro_2_paris_1101a074.750__05.jpg",
                "https://www.arifootballstore.com/media/catalog/product/cache/6e478a31517304dced53ac4d3f3d5560/a/s/asics_ds_light_x-fly_pro_2_paris_1101a074.750__06.jpg",
                "https://www.arifootballstore.com/media/catalog/product/cache/6e478a31517304dced53ac4d3f3d5560/a/s/asics_ds_light_x-fly_pro_2_paris_1101a074.750__01.jpg",
            ],
            quantity: 10,
            about: 'The DS LIGHT X-FLY™ PRO 2 PARIS cleat is designed for soccer players seeking soccer cleats that work on and off the ball. This shoe helps athletes generate faster acceleration after stopping and transitioning into vertical movements. This colorway is inspired by "the city of lights" and its energizing tones at sunrise and sunset. This shoe features a softer kangaroo leather forefoot. Complemented with an acceleration stud design in the outsole, this shoe also delivers a better grip during straight dashes on the pitch.',
            status: 'open',
            price: 7500,
            },
            {
            name: 'NIKE PHANTOM LUNA II ELITE',
            imageUrl: [
                "https://www.arifootballstore.com/media/catalog/product/cache/6e478a31517304dced53ac4d3f3d5560/a/s/asics_ds_light_x-fly_pro_2_paris_1101a074.750__03.jpg",
                "https://www.arifootballstore.com/media/catalog/product/cache/6e478a31517304dced53ac4d3f3d5560/a/s/asics_ds_light_x-fly_pro_2_paris_1101a074.750__04.jpg",
                "https://www.arifootballstore.com/media/catalog/product/cache/6e478a31517304dced53ac4d3f3d5560/a/s/asics_ds_light_x-fly_pro_2_paris_1101a074.750__05.jpg",
                "https://www.arifootballstore.com/media/catalog/product/cache/6e478a31517304dced53ac4d3f3d5560/a/s/asics_ds_light_x-fly_pro_2_paris_1101a074.750__06.jpg",
                "https://www.arifootballstore.com/media/catalog/product/cache/6e478a31517304dced53ac4d3f3d5560/a/s/asics_ds_light_x-fly_pro_2_paris_1101a074.750__01.jpg",
            ],
            quantity: 10,
            about: 'The DS LIGHT X-FLY™ PRO 2 PARIS cleat is designed for soccer players seeking soccer cleats that work on and off the ball. This shoe helps athletes generate faster acceleration after stopping and transitioning into vertical movements. This colorway is inspired by "the city of lights" and its energizing tones at sunrise and sunset. This shoe features a softer kangaroo leather forefoot. Complemented with an acceleration stud design in the outsole, this shoe also delivers a better grip during straight dashes on the pitch.',
            status: 'open',
            price: 7500,
            },
        ],
        loaded: false
    })
    })