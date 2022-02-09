<template>
  <!-- 비주얼 영역 -->
  <div class="visual-sub vs-bg05">
    <dl class="vs-copy">
      <dt><a href="/gallery"><i class="uil uil-angle-left-b"></i></a></dt>
      <dd>질문과답변</dd>
      <dt><a href="/notice"><i class="uil uil-angle-right-b"></i></a></dt>
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

    <!-- 등록 -->
    <div class="board-write">
      <dl>
        <dt>제목</dt>
        <dd><input type="text" ref="subject" v-model="qna.SUBJECT" placeholder="" class="w100p" /></dd>
      </dl>
      <dl>
        <dt>작성자</dt>
        <dd><input type="text" ref="writer" v-model="qna.WRITER" placeholder="" class="w100p" /></dd>
      </dl>
      <dl>
        <dt>비밀번호</dt>
        <dd>
          <input type="password" ref="password" v-model="qna.PASSWORD" placeholder="" class="w100p" autocomplete="new-password"/>
        </dd>
      </dl>
      <ul>
        <li>비공개여부</li>
        <li>
          <label class="switch-button">
            <input type="checkbox" role="switch" v-model="qna.PUBLIC_YN" id="flexSwitchCheckChecked" true-value="N" false-value="Y"/>
            <span class="onoff-switch"></span>
          </label>
          <span style="padding:0 10px;" for="flexSwitchCheckChecked" v-show="qna.PUBLIC_YN == 'N' ">비공개 글로 설정되었습니다.</span>
          <span style="padding:0 10px;" for="flexSwitchCheckChecked" v-show="qna.PUBLIC_YN == 'Y' ">선택 시 비공개글로 설정됩니다.</span>
        </li>
      </ul>
      <p>
        <!-- textarea name="" title="" placeholder="" class="w100p h200"></textarea -->
        <ckeditor ref="editorRef" :editor="editor" v-model="editorData" class="w100p h200" :config="editorConfig" ></ckeditor>
      </p>
      <dl>
        <dt>첨부파일</dt>
        <dd>
          <input type="file" v-show="fileChk" ref="file_nm" @change="uploadFile($event.target.files)" style="padding:10px 10px;">
          <a @click="fileChk=true"><i v-show="!fileChk" class="uil uil-plus-square"></i></a>
          <a @click="deleteFile"><i v-show="fileChk" class="uil uil-minus-square-full"></i></a>
          <a style="display:inline-block; padding:10px 10px; margin-right:20px; font-size:18px; line-height:20px; color:#222;" :href="`/download/files/${this.upFileNm}`" target="_blank">
            <img src="../../assets/fileIcn/default.gif" alt="" title="" v-show="upFileNm!=''" />  {{this.upFileNm}}
          </a>
        </dd>
      </dl>
      <!--dl>
        <dt>스팸방지코드</dt>
        <dd>
          <span><img src="../../assets/images/spam_img.jpg" alt="" title="" /></span>
          <input type="text" name="" title="" placeholder="" class="w100p ml10" />
        </dd>
      </dl -->
      <div>
        <a href="#" v-show="$route.name=='qnaRegist'" class="btn-purple w120" @click="qnaInsert">등록</a>
        <a href="#" v-show="$route.name=='qnaUpdate'" class="btn-purple w120" @click="qnaInsert">수정</a>
        <a href="#" v-show="$route.name=='qnaUpdate'" class="btn-purple w120" @click="goDelete">삭제</a>
        <a href="#" class="btn-dark w120" @click="goToList">목록</a>
      </div>
    </div>
    <!-- 등록 끝 -->
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import UploadAdapter from '../../utils/UploadAdapter';

