<template>
  <!-- 비주얼 영역 -->
  <div class="visual-sub-vagas no-menu">
    <img src="../../assets/images/visual_sub02.jpg"/>
    <dl class="vsv-copy">
      <dt><a href="/about"><i class="uil uil-angle-left-b"></i></a></dt>
      <dd>교육안내</dd>
      <dt><a href="/exam"><i class="uil uil-angle-right-b"></i></a></dt>
    </dl>
  </div>
  <!-- 비주얼 영역 끝 -->

  <!-- 서브메뉴 -->
  <div class="sub-menu">
    <a href="#" @click="goPage('1')" :class="['w50p', gubun == '1' ? 'active' : '']">입학안내</a>
    <a href="#" @click="goPage('2')" :class="['w50p', gubun == '2' ? 'active' : '']">교육안내</a>
  </div>
  <!-- 서브메뉴 끝 -->

  <div class="content">
    <!-- 입학안내 -->
    <div v-show="gubun == '1'">
      <!-- 타이틀 -->
      <div class="title-area">
        <p><span></span></p>
        <h2>연세간호학원 입학안내</h2>
      </div>
      <!-- 타이틀 끝 -->

      <!-- 내용 -->
      <div class="education-area">

        <p></p>
        <h2>입학에 대한 안내입니다.</h2>
        <dl>
          <dt>
            입학자격(남/여)
          </dt>
          <dd>
            <ul>
              <li>고교졸업 예정(고3재학생)</li>
              <li>고졸 및 동등 학력 소유</li>
              <li>전문대학 졸업자 이상</li>
              <li>검정고시합격자(연령제한없음)</li>
              <li>남,녀 : 주/야/고3 특별반 운영(4:30pm~)</li>
              <li>주부 대 환영</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>
            교육기간
          </dt>
          <dd>
            <ul>
              <li>12개월(학과 과정 8개월, 병원실습 4개월)</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>
            개강일자
          </dt>
          <dd>
            <ul>
              <li>전반기 : 매년 3월 (주 / 야)</li>
              <li>후반기 : 매년 9월 (주 / 야)</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>
            제출서류
          </dt>
          <dd>
            <ul>
              <li>입학원서(본원소정양식) - 1통</li>
              <li>주민등록등본 -1통</li>
              <li>최종학력 졸업증명서 또는 졸업예정증명서(고3 재학증명서) - 1통</li> 
              <li>반명함판 사진 5매</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>
            입학후 아르바이트 책임제공
          </dt>
          <dd>
            <ul>
              <li>본 학원 입학후 아르바이트(병원근무)를 희망할 경우에는 선생님과 상담하여 접수순으로 제공하고 있습니다.</li>
              <li>부모님의 큰 부담없이 훌륭한 간호인이 되는 길을 마련하며 아르바이트를 통해 자립심을 기르고 자력으로 간호교육은 물론 간호 보건 전문 대학을 진학, 졸업하여 간호사가 되도록 적극지원하고 있습니다.</li>
            </ul>
          </dd>
        </dl>
      </div>
      <!-- 내용 끝 -->
    </div>
    
    <!-- 교육안내 -->
    <div v-show="gubun == '2'">
      <!-- 타이틀 -->
      <div class="title-area">
        <p><span></span></p>
        <h2>연세간호학원 교육안내</h2>
      </div>
      <!-- 타이틀 끝 -->

      <!-- 내용 -->
      <div class="education-area">
        <p></p>
        <h2>인성 및 교양교육</h2>
        <ul>
          <li>
            학생간에 융화단합대회, 야유회등으로 친목도모와 불우시설방문, 봉사활동등으로 국민보건사업 참여기회를 부여합니다.
          </li>
        </ul>

        <p></p>
        <h2>간호 전문교육</h2>
        <dl>
          <dt>
            1. 기초간호학
          </dt>
          <dd>
            <ul>
              <li>간호관리, 기본간호, 기초해부생리, 기초치과, 기초한방, 노인간호, 성인간호, 아동간호, 응급간호, 모성간호, 기초영양, 기초약리</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>
            2. 보건간호학
          </dt>
          <dd>
            <ul>
              <li>보건교육, 보건행정, 산업보건, 지역사회보건</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>
            3. 공중보건학
          </dt>
          <dd>
            <ul>
              <li>질병관리사업, 인구와 가족계획, 모자보건, 환경위생, 의료관계법규</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>
            4. 병원실기 간호학
          </dt>
          <dd>
            <ul>
              <li style="background:none;">&nbsp;</li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>
            5. 간호영어(의학용어), 의료보험실무
          </dt>
          <dd>
            <ul>
              <li style="background:none;">&nbsp;</li>
            </ul>
          </dd>
        </dl>

        <p></p>
        <h2>병원 실습</h2>
        <ul>
          <li>
            이론적 지식을 실제로 활용하는 기간으로 4개월동안 병ㆍ의원 및 종합병원에서 실습(내과, 외과, 소아과, 산부인과, 신경외과, 성형외과, 수술실, 분만실, 응급실, 중앙공급실, 치과, 한방병원등 실습교육)
          </li>
        </ul>

        <p></p>
        <h2>자격시험 특강</h2>
        <ul>
          <li>
            국가고시에 대비해 과목별 중요문제정리, 요점정리 집중강의 정기적인 모의고사 실시, 국가고시 시험에 학생들 적응훈련
          </li>
        </ul>

        <table cellpadding="0" cellspacing="0" summary="내용">
          <caption>내용</caption>
          <colgroup>
            <col width="20%" />
            <col width="*" />
          </colgroup>
          <thead>
            <tr>
              <th>교육별 분류</th>
              <th>교육별 내용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>인성 및 교양교육</td>
              <td class="text-left">사랑과 봉사, 박애정신을 바탕으로 환자에 대한 예절과 병원예절, 성실교육을 집중적으로 교육하는 과정 입니다</td>
            </tr>
            <tr>
              <td>병원실습</td>
              <td class="text-left">간호학 교육의 필수과정으로 일반병실, 응급실, 중환자실, 외래(내과, 외과, 소아과, 산부인과등)병ㆍ의원과 한방ㆍ치과의원ㆍ종합병원에서 실습하는 교육 과정입니다.</td>
            </tr>
            <tr>
              <td>특강</td>
              <td class="text-left">국가자격시험을 대비하여 이론교육과정과 병원실습을 통하여 익힌 지식을 종합적으로 과목별 요점정리ㆍ문제풀이를 완벽하게 해주는 교육과정입니다.</td>
            </tr>
            <tr>
              <td>취업</td>
              <td class="text-left">국내 각종 의료기관(종합병원, 각의원, 치과 병ㆍ의원, 한방 병ㆍ의원, 보건소, 어린이집, 유치원, 기업체 의무실, 약국, 산후조리원 등)에 취업시켜 드립니다</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'education',
  data () {
    return {
      gubun: this.$route.query.gubun
    }
  },
  created() {
    if(!this.gubun){
      this.gubun='1'
    }
  },
  methods : {
    goPage(val){
      this.gubun=val
    }
  }
}
</script>