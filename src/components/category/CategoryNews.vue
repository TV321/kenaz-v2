<template>
<b-container class="px-0 pt-0">
    <div id="category-wrapper">
        <div class="category-title text-left">
            <h2>{{ name }}</h2>
        </div>
        <b-container id="loaders" v-if="isLoading">
            <b-row>
                <b-col cols="2" class="mx-auto">
                    <div  class="d-flex justify-content-around">
                        <b-spinner type="grow" small label="Loading..."></b-spinner>
                        <b-spinner type="grow" small label="Loading..."></b-spinner>
                        <b-spinner type="grow" small label="Loading..."></b-spinner>
                    </div>
                </b-col>
            </b-row>
        </b-container>

        <div class="category-card text-left" v-for="(item, index) in displayList" :key="index" v-else>
            <h2>{{ item.title }}</h2>
            <b-container>
                <b-row class="news-date">
                    <b-col cols="auto" class="pl-0">
                        <b-img src="../../assets/bubble1.png"></b-img>
                        <p class="d-inline-block">{{ item.publishedAt | date }}</p>
                    </b-col>
                    <b-col cols="auto">
                        <b-img src="../../assets/bubble1.png"></b-img>
                        <p class="d-inline-block">Author: {{ item.author }}</p>
                    </b-col>
                    <b-col cols="auto">
                        <b-img src="../../assets/bubble1.png"></b-img>
                        <p class="d-inline-block">12 Comments</p>
                    </b-col>
                </b-row>
                <b-row class="news-text">
                    <b-col cols="4" class="pl-0">
                        <b-img fluid :src="item.urlToImage"></b-img>
                    </b-col>
                    <b-col cols="8">
                        <p>
                            {{ item.description }}
                        </p>
						<router-link 
                            class="article-button"
                            @click.native="updateData(item)"
							:to="{ name: 'Single', params: { title: item.title, date: item.publishedAt, img: item.urlToImage, content: item.content }}"
                            
							tag="button">
							{{ buttonText[+lang]}}
						</router-link>
                    </b-col>
                </b-row>
            </b-container>
        </div>

        <div id="paginator">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    hide-goto-end-buttons
                    hide-ellipsis
                    limit="10"
                ></b-pagination>
        </div>
    </div>
</b-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
    name: 'CategoryNews',
    props: ['name', 'link','lang', 'updateData'],
    data: () => ({
        apiKey: 'a86595eef9344f5690b5c41082f424d4',
        news: [],
        queryStringInput: '',
        dummyList: [],
        currentPage: 1,
        perPage: 1,
        isLoading: false,
        buttonText: ['Read article', 'Artikel lesen']

    }),
    computed: {
        country() {
            if(this.lang === '0') {
                return 'us'
            } else {
                return 'de'
            }
        },
        query() {
            if(this.$route.query.queryString) {
                return `category=${ this.link }&pageSize=30&country=${ this.country }&apiKey=${ this.apiKey }&q=${this.$route.query.queryString}`
            } else {
                return `category=${ this.link }&pageSize=30&country=${ this.country }&apiKey=${ this.apiKey }`
            }
        },
        chunkedList() {
            if(this.news.length) {
                let arr = [...this.news]
                let chunked = []
                while(arr.length > 0) {
                    chunked.push(arr.splice(0, 6))
                }
                return chunked
            }
        },
        rows() {
            if(this.news.length) {
                return this.chunkedList.length
            }
        },
        displayList() {
            if(this.news.length) {
                let displayList = []
                displayList = [...this.chunkedList[this.currentPage - 1]]
                return displayList
            }
        },
    },
    methods: {
        async fetchNews() {
            try {
                this.isLoading = true
                const url = `https://newsapi.org/v2/top-headlines?`
                const q = this.query
                const fetch = await axios.get(url + q)
                this.news = fetch.data.articles
            } catch(err) {
                console.log(err)
            } finally {
                this.isLoading = false
            }

        },
    },
    filters: {
        date(value){
			const timestamp = new Date(value).getTime()
			const date = moment(timestamp).format('MMMM DD, YYYY')
            return date
        },
	},
    watch: {
        name() {
            this.currentPage = 1
            this.fetchNews()
        },
    },
    mounted() {
        this.fetchNews()
    }
}
</script>

<style lang="sass" scoped>
    .category-title, .category-card, #paginator
        background-color: #ffffff
        padding: 15px 30px
        font-family: Bitter
        color: #363f48
        h2
            font-weight: 600
            margin: 0
            font-size: 1.5em
    .category-title
        padding-top: 30px
        h2
            text-transform: capitalize
    .category-card
        border-bottom: 1px solid #dddddd
        .news-date
            font-family: 'Varela Round'
            font-size: .7em
            p
                color: #666666
        .news-text
            p
                font-size: .9em
                vertical-align: text-bottom
            .article-button
                border: 0
                padding: 5px 20px
                font-family: 'Varela Round'
                color: #ffffff
                background-color: #4d4382
                transition: all .3s linear
                &:hover
                    background-color: lighten(#4d4382, 10%)
    #paginator
        padding: 30px
    #loaders
        background-color: #ffffff
    #loaders > div > div > div > span.spinner-grow.spinner-grow-sm
        color: #4d4382
</style>

<style lang="sass">
    #paginator
        button
            margin: 2px
            padding: 7px 12px
            font-family: 'Varela Round'
            &:focus
                outline: none
                box-shadow: none
        ul
            margin: 0
    #paginator > ul > li:last-child > button,
    #paginator > ul > li:last-child.page-item.disabled,
    #paginator > ul > li:nth-child(1) > button,
    #paginator > ul > li:nth-child(1).page-item.disabled
        display: none

    .page-item.active .page-link
        color: #ffffff
        background-color: #4d4382
        border: 0
    .page-link
        border: 0
        color: #4d4382
        background-color: #dddddd
        &:hover
            color: #ffffff
            background-color: #4d4382

</style>