<template>
  <!-- 페이지넘버링 -->
  <div class="paging-list">
    <span>
      <a v-show="pageNum === 1" href="#"><i class="fas fa-caret-left"></i></a>
      <a v-show="pageNum !== 1" href="" @click="prevPage"><i class="fas fa-caret-left"></i></a>
    </span>
    <a :key="i" v-for="(i) in range(pageInfo.startIndex, pageInfo.endIndex)" @click="pageNum=i"  :class="[pageNum == i ? 'active' : '']">
      {{i}}        
    </a>
    <span>
      <a v-show="pageInfo.last == null" href="#"><i class="fas fa-caret-right"></i></a>
      <a v-show="pageInfo.last != null" @click="nextPage"><i class="fas fa-caret-right"></i></a>
    </span>
  </div>
  <!-- 페이지넘버링 끝 -->
</template>
<script>
export default {
  name: 'PageComponent',
  data () {
    return {
      pageNum: 1
    }
  },
  props: {
    pageSize: {
      type: Number,
      required: false,
      default: 10
    },
    totalCount: {
      type: String,
      required: true
    },
    block: {
      type: Number,
      required: false,
      default: 10 
    }
  },
  methods: {
    nextPage () {
      this.pageNum += 1
    },
    prevPage () {
      this.pageNum -= 1
    },
    range: function (start, end){
      let list = []
      for (let i = start; i <= end ; i ++) list.push(i);
      return list;
    }
  },
  computed: {
    pageInfo () {
      const totalPage = Math.ceil(this.totalCount / this.pageSize)
      let currentPage = this.pageNum //현재페이지번호
      if(currentPage == 0) currentPage = 1
      const first =  //첫번째 블럭
        currentPage > 1 ? parseInt(currentPage, 10) - parseInt(1, 10) : null
      const last =   //마지막 블럭
        totalPage !== currentPage
          ? parseInt(currentPage, 10) + parseInt(1, 10)
          : null
      let startIndex = (Math.ceil(currentPage / this.block) - 1) * this.block + 1
      
      let endIndex =
      startIndex + this.block > totalPage ? totalPage : startIndex + this.block - 1      
      //console.log("startIndex=="+startIndex);
      //console.log("endIndex==="+endIndex);
      //console.log("first==="+first);
      //console.log("last==="+last);
      
      const start = (this.pageNum-1) * this.pageSize
      const end = start + this.pageSize
      const pgInfo = []
      pgInfo.push(start)
      pgInfo.push(end)
      this.$emit('paging-list', pgInfo) // start, end 값 부모 페이지에 전달

      return {startIndex, endIndex, last}
    }
  }
}
</script>
