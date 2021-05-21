<template>
    <div v-if="newsList" class="col-s-12">
      <div class="s-fixed inline-bl">
        <div class="m-auto cats">
          <form class="m-auto inline-bl">
            <div class="fl-left">
              <input class="catSelect" type="radio" id="All" value="All" v-model="selectedCategory" checked/>
              <label for="All">All</label>
            </div>
            <div class="fl-left" v-for="category in existingCategories" :key="category.id">
                <input class="catSelect" type="radio" :id="category.id" :value="category.id" v-model="selectedCategory"/>
                <label :for="category.id">{{category.name}}</label>
            </div>
          </form>
        </div>
        <div class="flex m-auto">
          <input class="flex-one" type="text" id="searchField" v-model="searchQuery" placeholder="...search article title or excerpt..."/>
          <button type="button">Search</button>
        </div>
        <p>Currently showing {{ filteredNewsBySearch.length }} articles</p>
      </div>
      <NewsPiece v-for="news in filteredNewsBySearch" :news="news" :key="news.slug"/>
    </div>
    <div v-else>Fetching News</div>
</template>

<script>
import NewsPiece from '@/components/NewsPiece.vue'
import axios from 'axios'
import uniq from 'lodash/uniq'

export default{
  data(){
    return{
      newsList: null,
      categories:{
        1: 'X Universe',
        2: 'Elite: Dangerous',
        3: 'Starpoint Gemini',
        4: 'Eve Online'
      },
      selectedCategory: 'All',
      searchQuery: ''
    }
  },
  created(){
    this.fetchNews()
  },
  computed:{
    existingCategories(){
      const uniqueCategories = uniq(this.newsList.map(({post_category_id}) => post_category_id))
      return uniqueCategories.map(categoryID => {
        return {name: this.categories[categoryID], id: categoryID}
      })
    },
    filteredNewsByCategory(){
      if(this.selectedCategory === 'All'){
        return this.newsList;
      }else{
        return this.newsList.filter(news => news.post_category_id === this.selectedCategory)
      }
    },
    filteredNewsBySearch(){
      if(this.searchQuery.length > 2){
        const searchQueryLower = this.searchQuery.toLowerCase();
        return this.filteredNewsByCategory.filter(news => {
          return (news.title.toLowerCase().includes(searchQueryLower) ||
          news.excerpt.toLowerCase().includes(searchQueryLower))
        })
      }else{
        return this.filteredNewsByCategory
      }
    }
  },
  methods:{
    fetchNews(){
      axios.get("https://www.alpha-orbital.com/last-100-news.json")
      .then(({data}) => {
        console.log(data)
        this.newsList = data
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