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

<style lang="scss">
.news{
    display:inline-block;
    margin: 5px 0;
    padding: 20px 0;
    background-color:black;
    *{
        text-align:left;
    }
    img{
        margin:0px;
        width:100%;
        max-width: 400px;
    }
    a{
        color: #00aeff;
        text-decoration: none;
    }
    a:visited{
        color:#00aeff
    }
    .date{
        margin-bottom:2px;
        color:gray
    }
}

.news-container{
    position:relative;
    max-width:400px;
}

@media only screen and (min-width: 980px){
    .s-fl-left{
        float:left;
    }
    .s-fl-right{
        float:right;
    }
    .news{
        display:flex;
        height:225px;
        h3{
            margin-top: 0;
        }
        a{
            position: absolute;
            bottom: 0;
            right: 0;
        }
        div{
            margin-right:15px;
            flex-grow:1
        }
    }
    .news-container{
        height:212px;
    }
    img{
        padding: 0 30px;
    }
}
</style>