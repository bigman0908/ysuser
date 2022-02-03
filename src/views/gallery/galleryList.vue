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

export default {
    components: {PageComponent},

    data() {
        return {
          galleryList: [],
          pageList: []
        };
    },
    created() {
        this.goList(); 
    },    
    methods: {
        async goList() {
            try{
                this.galleryList = await this.$api("/api/galleryList",{});
                console.log("this.galleryList=="+this.galleryList.length);
            }catch(e){
                console.log("error=="+e)
            }            
        },
        goView(gallery_seq) {
            this.$router.push({path:'/galleryView', query:{gallery_seq:gallery_seq}}); 
        },
        
        listPagingSet(data){
          this.pageList=this.galleryList.slice(data[0], data[1]);
          console.log("this.pageList=="+this.pageList.length);
        }
    }
}
</script>