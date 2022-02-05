<template>
  <!-- 비주얼 영역 -->
  <div class="visual-sub vs-bg05">
    <dl class="vs-copy">
      <dt><a href="../gallery/gallery.html"><i class="uil uil-angle-left-b"></i></a></dt>
      <dd>질문과답변</dd>
      <dt><a href="../main/index.html"><i class="uil uil-angle-right-b"></i></a></dt>
    </dl>
  </div>
  <!-- 비주얼 영역 끝 -->



  <div class="content">

  
    <!-- 타이틀 -->
    <div class="title-area">
      <p><span></span></p>
      <h2>궁금한 사항이 있으면 언제든 질문하세요~</h2>
    </div>
    <!-- 타이틀 끝 -->


    <!-- 상세 -->
    <div class="board-view">
      <h2><span>[QnA]</span> {{qna.SUBJECT}}</h2>
      <h3>
        <i class="uil uil-calendar-alt"></i> {{qna.REG_DT}}
        &nbsp; &nbsp;
        <i class="uil uil-eye"></i> {{qna.VIEW_CNT}}
      </h3>
      <h4 v-show="upFileNm!=''">
        <a :href="`/download/files/${this.upFileNm}`" target="_blank"><img src="../../assets/fileIcn/default.gif" alt="" title=""  v-show="upFileNm!=''"/> {{upFileNm}}</a>
      </h4>
      <div>
        <ckeditor :editor="editor" @ready="onReady" v-model="editorData" ></ckeditor>
      </div>
      <p>
        <a v-show="qna.LVL == 0" href="#" @click="goUpdate" class="btn-purple">수정</a>
        <a href="/qna" class="btn-dark">목록</a>        
      </p>
    </div>
    <!-- 상세 끝 -->
    
    <!-- 리스트 시작-->
    <div class="board-list">
      <div v-show="qnaList.length > 0">
        <ul :key="i" v-for="(qna,i) in pageList" @click="goQnaChk(qna)">
          <li>{{qna.ROWNUM}}</li>          
          <li :class="[qna.LVL == '1' ? 'reply' : '']">
            <i v-show="qna.LVL == '1'" class="uil uil-corner-down-right"></i>
            {{qna.SUBJECT}}
            <i v-show="qna.PUBLIC_YN == 'N'" class="uil uil-padlock"></i>
          </li>
          <li>{{qna.WRITER}}</li>
          <li>{{qna.REG_DT}}</li>
          <li><!-- i class="xi-plus"></i-->
            <span v-show="qna.REPLY_CNT == 1">[답변대기]</span>
            <span v-show="qna.REPLY_CNT == 2 && qna.LVL == 0" style="color:#8950fc;">[답변완료]</span>
            <span v-show="qna.REPLY_CNT == 2 && qna.LVL == 1" style="color:#d60028;">[답변]</span>
          </li>
        </ul>        
      </div>
      <div v-show="qnaList.length==0" class="board-list-no">
        <p><i class="uil uil-sync-exclamation"></i></p>
        <h2>목록이 없습니다.</h2>
      </div>
    </div>
    <!-- 리스트 끝 -->
    <!-- 페이징처리 -->
    <PageComponent :totalCount="this.qnaList.length" :pageSize=10 @paging-list="listPagingSet"/>
  </div>
</template>

<script>
import PageComponent from '../../components/Pagination'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
    components: {PageComponent},
    data() {
        return {
          qna: {
            QNA_SEQ: "",
            PARENT_SEQ : "",
            SUBJECT: "",
            WRITER: "",
            PASSWORD: "",
            PUBLIC_YN: "N",
            CONTENTS: "",
            FILE_NM: "",
            REG_ID: "",
            LVL : 0,
            REPLY_CNT : "",
            VIEW_CNT : ""
          },
          qna_seq : this.$route.params.qna_seq,
          qnaList: [],
          pageList: [],
          upFileNm : "",
          fileData : [],
          fileChk : false,
          editor: ClassicEditor,
          editorData: ''

        };
    },
    created() {
      this.goViewUpdate();
    },
    mounted() {
      this.getQnaInfo();      
      this.goList(); 
    },    
    methods: { 
      onReady( editor )  {
        const toolbarElement = editor.ui.view.toolbar.element;
        toolbarElement.style.display = 'none';
        editor.isReadOnly = true;
      },
      async goViewUpdate() {
        this.$api("/api/qnaViewUpdate",{param:[this.qna_seq]});
      },
 
      async getQnaInfo() {
        let qnaInfo = await this.$api("/api/qnaInfo",{param:[this.qna_seq]});
        console.log("qnaInfo[0]=="+qnaInfo[0]);      
        if(qnaInfo.length > 0) {
          this.qna = qnaInfo[0];
          this.upFileNm = this.qna.FILE_NM;
          if(!this.$isEmpty(this.qna.FILE_NM)){
            this.fileChk=true;
          }          
          this.editorData=this.qna.CONTENTS;
        }else{
          this.$swal("잘못된 접근입니다.", this.$router.push({name:'qnaList', params:{}})) 
        }
      },
      async goList() {
        try{
            this.qnaList = await this.$api("/api/qnaList",{});
            console.log("this.qnaList=="+this.qnaList.length);
        }catch(e){
            console.log("error=="+e)
        }            
      }, 
      goUpdate() {
        this.$router.push({name:'qnaChk', params:{ qna_seq:this.qna.QNA_SEQ, parent_seq:this.qna.PARENT_SEQ, isView:''}}); 
      },
      goQnaChk(qna) {
        let isView =  false;
        //공개이거나 답글이면 바로 뷰페이지로 
        if(qna.PUBLIC_YN == 'Y'){
          isView = true;
        }
        if(isView){
          //this.$router.push({name:'/qnaView', params:{ qna_seq:qna.QNA_SEQ }});
          this.qna_seq = qna.QNA_SEQ
          this.goViewUpdate();
          this.getQnaInfo()
          window.scrollTo({top:100, behavior:'smooth'});
        }else{
          if(qna.REPLY_CNT == 2 && qna.LVL == 1){
            isView = true;
          }
          this.$router.push({name:'qnaChk', params:{ qna_seq:qna.QNA_SEQ, parent_seq:qna.PARENT_SEQ, isView:isView}}); 
        }
      },
      listPagingSet(data){
        this.pageList=this.qnaList.slice(data[0], data[1]);
        console.log("this.pageList=="+this.pageList.length);
      }
    }
}
</script>