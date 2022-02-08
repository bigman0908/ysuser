<template>
  <!-- 비주얼 영역 -->
  <div class="visual-sub vs-bg05">
    <dl class="vs-copy">
      <dt><a href="/qna"><i class="uil uil-angle-left-b"></i></a></dt>
      <dd>공지사항</dd>
      <dt><a href="/"><i class="uil uil-angle-right-b"></i></a></dt>
    </dl>
  </div>
  <!-- 비주얼 영역 끝 -->
  <div class="content">  
    <!-- 타이틀 -->
    <div class="title-area">
      <p><span></span></p>
      <h2>연세간호학원 공지사항</h2>
    </div>
    <!-- 타이틀 끝 -->


    <!-- 상세 -->
    <div class="board-view">
      <h2><span>[News]</span> {{notice.SUBJECT}}</h2>
      <h3>
        <i class="uil uil-calendar-alt"></i> {{notice.REG_DT}}
        &nbsp; &nbsp;
        <i class="uil uil-eye"></i> {{notice.VIEW_CNT}}
      </h3>
      <h4 v-show="!$isEmpty(upFileNm)">
        <a :href="`/download/files/${this.upFileNm}`" target="_blank"><img src="../../assets/fileIcn/default.gif" alt="" title=""  v-show="upFileNm!=''"/> {{upFileNm}}</a>
      </h4>
      <div>
        <ckeditor :editor="editor" @ready="onReady" v-model="editorData" ></ckeditor>
      </div>
      <p>
        <a href="/notice" class="btn-dark">목록</a>        
      </p>
    </div>
    <!-- 상세 끝 -->
    
    <!-- 리스트 -->
    <div class="board-list">
      <div v-show="noticeList.length > 0">
        <ul :key="i" v-for="(notice,i) in pageList" @click="goView(notice.BOARD_SEQ)">
          <li>{{notice.ROWNUM}}</li>          
          <li>{{notice.SUBJECT}}</li>
          <li>{{notice.REG_NM}}</li>
          <li>{{notice.REG_DT}}</li>
          <li>{{notice.VIEW_CNT}}</li>
        </ul>        
      </div>
      <div v-show="noticeList.length==0" class="board-list-no">
        <p><i class="uil uil-sync-exclamation"></i></p>
        <h2>목록이 없습니다.</h2>
      </div>
    </div>
    <!-- 리스트 끝 -->
    <!-- 페이징처리 -->
    <PageComponent :totalCount="this.noticeList.length" :pageSize=10 @paging-list="listPagingSet"/>
  </div>
</template>

<script>
import PageComponent from '../../components/Pagination'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
    components: {PageComponent},
    data() {
        return {
          notice: {
            SUBJECT: "",
            CONTENTS: "",
            FILE_NM: "",
            REG_ID: "",
            MOD_ID : ""
          },
          notice_seq : this.$route.params.notice_seq,
          noticeList: [],
          pageList: [],
          upFileNm : "",
          editor: ClassicEditor,
          editorData: ''

        };
    },
    created() {
      this.goViewUpdate();
    },
    mounted() {
      this.getNoticeInfo();      
      this.goList(); 
    },    
    methods: { 
      onReady( editor )  {
        const toolbarElement = editor.ui.view.toolbar.element;
        toolbarElement.style.display = 'none';
        editor.isReadOnly = true;
      },
      async goViewUpdate() {
        this.$api("/api/noticeViewUpdate",{param:[this.notice_seq]});
      }, 
      async getNoticeInfo() {        
        let noticeInfo = await this.$api("/api/noticeInfo",{param:[this.notice_seq]});
        console.log("noticeInfo[0]=="+JSON.stringify(noticeInfo[0]));      
        if(noticeInfo.length > 0) {
          this.notice = noticeInfo[0];
          this.upFileNm = this.notice.FILE_NM;
          if(!this.$isEmpty(this.notice.FILE_NM)){
            this.fileChk=true;
          }          
          this.editorData=this.notice.CONTENTS;
        }else{
          this.$swal("잘못된 접근입니다.", this.$router.push({name:'notice', params:{}})) 
        }
      },
      async goList() {
        try{
            this.noticeList = await this.$api("/api/noticeList",{});
            console.log("this.noticeList=="+this.noticeList.length);
        }catch(e){
            console.log("error=="+e)
        }            
      },       
      goView(notice_seq) {
        this.notice_seq = notice_seq
        this.goViewUpdate();
        this.getNoticeInfo();
        //const scrollMaxY = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        window.scrollTo({top:100, behavior:'smooth'});
      },    
      listPagingSet(data){
        this.pageList=this.noticeList.slice(data[0], data[1]);
        console.log("this.pageList=="+this.pageList.length);
      }
    }
}
</script>