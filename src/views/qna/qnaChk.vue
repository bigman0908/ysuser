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


    <!-- 검색 -->
    <fieldset>
      <legend>비밀번호확인</legend>
      <div class="search-table2">
        <table cellpadding="0" cellspacing="0" summary="비밀번호를 입력하세요.">
          <caption>게시물 검색</caption>
          <colgroup>
            <col width="17%" />
            <col width="*" />
          </colgroup>
          <tr>
            <th>비밀번호확인</th>
            <td>
              <!--select name="Stype" class="w20p" title="검색분류">
                <option value="title">제목</option>
              </select-->
              <input type="password" title="비밀번호" value="" ref="password" v-model="PASSWORD" @keyup.enter="goQnaChk" autocomplete="new-password" class="w70p" placeholder="개시글 작성시 입력한 비밀번호를 입력해 주세요." />
              <input type="submit" name="passChk" value="확인" class="btn-grey-b" title="확 인" @click="goQnaChk" />
              <input type="submit" name="passChk" value="취소" class="btn-grey-b" title="취 소" @click="this.$router.push({ name: 'qnaList', params:{}})" />
            </td>
          </tr>
        </table>
      </div>
    </fieldset>
    <!-- 검색 끝 -->
  </div>
</template>

<script>
import PageComponent from '../../components/Pagination'

export default {
    components: {PageComponent},
    data() {
        return {
            PASSWORD: "",
            qna_seq : this.$route.params.qna_seq,
            parent_seq : this.$route.params.parent_seq,

        };
    },
    created(){
      console.log("parent_seq=="+this.parent_seq);
    },
    methods: {
      async goQnaChk() {
        if (this.PASSWORD === '') {
          this.$swal('패스워드는 필수 입력값입니다.')
          this.$refs.password.focus();
          return 
        }
        let qnaInfo = await this.$api("/api/qnaChk",{param:[this.parent_seq, this.PASSWORD]}); 
        console.log("isView=="+this.$route.params.isView );    
        if(qnaInfo[0]) {
          if(!this.$isEmpty(this.$route.params.isView) && this.$route.params.isView=='true'){
            this.$router.push({name:'qnaView', params:{ qna_seq:this.qna_seq }});
          }else{
            this.$router.push({ name: 'qnaUpdate' , params:{qna_seq: this.qna_seq}})
          }

          window.scrollTo({top:100, behavior:'smooth'})
        }else{
          this.$swal('비밀번호 확인에 실패하였습니다.\n\n비밀번호를 확인해주세요.')
        }
      }
    }
}
</script>