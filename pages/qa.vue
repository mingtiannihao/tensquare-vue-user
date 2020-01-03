<template>
    <div>
         <div class="tab-nav "> 
            <div class="wrapper"> 
                <ul class="fl sui-nav nav-tabs navbar-dark"> 
                <router-link tag="li" active-class="active" to="/qa/label/0" exact ><a>首页</a></router-link>
                <router-link tag="li" active-class="active" :to="'/qa/label/'+label.id" v-for="(label,index) in labelList" :key="index"   ><a>{{label.labelname}}</a></router-link>
                </ul> 
                <span class="fr more"><a href="~/assets/qa-allTag.html" target="_blank">更多</a></span> 
                <div class="clearfix"></div> 
            </div> 
          </div> 
        <nuxt-child/>
    </div>
</template>
<script>
import '~/assets/css/page-sj-qa-logined.css'
import labelApi from '@/api/label'
export default {
    asyncData(){
        return labelApi.toplist().then( res=>{
            console.log( JSON.stringify(res.data.data) )
            return {labelList: res.data.data }
        })
    }
}
</script>
