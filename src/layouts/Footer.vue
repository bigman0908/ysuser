<template>
<!-- 하단영역 -->
<div class="footer">
  <ul>
    <li>
      <a href="../main/"><img src="../assets/images/logo_white.svg" width="150" alt="" title="" /></a>
    </li>
    <li>
      업체명 : 연세간호학원 &nbsp;&nbsp; 대표 : 김옥순 &nbsp;&nbsp; 사업자등록번호 : 109-90-63564<br />
      주소 : 서울시 강서구 곰달래로 271 성림빌딩4층 (화곡동, 목동사거리)<br />
      대표전화번호 : 02-2644-9001 &nbsp;&nbsp; 팩스 : 02-2648-6603 &nbsp;&nbsp; 이메일 : ys2644-9001@hanmail.net<br />
      Copyright(c) Yonsel Nursing Academy.Co., Ltd. All Right Reserved.
    </li>
    <li>
      <a @click="goAhead"><i class="uil uil-angle-up"></i></a>
    </li>
  </ul>
</div>
<!-- 하단영역 끝 -->
</template>

<script>
export default {
  methods: {
    goAhead () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>
