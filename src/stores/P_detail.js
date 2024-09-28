import { defineStore } from 'pinia'
export const useProductDetailStore = defineStore('user-product', {
    state: () => ({
        list: [
            {
            brand: 'ASICS',
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
            sizeEUR: [40,41.5,42,42.5,43.5],
            sizeUS: [7,8,8.5,9,9.5],
            },
            {
            brand: 'NIKE',
            name: 'NIKE PHANTOM LUNA II ELITE',
            imageUrl: [
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8669710d-9105-47ca-addd-b87f761c4ddd/PHANTOM+LUNA+II+ELITE+FG.png",
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/83faca20-ca4e-4ecd-8795-0f0042098d67/PHANTOM+LUNA+II+ELITE+FG.png",
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/115d33c2-2649-4eaa-9c6f-026ac94c10af/PHANTOM+LUNA+II+ELITE+FG.png",
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/80ae7bd1-398e-471c-91c0-01a60699ce02/PHANTOM+LUNA+II+ELITE+FG.png",
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a2db0ea2-7444-4b9a-a320-4b14852fc667/PHANTOM+LUNA+II+ELITE+FG.png",
            ],
            quantity: 10,
            about: 'The DS LIGHT X-FLY™ PRO 2 PARIS cleat is designed for soccer players seeking soccer cleats that work on and off the ball. This shoe helps athletes generate faster acceleration after stopping and transitioning into vertical movements. This colorway is inspired by "the city of lights" and its energizing tones at sunrise and sunset. This shoe features a softer kangaroo leather forefoot. Complemented with an acceleration stud design in the outsole, this shoe also delivers a better grip during straight dashes on the pitch.',
            status: 'open',
            price: 9600,
            sizeEUR: [40,41.5,42,42.5,43.5],
            sizeUS: [7,8,8.5,9,9.5],
            },
        ],
        loaded: false
    })
    })