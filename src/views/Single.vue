<template>
    <b-container fluid class="px-0">
        <div class="single">
            <!-- <Header 
                :title="displayArticle[0].title"
                :date="displayArticle[0].publishedAt"
                :img="displayArticle[0].urlToImage"
                /> -->
            <Header 
                :title="title"
                :date="date"
                :img="img"
                />
            <b-container class="pt-0">
                <b-row>
                    <b-col cols="8">
                       <!-- <ArticleContent 
                        :content="displayArticle[0].content"
                       /> -->
                        <ArticleContent 
                            :content="content"
                       />
                       <Banner2 />
                       <AboutAuthor />
                       <Comments />
                    </b-col>
                    <b-col cols="4">
                        <Aside />
                        <AsideBanners />
                        <Banner />
                        
                        <b-container>
                            <b-row>
                             
                            </b-row>
                        </b-container> 
                        
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </b-container>
</template>

<script>
import Aside from '@/components/Aside.vue'
import Header from '@/components/single/Header.vue'
import ArticleContent from '@/components/single/ArticleContent.vue'
import Banner2 from '@/components/Banner2.vue'
import AboutAuthor from '@/components/single/AboutAuthor.vue'
import Banner from '@/components/single/Banner.vue'
import AsideBanners from '@/components/AsideBanners.vue'
import Comments from '@/components/single/Comments.vue'

export default {
    name: 'Single',
    props: ['id', 'title', 'date', 'img', 'content'],
    data: () => ({
        author: []
    }),
    components: {
        Aside,
        Header,
        ArticleContent,
        Banner2,
        AboutAuthor,
        Banner,
        AsideBanners,
        Comments
    },
}
</script>

<style lang="sass" scoped>
    .single
        background-color: #eeeeee

</style>
