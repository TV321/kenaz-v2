<template>
    <b-container fluid class="px-0">
        <div id="navbar">
            <b-container class="py-0">
                <b-navbar toggleable="md" class="p-0 d-flex">
                    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                    <b-collapse id="nav-collapse" is-nav>
                        <b-navbar-nav>
                            <b-nav-item 
                                :to="{ name: 'Category', params: {link: item.link, name: item.name}}" 
                                v-for="(item, index) in list" 
                                :key="index"
                                >{{ item.name }}
                            </b-nav-item>
                        </b-navbar-nav>
                    </b-collapse>

                    <select @change="onChange"> 
                        <option value="0">en</option>
                        <option value="1">de</option>
                    </select>
                </b-navbar>
            </b-container>
        </div>
    </b-container>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['lang', 'updateLang'],
    data: () => ({
        links: [
            [
                {name: 'news', link: 'general'},
                {name: 'sport', link: 'sport'},
                {name: 'business', link: 'business'},
                {name: 'tech', link: 'technology'},
                {name: 'travel', link: 'health'},
                {name: 'life', link: 'science'},
            ],
            [
                {name: 'nachrichten', link: 'general'},
                {name: 'sport', link: 'sport'},
                {name: 'geschäft', link: 'business'},
                {name: 'technik', link: 'technology'},
                {name: 'reise', link: 'health'},
                {name: 'leben', link: 'science'},
            ]
        ],
    }),
    computed: {
        list() {
            return this.links[+this.lang]
        }

    },
    methods: {
        onChange(e) {
            if(this.$route.path !== '/') {
                this.$router.push({name: 'Home'})
            }
            this.updateLang(e.target.value)
        }
    }
}
</script>

<style lang="sass" scoped>
    #navbar
        background-color: #4d4382

    .navbar
        height: 50px
        background-color: #4d4382

    #nav-collapse > ul > li:nth-child(1) > a
        border-bottom: 3px solid #3677b5
    #nav-collapse > ul > li:nth-child(2) > a
        border-bottom: 3px solid #84c14f
    #nav-collapse > ul > li:nth-child(3) > a
        border-bottom: 3px solid #ee6151
    #nav-collapse > ul > li:nth-child(4) > a
        border-bottom: 3px solid #fcc44d
    #nav-collapse > ul > li:nth-child(5) > a
        border-bottom: 3px solid #a99765
    #nav-collapse > ul > li:nth-child(6) > a
        border-bottom: 3px solid #5dcff3

    #nav-collapse > ul > li
        > a
            text-transform: uppercase
            font-family: Bitter
            font-weight: 600
            font-size: 1.2em
            color: #ffffff
            padding: 14px
            line-height: 1
            box-sizing: border-box
            height: 50px
            transition: all .2s linear
            &:hover
                background-color: #299ec3
                border-bottom: 0               
            // &.router-link-exact-active
            &.router-link-active
                background-color: #299ec3
                border-bottom: 0
    @media all and (max-width: 768px) 
        .navbar-nav
            background-color: #303030
            position: relative
            z-index: 30
        #navbar > div > nav > button
            margin: 5px 0
            border-radius: 0
    select
        border: none
        outline: none
</style>