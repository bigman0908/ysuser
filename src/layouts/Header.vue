<template>
  <!-- 상단영역 -->
  <div class="header">
    <dl>
      <dt>
        <a href="/main"><img src="../assets/images/logo_black.svg" alt="" title="" /></a>
      </dt>
      <dd>
        <a href="/about">학원소개</a>
        <a href="/education">교육안내</a>
        <a href="/exam">시험안내</a>
        <a href="/gallery">갤러리</a>
        <a href="/qna">질문과답변</a>
        <a href="/notice">공지사항</a>
      </dd>
      <dt>
        <a href="#" id="tmOpen"><i class="uil uil-align-right"></i></a>
      </dt>
    </dl>
  </div>
  <!-- 상단영역 끝 -->


  <!-- 전체메뉴 -->
  <div class="header-total">
    <ul>
      <li>
        <p><a href="/about">학원소개</a></p>
      </li>
      <li>
        <p><a href="/education">교육안내</a></p>
      </li>
      <li>
        <p><a href="/exam">시험안내</a></p>
      </li>
      <li>
        <p><a href="/gallery">갤러리</a></p>
      </li>
      <li>
        <p><a href="/qna">질문과답변</a></p>
      </li>
      <li>
        <p><a href="/notice">공지사항</a></p>
      </li>
      <li>
        <h2><a href="#" id="tmClose"><i class="uil uil-times"></i></a></h2>
      </li>
    </ul>
  </div>
  <!-- 전체메뉴 끝 -->

  <!-- 상단영역 - 모바일 -->
  <div class="header-mobile">
    <dl class="gnb-header">
      <dt><i class="uil uil-align-left" id="mobileLnbOpen"></i></dt>
      <dd><a href="/main"><img src="../assets/images/logo_black.svg" height="22" alt="" title="" /></a></dd>
      <!-- <dt onclick="location.href='../contact/contact.html';"><i class="uil uil-comments-alt"></i></dt> -->
    </dl>
    <div class="gnbMenu">
      <dl>
        <dt>Menu</dt>
        <dd id="mobileLnbClose"><i class="fa fa-times" aria-hidden="true"></i></dd>
      </dl>
      <ul>
        <li><a href='/about'><i class="uil uil-estate"></i> 학원소개</a></li>
        <li><a href='/education'><i class="uil uil-notebooks"></i> 교육안내</a></li>
        <li><a href='/exam'><i class="uil uil-file-bookmark-alt"></i> 시험안내</a></li>
        <li><a href='/gallery'><i class="uil uil-images"></i> 갤러리</a></li>
        <li><a href='/qna'><i class="uil uil-comments-alt"></i> 질문과답변</a></li>
        <li><a href='/notice'><i class="uil uil-file-copy-alt"></i> 공지사항</a></li>
      </ul>
    </div>
  </div>
  <!-- 상단영역 - 모바일 끝 -->
</template>