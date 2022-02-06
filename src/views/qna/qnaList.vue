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
      <legend>게시물 검색</legend>
      <div class="search-table">
        <table cellpadding="0" cellspacing="0" summary="게시물 검색하세요.">
          <caption>게시물 검색</caption>
          <colgroup>
            <col width="17%" />
            <col width="*" />
          </colgroup>
          <tr>
            <th>Search</th>
            <td>
              <!--select name="Stype" class="w20p" title="검색분류">
                <option value="title">제목</option>
              </select-->
              <input type="text" ref="keyword" v-model="keyword" title="검색어" value="" class="w70p" placeholder="검색어를 입력하세요." @keyup.enter="goList" />
              <input type="submit" name="Search" value="Search" class="btn-grey-b" title="Search" @click="goList" />
            </td>
          </tr>
        </table>
      </div>
    </fieldset>
    <!-- 검색 끝 -->


    <!-- 리스트정보 -->
    <dl class="board-list-info">
      <dt>
        <i class="uil uil-file-alt"></i>
        총 <span>{{ttCnt}}</span>개 &nbsp; / &nbsp;
        현재페이지 : <span>{{pageInfo}}</span>
      </dt>
      <dd>
        <a href="/qnaRegist" class="btn-purple w80;cursor:hand;"><i class="uil uil-file-edit-alt"></i> 글쓰기</a>
      </dd>
    </dl>
    <!-- 리스트정보 끝 -->

    <!-- 리스트 -->
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

export default {
    components: {PageComponent},
    data() {
        return {
          qnaList: [],
          pageList: [],
          keyword : '',
          ttCnt : '0',
          pageInfo : ''
        };
    },
    created() {
        this.goList(); 
    },    
    methods: {
        async goList() {
            try{
                this.qnaList = await this.$api("/api/qnaList",{param:this.keyword});
                console.log("this.qnaList=="+this.qnaList.length);
                this.ttCnt=this.$currencyFormat(this.qnaList.length)
            }catch(e){
                console.log("error=="+e)
            }            
        },
        goQnaChk(qna) {
          let isView =  false;
          //공개이거나 답글이면 바로 뷰페이지로 
          if(qna.PUBLIC_YN == 'Y'){
            isView = true;
          }
          if(isView){
            this.$router.push({name:'qnaView', params:{ qna_seq:qna.QNA_SEQ }});
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
          this.currentPage=data[2]
          //$currencyFormat (value, format = '#,###')
          console.log("this.pageList=="+this.pageList.length);
          this.pageInfo="["+data[2]+"/"+data[3]+"]"
        }
    }
}
</script>