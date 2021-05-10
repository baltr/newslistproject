<template>
    <div>
        <img :src="'https://www.alpha-orbital.com/assets/images/post_img/' + news.post_image"/>
        <div>
            <h4>{{ news.title }}</h4>
            <p>{{ formattedDate }}</p>
            <span v-html="news.excerpt"/>
            <a :href="'https://www.alpha-orbital.com/news/' + news.slug">Full article</a>
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

<style>
img{
    max-width: 400px;
}
</style>