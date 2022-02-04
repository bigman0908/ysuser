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
        <dd><input type="text" name="" title="" placeholder="" class="w100p" /></dd>
      </dl>
      <dl>
        <dt>작성자</dt>
        <dd><input type="text" name="" title="" placeholder="" class="w100p" /></dd>
      </dl>
      <dl>
        <dt>비밀번호</dt>
        <dd>
          <input type="password" name="" title="" placeholder="" class="w100p" />
        </dd>
      </dl>
      <ul>
        <li>공개여부</li>
        <li>
          <label class="switch-button">
            <input type="checkbox" name="" />
            <span class="onoff-switch"></span>
          </label>
        </li>
      </ul>
      <p>
        <textarea name="" title="" placeholder="" class="w100p h200"></textarea>
      </p>
      <dl>
        <dt>첨부파일</dt>
        <dd>
          <a href="#"><i class="uil uil-plus-square"></i></a>
          <a href="#"><i class="uil uil-minus-square-full"></i></a>
        </dd>
      </dl>
      <dl>
        <dt>스팸방지코드</dt>
        <dd>
          <span><img src="../../assets/images/spam_img.jpg" alt="" title="" /></span>
          <input type="text" name="" title="" placeholder="" class="w100p ml10" />
        </dd>
      </dl>
      <div>
        <a href="#" class="btn-purple w120">등록</a>
        <a href="qna.html" class="btn-dark w120">목록</a>
      </div>
    </div>
    <!-- 등록 끝 -->
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
        goView(qna_seq) {
            this.$router.push({path:'/qnaView', query:{qna_seq:qna_seq}}); 
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