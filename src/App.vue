<template>
  	<div id="app">
		<Appbar />
		<Navbar :lang="lang" :updateLang="updateLang"/>
		<Banner />

    	<router-view :updateData="updateData" :lang="lang"/>
		<Footer :recentlyViewed="recentlyViewedList" :lang="lang"/>
  	</div>
</template>

<script>
import Appbar from '@/components/Appbar'
import Navbar from '@/components/Navbar'
import Banner from '@/components/Banner'
import Footer from '@/components/Footer'

export default {
	data: () => ({
		recentlyViewedList: [],
		lang: "0"
	}),
	components: {
		Appbar,
		Navbar,
		Banner,
		Footer
	},
	methods: {
		updateData(payload) {
			this.recentlyViewedList = [...this.recentlyViewedList, payload]
		},
		updateLang(lang) {
			this.lang = lang
		}
	}
}
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
  	-webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
  	text-align: center;
  	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
    	font-weight: bold;
    	color: #2c3e50;

    	&.router-link-exact-active {
      	color: #42b983;
    	}
  	}
}
</style>
