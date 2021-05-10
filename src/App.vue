<template>
  <div id="app">
    <div v-if="fetchFinished">
      <form>
        <div v-for="category in categories" :key="category.id">
          <div v-show="(existingCategories.includes(category.id.toString()))" @click="resetQuery">
            <input type="radio" :id="category.id" :value="category.id" v-model="selectedCategory"/>
            <label :for="category.id">{{category.name}}</label>
          </div>
        </div>
      </form>
      <input type="text" id="searchField" :value="searchQuery" @keypress.enter="search" placeholder="Search News"/>
      <button type="button" @click="search">Search</button>
      <p>Currently showing {{ filteredNewsBySearch.length }} articles</p>
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
    axios.get("https://www.alpha-orbital.com/last-100-news.json")
    .then((response) => {
      console.log(response.data)
      this.fetchFinished = true
      this.newsList = response.data
    }).catch((response) => {
      console.log(response)
    })
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
    }
  },
  components:{
    NewsPiece
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

html{
  background-image: url("assets/background_image.jpg");
  background-attachment: fixed;
}

div{
  color:white;
}

[class*="col-"] {
  width: 100%;
}

@media only screen and (min-width: 980px) {
  /* For tablets: */
  .col-s-1 {width: 8.33%;}
  .col-s-2 {width: 16.66%;}
  .col-s-3 {width: 25%;}
  .col-s-4 {width: 33.33%;}
  .col-s-5 {width: 41.66%;}
  .col-s-6 {width: 50%;}
  .col-s-7 {width: 58.33%;}
  .col-s-8 {width: 66.66%;}
  .col-s-9 {width: 75%;}
  .col-s-10 {width: 83.33%;}
  .col-s-11 {width: 91.66%;}
  .col-s-12 {width: 100%;}
}

@media only screen and (min-width: 1200px) {
  /* For desktop: */
  .col-1 {width: 8.33%;}
  .col-2 {width: 16.66%;}
  .col-3 {width: 25%;}
  .col-4 {width: 33.33%;}
  .col-5 {width: 41.66%;}
  .col-6 {width: 50%;}
  .col-7 {width: 58.33%;}
  .col-8 {width: 66.66%;}
  .col-9 {width: 75%;}
  .col-10 {width: 83.33%;}
  .col-11 {width: 91.66%;}
  .col-12 {width: 100%;}
}
</style>