export default {
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
            REPLY_CNT : ""
          },
          upFileNm : "",
          fileData : [],
          fileChk : false,
          existFile : "",
          editor: ClassicEditor,
          editorData: '',
          editorConfig: {
              // The configuration of the editor.
              toolbar: [ 'bold', 'italic', 'blockQuote','|', 'uploadImage','mediaEmbed', 'link', '|', 'undo', 'redo', '|' ],
              extraPlugins: [this.MyCustomUploadAdapterPlugin],
              placeholder: "게시글을 입력해보세요!"
          }
        };
    },
    mounted() {
      if(this.$route.name=="qnaUpdate"){
        this.getQnaInfo();
      }
    },    
    methods: {
      MyCustomUploadAdapterPlugin(editor) {
        //console.log("이값나오나시험=="+this.$route.params.qna_seq);
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader)
        }
      },
      goToList(){
        if(this.fileData.length>0){
          this.$api("/upload/deleteFile",{param:[this.fileData, "files"]}); //저장안된 이미지파일 삭제 요청              
        }
        this.$router.push({name:'qnaList',"params":{}}); 
      },   
      async getQnaInfo() {
        let qnaInfo = await this.$api("/api/qnaInfo",{param:[this.$route.params.qna_seq]});
        console.log("qnaInfo[0]=="+JSON.stringify(qnaInfo[0]));      
        if(qnaInfo.length > 0) {
          this.qna = qnaInfo[0];
          this.upFileNm = this.qna.FILE_NM;
          this.existFile = this.qna.FILE_NM;
          if(!this.$isEmpty(this.qna.FILE_NM)){
            this.fileChk=true;
          }          
          this.editorData=this.qna.CONTENTS;
          this.qna.PASSWORD="";
        }else{
          this.$swal("잘못된 접근입니다.", this.$router.push({name:'qnaList', params:{}})) 
        }
      },
      qnaInsert() {
        if(!this.qna.SUBJECT) {
          return this.$swal("제목은 필수 입력값입니다.", this.$refs.subject.focus());
        }
        if(!this.qna.WRITER) {
          return this.$swal("작성자는 필수 입력값입니다.", this.$refs.writer.focus());
        }
        if(!this.editorData) {
          return this.$swal("내용은 필수 입력값입니다.");
        }
        if(!this.qna.PASSWORD) {
          return this.$swal("비밀번호는 필수 입력값입니다.", this.$refs.password.focus());
        }
        this.qna.CONTENTS = this.editorData;
        this.qna.FILE_NM = this.upFileNm;
        this.qna.REG_ID = this.qna.WRITER;
        var delFiles = [];
        var saveFile = this.qna.FILE_NM ;       
        //저장된 파일과 중복된파일 제거
        for(var i=0; i<this.fileData.length; i++){
          if(String(this.fileData[i]).trim()!==String(saveFile).trim()){
            delFiles.push(this.fileData[i]);
          }
        }
        //기존업로드 파일 체크해서 삭제
        if(!this.existFile){
          if(this.existFile != this.qna.FILE_NM){
            delFiles.push(this.existFile);
          }
        }
        if(this.$route.name=="qnaRegist"){                    
          this.$swal.fire({
            title: '정말 등록 하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: `생성`,
            cancelButtonText: `취소`
          }).then(async (result) => {
            if(result.isConfirmed) {
              try{              
                if(this.$route.name=="qnaRegist"){
                  let parentSeq = await this.$api("/api/qnaParentSeq",{param:""});
                  console.log("parentSeq=="+parentSeq[0].PARENT_SEQ);
                  this.qna.PARENT_SEQ = parentSeq[0].PARENT_SEQ;
                }
                setTimeout(() => {
                  if(this.$route.name=="qnaRegist"){
                    this.$api("/api/qnaInsert",{param:[this.qna]});
                  }
                  this.$swal.fire('저장되었습니다!', '', 'success');
                  if(delFiles.length>0){
                    this.$api("/upload/deleteFile",{param:[delFiles, "files"]}); //저장안된 파일 삭제 요청              
                  }
                  this.$router.push({name:'qnaList'});
                  window.scrollTo({top:100, behavior:'smooth'});
                }, 300);
              }catch(e){
                console.log("error=="+e);
              }
            }         
          });
        }else{
          this.$swal.fire({
            title: '수정 하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: `수정`,
            cancelButtonText: `취소`
          }).then(async (result) => {
            if(result.isConfirmed) {
              try{
                await this.$api("/api/qnaUpdate",{param:[this.qna]});
                this.$swal.fire('저장되었습니다!', '', 'success');
                if(delFiles.length>0){
                    this.$api("/upload/deleteFile",{param:[delFiles, "files"]}); //저장안된 이미지파일 삭제 요청              
                }
                this.$router.push({name:'qnaList'});
                window.scrollTo({top:100, behavior:'smooth'});
              }catch(e){
                console.log("error=="+e);
              }
            }         
          });        
        }
      },
      goDelete() {       
        var msg = "";          
        if(this.qna.LVL==0 && this.qna.REPLY_CNT==2){
          msg = "해당 글은 답변이 존재합니다\n\n삭제시 답변도 같이 삭제됩니다.\n\n삭제하시겠습니까?";
        }else{
          msg = "삭제하시겠습니까?"
        }

        this.$swal.fire({
            title: msg,
            showCancelButton: true,
            confirmButtonText: `삭제`,
            cancelButtonText: `취소`
        }).then(async (result) => {
            if (result.isConfirmed) {
              await this.$api("/api/qnaDelete",{param:[this.qna.WRITER, this.qna.QNA_SEQ]});
              this.upFileDel();
              this.$swal.fire('삭제되었습니다!', '', 'success')
              this.$router.push({name:'qnaList'});
              window.scrollTo({top:100, behavior:'smooth'});
            } 
        });
      },
      async uploadFile(files) {
        let name = "";
        let data = null;
        if (files) {
          name = files[0].name;
          this.fileData.push(files[0].name);
          data = await this.$base64(files[0]);
        }
        const { error } = await this.$api(`/upload/files/${name}`,{data});
        if (error) {
          return this.$swal("파일 업로드 실패했습니다. 다시 시도하세요.");
        }
        this.$swal("파일이 업로드 되었습니다.");
        setTimeout(() => {
          this.upFileNm = name;
          //this.imageYn = true;
        }, 1000);
      },
      deleteFile() {//파일삭제
        if(!this.$isEmpty(this.upFileNm)){
          var delFiles = [];
          delFiles.push(this.upFileNm);
          this.$api("/upload/deleteFile",{param:[delFiles, "files"]}); //파일 삭제 요청        
          this.$swal.fire('삭제되었습니다!', '', 'success');
          setTimeout(() => {
            this.upFileNm = "";
          }, 1000);
        }
        this.fileChk=false;
      },
      upFileDel(){ //업로드된 파일 제거
        if(!this.$isEmpty(this.qna.FILE_NM)){
          var delFiles = [];
          delFiles.push(this.qna.FILE_NM);
          this.$api("/upload/deleteFile",{param:[delFiles, "files"]}); //저장된 파일 삭제 요청        
        }
        if(!this.$isEmpty(this.upFileNm)){
          var delFiles = [];
          delFiles.push(this.upFileNm);
          this.$api("/upload/deleteFile",{param:[delFiles, "files"]}); //파일 삭제 요청        
          this.upFileNm = "";
        }
      }
    }
}
</script>