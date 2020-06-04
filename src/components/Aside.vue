<template>
    <b-container class="pt-0 px-0">
        <div id="aside">
            <div id="header">
                <b-container>
                    <b-row>
                        <b-col cols="12" lg="4">
                            <button 
                                @click="changeDisplay('Popular')"
                                :class="{active: display === 'Popular'}"
                                >Popular
                            </button>
                        </b-col>
                        <b-col cols="12" lg="4" class="pl-lg-0">
                            <button 
                                @click="changeDisplay('TopRated')"
                                :class="{active: display === 'TopRated'}"
                                >Top Rated
                            </button>
                        </b-col>
                        <b-col cols="12" lg="4">
                            <button 
                                @click="changeDisplay('Comments')"
                                :class="{active: display === 'Comments'}"
                                >Comments
                            </button>
                        </b-col>
                    </b-row>
                </b-container>

            </div>
            <router-view></router-view>
            <component :is="display" :fetchNews="fetchNews" :filterDate="filterDate"></component>
            <div id="content">
                <b-row>
                    <b-col></b-col>
                </b-row>
            </div>

        </div>
    </b-container>
</template>

<script>
import Popular from './aside/Popular.vue'
import Comments from './aside/Comments.vue'
import TopRated from './aside/TopRated.vue'

import axios from 'axios'
import moment from 'moment'
export default {
    name: 'Aside',
    components: {
        Popular,
        TopRated,
        Comments
    },
    data: () => ({
        display: 'Popular',
        apiKey: `a86595eef9344f5690b5c41082f424d4`
    }),
    methods: {
        changeDisplay(value) {
            this.display = value
        },
        async fetchNews(sortParam) {
            const url = `https://newsapi.org/v2/everything?`
            const query = `domains=techcrunch.com,thenextweb.com&apiKey=${ this.apiKey }&pageSize=5&sortBy=${ sortParam }`
            const data = await axios.get(url + query)
            return data.data.articles
        },
        filterDate(value) {
            const timestamp = new Date(value).getTime()
			const date = moment(timestamp).format('MMMM DD, YYYY')
			return date
        }
    }
    
}
</script>

<style lang="sass">
    .active
        color: crimson
    #aside
        background-color: #3e3668
        color: #ffffff
        #header
            padding: 10px 8px 10px 0
            overflow: hidden
        #content
            height: 42px
            background-color: #4d4382
        button
            font-family: 'Varela Round', sans-serif
            position: relative
            color: #ffffff
            font-size: .8em
            background-color: inherit
            border: 0
            outline: none
            &.active
                color: #efbb4f
                &::after
                    content: ""
                    position: absolute
                    border-bottom: 1px solid darken(#efbb4f, 30%)
                    top: 18px
                    bottom: 4px
                    left: 2px
                    right: 2px
                    transition: all 300ms linear
                &:hover::after
                    border-bottom: 1px solid #efbb4f

            &:hover
                text-decoration: none
            &::after
                content: ""
                position: absolute
                border-bottom: 1px solid darken(#ffffff, 30%)
                top: 18px
                bottom: 4px
                left: 2px
                right: 2px
                transition: all 300ms linear
            &:hover::after
                border-bottom: 1px solid #ffffff
    @media all and (max-width: 992px) 
        #aside
            button
                &.active
                    &::after
                        left: -100px
                        right: -100px
                &::after
                    left: -100px
                    right: -100px

</style>