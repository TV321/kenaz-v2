<template>
	<b-container fluid class="px-0"> 
  		<div class="home">
			<Carousel :lang="lang" :updateData="updateData"/>
			
			<b-container>
				<b-row>
					<b-col cols="8">
						<News :fetchNews="fetchNews" :dateFilter="dateFilter" :lang="lang"/>
						<Sport :fetchNews="fetchNews" :dateFilter="dateFilter" :lang="lang"/>
						<Banner2 />
						<Business :fetchNews="fetchNews" :dateFilter="dateFilter" :lang="lang"/>
						<Banner2 />
					</b-col>
					<b-col cols="4">
						<Aside />
						<AsideBanners />
					</b-col>
				</b-row>
	
				<b-row>
					<b-col cols="12" md="8">
						<b-row>
							<NewsCarousel />
						</b-row>
					</b-col>
				</b-row>
				<b-row>
					<b-col cols="8" lg="4">
						<b-row>
							<UsaNews />
						</b-row>
					</b-col>
					<b-col cols="8" lg="4">
						<b-row>
							<LocalNews />
						</b-row>
					</b-col>
				</b-row>
		
				<Banner3 />
				<CarouselBottom />

			</b-container>
  		</div>
	</b-container>
</template>

<script>

import Carousel from '@/components/Carousel.vue'
import News from '@/components/home/News.vue'
import Sport from '@/components/home/Sport.vue'
import Aside from '@/components/Aside.vue'
import Banner2 from '@/components/Banner2.vue'
import AsideBanners from '@/components/AsideBanners.vue'
import Business from '@/components/home/Business.vue'
import NewsCarousel from '@/components/home/NewsCarousel.vue'
import UsaNews from '@/components/home/UsaNews.vue'
import LocalNews from '@/components/home/LocalNews.vue'
import Banner3 from '@/components/Banner3.vue'
import CarouselBottom from '@/components/CarouselBottom'
import axios from 'axios'
import moment from 'moment'

export default {
	name: 'Home',
	props: ['lang', 'updateData'],
	data: () => ({
		news: [],
		apiKey: 'a86595eef9344f5690b5c41082f424d4'
	}),
  	components:	{
		Carousel,
		News,
		Sport,
		Aside,
		Banner2,
		AsideBanners,
		Business,
		NewsCarousel,
		UsaNews,
		LocalNews,
		Banner3,
		CarouselBottom
	  },
	  methods: {
		async fetchNews (category, pageSize, country) {
			const url = `https://newsapi.org/v2/top-headlines?`
			const query = `country=${ country }&pageSize=${ pageSize }&category=${ category }&apiKey=${ this.apiKey }`

			const fetch = await axios.get(url + query)
			return fetch.data.articles
		},
		dateFilter(value){
			const timestamp = new Date(value).getTime()
			const date = moment(timestamp).format('MMMM DD, YYYY')
			return date
		}
	},


}
</script>

<style lang="sass">
	.home
		background-color: #eeeeee


</style>
