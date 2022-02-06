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
    </dl>
    <!-- 리스트정보 끝 -->

    <!-- 리스트 -->
    <div class="board-list">
      <div v-show="noticeList.length > 0">
        <ul :key="i" v-for="(notice,i) in pageList" @click="goDetail(notice.BOARD_SEQ)">
          <li>{{notice.ROWNUM}}</li>          
          <li>{{notice.SUBJECT}}</li>
          <li>{{notice.REG_NM}}</li>
          <li>{{notice.REG_DT}}</li>
          <li><i class="uil uil-eye"></i> {{notice.VIEW_CNT}}</li> 
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

export default {
  components: {PageComponent},
  data() {
    return {
      noticeList: [],
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
          this.noticeList = await this.$api("/api/noticeList",{param:this.keyword});
          console.log("this.noticeList=="+this.noticeList.length);
          this.ttCnt=this.$currencyFormat(this.noticeList.length)
      }catch(e){
          console.log("error=="+e)
      }            
    },
    goDetail(notice_seq){
      this.$router.push({name:'noticeView', params:{notice_seq:notice_seq}}); 
      window.scrollTo({top:100, behavior:'smooth'});
    },
    listPagingSet(data){
      this.pageList=this.noticeList.slice(data[0], data[1]);
      this.currentPage=data[2]
      //$currencyFormat (value, format = '#,###')
      console.log("this.pageList=="+this.pageList.length);
      this.pageInfo="["+data[2]+"/"+data[3]+"]"
    }
  }
}
</script>