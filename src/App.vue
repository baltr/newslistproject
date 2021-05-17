<template>
  <div id="app" class="m-auto col-s-10">
    <div class="col-s-12" v-if="fetchFinished">
      <div class="s-fixed inline-bl">
        <div class="m-auto cats">
          <form class="m-auto inline-bl">
            <div class="fl-left" v-for="category in categories" :key="category.id">
              <div v-show="(existingCategories.includes(category.id.toString()))" @click="resetQuery">
                <input class="catSelect" type="radio" :id="category.id" :value="category.id" v-model="selectedCategory"/>
                <label :for="category.id">{{category.name}}</label>
              </div>
            </div>
          </form>
        </div>
        <div class="flex m-auto">
          <input class="flex-one" type="text" id="searchField" :value="searchQuery" @keypress.enter="search" placeholder="...search article title or excerpt..."/>
          <button type="button" @click="search">Search</button>
        </div>
        <p>Currently showing {{ filteredNewsBySearch.length }} articles</p>
      </div>
      <NewsPiece v-for="news in filteredNewsBySearch" :news="news" :key="news.slug"/>
    </div>
  </div>
</template>

<script>
import NewsPiece from '@/components/NewsPiece.vue'
import axios from 'axios'
import uniq from 'lodash/uniq'

export default{
  data(){
    return{
      fetchFinished: false,
      newsList: [],
      categories:[
        {id: 1, name: 'X Universe'},
        {id: 2, name: 'Elite: Dangerous'},
        {id: 3, name: 'Starpoint Gemini'},
        {id: 4, name: 'Eve Online'}
      ],
      selectedCategory: null,
      searchQuery: ''
    }
  },
  created(){
    this.fetchNews()
  },
  computed:{
    existingCategories(){
      return uniq(this.newsList.map(({post_category_id}) => post_category_id))
    },
    filteredNewsByCategory(){
      if(this.selectedCategory){
        return this.newsList.filter((news) => {
          return news.post_category_id == this.selectedCategory
        })
      }else{
        return this.newsList;
      }
    },
    filteredNewsBySearch(){
      if(this.searchQuery.length){
        return this.filteredNewsByCategory.filter((news) => {
          return (news.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          news.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase()))
        })
      }else{
        return this.filteredNewsByCategory
      }
    }
  },
  methods:{
    search(){
      this.searchQuery = document.getElementById('searchField').value
    },
    resetQuery(){
      this.searchQuery=''
    },
    fetchNews(){
      axios.get("https://www.alpha-orbital.com/last-100-news.json")
      .then((response) => {
        console.log(response.data)
        this.fetchFinished = true
        this.newsList = response.data
      }).catch((response) => {
        console.log(response)
      })
    }
  },
  components:{
    NewsPiece
  }
}
</script>

<style lang="scss">
  @import "./assets/styles/main.scss"
</style>