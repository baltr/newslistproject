<template>
    <div class="news col-s-12">
        <img class="s-fl-left" :src="'https://www.alpha-orbital.com/assets/images/post_img/' + news.post_image"/>
        <div class="news-container m-auto s-fl-left">
            <h3>{{ news.title }}</h3>
            <p class="date">{{ formattedDate }}</p>
            <span v-html="news.excerpt"/>
            <a class="s-fl-right" :href="'https://www.alpha-orbital.com/news/' + news.slug">Full article</a>
        </div>
    </div>
</template>

<script>
import { DateTime } from 'luxon'

export default{
    computed:{
        formattedDate(){
            return DateTime.fromSQL(this.news.date).toFormat('dd.MM.yyyy.')
        }
    },
    props:{
        news: {
            required: true,
            type: Object
        }
    }
}
</script>