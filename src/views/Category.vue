<template>

    <b-container fluid class="px-0">
        <div class="category">
            <Carousel :lang="lang" :updateData="updateData"/>
            <b-container>
                <b-row>
                    <b-col cols="8">
                        <CategoryNews 
                            :link="link" 
                            :name="name" 
                            :key="this.$route.fullPath" 
                            :lang="lang"
                            :updateData="updateData"
                        />
                        <Banner2 />
                    </b-col>
                    <b-col cols="4">
                        <Aside />
                        <AsideBanners />
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </b-container>

</template>

<script>
import Carousel from '@/components/Carousel.vue'
import CategoryNews from '@/components/category/CategoryNews.vue'
import Banner2 from '@/components/Banner2.vue'
import AsideBanners from '@/components/AsideBanners.vue'
import Aside from '@/components/Aside.vue'

export default {
    props: ['link', 'name', 'lang', 'updateData'],
    name: 'Category',
    components: {
        Carousel,
        CategoryNews,
        Banner2,
        AsideBanners,
        Aside
    },
}
</script>

<style lang="sass" scoped>
    .category
        background-color: #eeeeee

</style>