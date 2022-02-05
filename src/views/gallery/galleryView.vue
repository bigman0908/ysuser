<template>
  <!-- 비주얼 영역 -->
  <div class="visual-sub vs-bg04">
    <dl class="vs-copy">
      <dt><a href="/exam"><i class="uil uil-angle-left-b"></i></a></dt>
      <dd>갤러리</dd>
      <dt><a href="/qna"><i class="uil uil-angle-right-b"></i></a></dt>
    </dl>
  </div>

  <!-- 비주얼 영역 끝 -->
  <div class="content">
    <!-- 타이틀 -->
    <div class="title-area">
      <p><span></span></p>
      <h2>연세간호학원 갤러리</h2>
    </div>
    <!-- 타이틀 끝 -->

    <!-- 상세 -->
    <div class="board-view">
      <h2><span ref="gotoRef">[Gallery]</span> {{gallery.SUBJECT}}</h2>
      <h3>
        <i class="uil uil-calendar-alt"></i> {{gallery.REG_DT}}
        &nbsp; &nbsp;
        <i class="uil uil-eye"></i> {{gallery.VIEW_CNT}}
      </h3>
      <div>
        <ckeditor :editor="editor" @ready="onReady" v-model="editorData" ></ckeditor>
      </div>
      <p>
        <a href="/gallery" class="btn-dark">목록</a>
      </p>
    </div>
    <!-- 상세 끝 -->


    <!-- 리스트 -->
    <div class="gallery-list">
      <ul v-if="pageList.length > 0">        
        <li :key="i" v-for="(gallery,i) in pageList" @click="goView(gallery.BOARD_SEQ);">
          <p>
            <img :src="`/download/images/${gallery.FILE_NM}`"  style="width:100%" alt="" title="" />
          </p>
          <div>
            <dl>
              <dt><i class="uil uil-calendar-alt"></i>{{gallery.REG_DT}}</dt>
              <!-- <dd><span>시험</span></dd> -->
              <!-- em -- News -->
               <dd><em>Gallery</em></dd>
            </dl>
            <h2>{{gallery.SUBJECT}}</h2>
          </div>
        </li>        
      </ul>
    </div>
    <!-- 리스트 끝 -->
    <!-- 페이징처리 -->
    <PageComponent :totalCount="this.galleryList.length" :pageSize=9 @paging-list="listPagingSet"/>

  </div>
</template>

<script>
import PageComponent from '../../components/Pagination'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
    components: {PageComponent},

    data() {
        return {
          gallery: {
            SUBJECT: "",
            CONTENTS: "",
            REG_ID: "",
            MOD_ID : "",
            GUBUN : 2,
            FILE_NM : "",
            VIEW_CNT : 0
          },
          gallery_seq : this.$route.params.gallery_seq,
          galleryList: [],
          pageList: [],
          editor: ClassicEditor,
          editorData: ''

        };
    },
    created() {
      this.goViewUpdate();
    },    
    mounted() {
      this.getInfo();
      this.goList(); 
    },
    methods: {
        onReady( editor )  {
          const toolbarElement = editor.ui.view.toolbar.element;
          toolbarElement.style.display = 'none';
          editor.isReadOnly = true;
        },
        async goViewUpdate() {
          this.$api("/api/galleryViewUpdate",{param:[this.gallery_seq]});
        },
        async goList() {
            try{
                this.galleryList = await this.$api("/api/galleryList",{});
                console.log("this.galleryList=="+this.galleryList.length);
            }catch(e){
                console.log("error=="+e)
            }            
        },
        async getInfo() {
          let galleryInfo = await this.$api("/api/galleryInfo",{param:[this.gallery_seq]});
          if(galleryInfo.length > 0) {
            this.gallery = galleryInfo[0];
            this.editorData = this.gallery.CONTENTS;
          }
        },
        async goView(gallery_seq) {
          this.gallery_seq = gallery_seq
          this.goViewUpdate();
          let galleryInfo = await this.$api("/api/galleryInfo",{param:[this.gallery_seq]});
          if(galleryInfo.length > 0) {
            this.gallery = galleryInfo[0];
            this.editorData = this.gallery.CONTENTS;
          }
          //const scrollMaxY = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          window.scrollTo({top:100, behavior:'smooth'});
        },
        
        listPagingSet(data){
          this.pageList=this.galleryList.slice(data[0], data[1]);
          console.log("this.pageList=="+this.pageList.length);
        }
    }
}
</script>