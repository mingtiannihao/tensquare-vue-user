<template>
<div>
      <!--两列布局-->
    <div class="wrapper tag-item">
        <div class="fl left-list">
            <div class="tc-data-list">
    <div class="tc-list" v-infinite-scroll="loadMore" >
        
            <ul class="detail-list">
                
                    <li v-for="(item,index) in items" :key="index" class="qa-item">
                        <div class="fl record">
                            <div class="number">
                                <div class="border useful">
                                    <p class="usenum" @click="thumbup(index)">
                                        <a href="#" class="zan">
                                            <i :class="'fa fa-thumbs-up '+item.zan" aria-hidden="true"></i>
                                        </a>
                                    </p>
                                    <p class="zannum">
                                        {{item.thumbup}}
                                    </p>
                                </div>
                                <div class="border answer" >
                                    <a href="#" class="star"><i class="fa fa-star-o" aria-hidden="true"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="info">
                            <p class="text">                                    
                                <a :href="'/spit/item/'+item.id" target="_blank"> 
                                {{item.content}}          
                                </a>
                            </p>
                            
                            <div class="other">
                                <div class="fl date">
                                    <span>{{item.publishtime}}</span>
                                </div>
                                <div class="fr remark">
                                    <a href="#"  class="share"><i class="fa fa-share-alt" aria-hidden="true"></i> 分享</a>
                                    <a href="#" @click="openReply(index)" class="comment"><i class="fa fa-commenting" aria-hidden="true"></i> 回复</a>
                                </div>
                            </div>
                        </div>

                        <div class="clearfix"></div>
                    </li>
            </ul>

        </div>
</div>
        </div>
        <div class="fl right-tag">
            <div class="block-btn">
                <p>来个匿名吐槽，发泄一下你心中的怒火吧！</p>
                <a class="sui-btn btn-block btn-share" href="./spit/submit" target="_blank">发吐槽</a>
            </div>
        </div>
        <div class="clearfix"></div>

        <el-dialog
            title="回复"
            :visible.sync="replyDialogVisible"
            width="40%"  >
            <span>{{pojo.content}}</span>            
             <div class="quill-editor" 
                :content="content"
                v-quill:myQuillEditor="editorOption">
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="replyDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doReply">确 定</el-button>
            </span>
            </el-dialog>



    </div>
</div>

</template>
<script>
import '~/assets/css/page-sj-spit-index.css'
import spitApi from '@/api/spit'
import { getUser} from '@/utils/auth'
export default {
//   fetch ({ store, params }) {
//       store.commit("active","spit")
//   },
  asyncData({params, error}) {
    return spitApi.page(1, 10).then(res => {
        let tmp = res.data.data.rows.map(item => {        
        return {
          ...item,
          zan: ''
        }
      })
      return {items: tmp}
    })
  },
  data() {
      return {
        replyDialogVisible: false,
        pojo:{},
        content: '说点什么呢？',
        // editorOption: {
        //   // some quill options
        //   modules: {
        //     toolbar: [
        //       [{ 'size': ['small', false, 'large'] }],
        //       ['bold', 'italic'],
        //       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        //       ['link', 'image']
        //     ]
        //   }
        // },
        pageNo: 1
      }
  },
  methods: {
    thumbup: function(index) {
        if(getUser().name===undefined){
            this.$message({
                message:'必须登录才能点赞',
                type:'warning'
            })
        }
        if(this.items[index].zan === 'color'){
            return 
        }
        //点赞
        this.items[index].zan = 'color'
        spitApi.thumbup(this.items[index].id).then(res => {
            if (res.data.flag) {
                this.items[index].thumbup++
            }
        })
    },
    openReply : function(index) { //弹出回复窗口
        this.replyDialogVisible = true
        this.pojo=this.items[index]
    },
    doReply() {//提交回复
        spitApi.submit(this.content,this.pojo.id).then( res =>{
            if(res.data.flag){
                this.$message({
                    message: '提交成功',
                    type: 'success'
                });
                this.replyDialogVisible = false //关闭窗口
            }else{
                this.$message({
                    message: '提交出错',
                    type: 'error'
                });
            }
        })
    },
    loadMore: function() {
        this.pageNo ++
        spitApi.page(this.pageNo, 10).then(res => {
            // let tmp = res.data.data.map(item => {
            //     return {
            //         ...item,
            //         zan: ''
            //     }
            // })
            this.items = this.items.concat(res.data.data.rows )
        })
    }
  },
    head: {
        script: [
            { src: 'https://cdn.bootcss.com/social-share.js/1.0.16/js/social-share.min.js' }
        ],
        link: [
            { rel: 'stylesheet', href: 'https://cdn.bootcss.com/social-share.js/1.0.16/css/share.min.css' }
        ]
   }
}
</script>

