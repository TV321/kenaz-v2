<template>
<b-container class="px-0">
    <div id="business">
            <b-row class="mb-3">
                <b-col class="text-left">
                    <h3>{{ langList[+lang].name }}</h3>
                </b-col>
                <b-col class="d-flex align-items-center justify-content-end">
                    <router-link :to="{ name: 'Category', params: {link: langList[+lang].link, name: langList[+lang].name}}">
                        {{ linkText[+lang]}}
                    </router-link>
                </b-col>
            </b-row>

            <b-row>
                <b-col cols="12" lg="6" class="mb-2 pb-3" v-for="(item, index) in news" :key="index">
                    <b-row>
                    <b-col>
                        <b-img :src="item.urlToImage" class="img-fluid"></b-img>
                    </b-col>
                    <b-col class="text-left">
                        <p>{{ dateFilter(item.publishedAt) }}</p>
                        <h4>{{ item.title }}</h4>
                    </b-col>
                    </b-row>
                </b-col>
            </b-row>

            </div>
        </b-container>
    
</template>

<script>
export default {
    name: 'Business',
    props: ['fetchNews', 'dateFilter', 'lang'],
    data: () => ({
        news: [],
        langList: [
            {name: 'business', link: 'business'},
            {name: 'geschäft', link: 'business'}
        ],
        linkText: ['See all', 'Slles sehen']
    }),
    computed: {
        country() {
            if(this.lang === '0') {
                return 'us'
            } else {
                return 'de'
            }
        }
    },
    mounted() {
        this.fetchNews('business', 4, this.country)
            .then(resp => {
                this.news = resp
            })
    },
    watch: {
        country() {
            this.fetchNews('business', 4, this.country)
                .then(resp => {
                    this.news = resp
                })
        }
    },
    methods: {

    },
}
</script>

<style lang="sass">
    .container
        padding-top: 10px
        padding-bottom: 10px
    #business
        background-color: #ffffff
        border-left: 10px solid #ee6151
        box-sizing: border-box
        padding: 25px
        
        h3
            font-family: Bitter
            font-weight: 600
            color: #363f48
            font-size: 1.5em
            text-transform: capitalize
        h4
            font-family: Bitter
            color: #363f48
            font-weight: 600
            font-size: .9em
            height: 70px
            overflow: hidden
            width: 100%
            word-wrap: break-word
        p
            font-family: 'Varela Round', sans-serif
            color: #666666
            font-size: .8em
            margin: 0
        a
            font-family: 'Varela Round', sans-serif
            position: relative
            color: #3677b5
            &:hover
                text-decoration: none
            &::after
                content: ""
                position: absolute
                border-bottom: 1px solid lighten(#3677b5, 30%)
                top: 18px
                bottom: 4px
                left: 2px
                right: 2px
                transition: all 300ms linear
            &:hover::after
                border-bottom: 1px solid #3677b5
    @media all and (max-width: 992px)
        #business
            height: auto
            margin-top: 0
</style>