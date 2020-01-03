<template>
  <div class="wrapper release-tc"> 
   <div class="release-box"> 
    <h3>发布吐槽</h3> 
    <div class="editor"> 
     <div class="quill-editor" 
         :content="content"
         @change="onEditorChange($event)"
         @blur="onEditorBlur($event)"
         @focus="onEditorFocus($event)"
         @ready="onEditorReady($event)"
         v-quill:myQuillEditor="editorOption">
     </div>

     <div class="btns"> 
      <button class="sui-btn btn-danger btn-release" @click="save">发布</button> 
     </div> 
     <div class="clearfix"></div> 
    </div> 
   </div> 
   <div class="clearfix"></div> 
  </div> 

</template>
<script>
import '~/assets/css/page-sj-spit-submit.css'
import spitApi from '@/api/spit'
import {quillRedefine} from 'vue-quill-editor-upload'

export default {
    data () {
      return {
        content: '',
        editorOption: { }
      }
    },
    created(){
      this.editorOption=quillRedefine({
        uploadConfig:{
          action: 'http://localhost:3000/upload',
          res: (response) =>{
            return response.info
          },
          name: 'img'  //图片上传参数 
        }
      })
    },
    mounted() {
      console.log('app init, my quill insrance object is:', this.myQuillEditor)
      /*setTimeout(() => {
        this.content = 'i am changed'
      }, 3000)*/
    },
    methods: {
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.content = html
      },
      save(){
          spitApi.save({ content:this.content }  ).then(res=>{
              this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
              if(res.data.flag){
                  this.$router.push('/spit')
              }
          })
      }
    }
}
</script>
<style>

.quill-editor {
      min-height: 200px;
      max-height: 400px;
      overflow-y: auto;
    }

</style>
