$(document).ready(function() {
  // 상단영역 //
	$(window).scroll(function() {
		if ($(".header").offset().top > 50) {
      $('.header').stop().css({ borderBottom : 'rgba(0,0,0,0.1) 1px solid', boxShadow : '0px 10px 50px rgba(0, 0, 0, 0.1)' });
      $('.header > dl').stop().css({ padding : '15px 0' });
		} else {
      $('.header').stop().css({ borderBottom : 'rgba(255,255,255,0.2) 1px solid', boxShadow : 'none' });
      $('.header > dl').stop().css({ padding : '25px 0' });
		}
	});


  // 토탈메뉴 //
	$('#tmOpen').click(function(){ 
		$('.header-total').slideDown(500, 'easeOutQuad');
	});
  $('#tmClose').click(function(){ 
		$('.header-total').slideUp(500, 'easeOutQuad');
	});


	// 모바일 메뉴 //
	var mobileLnbChk = 0;
	$('#mobileLnbOpen').click(function(){
		$('.gnbMenu').animate({ marginLeft : '0' }, 350, 'easeOutQuad');
		//$(this).removeClass('ion-android-menu').addClass('ion-android-close');
	});
	$('#mobileLnbClose').click(function(){
		$('.gnbMenu').animate({ marginLeft : '-250px' }, 350, 'easeOutQuad');
		//$('.ion-android-close').removeClass('ion-android-close').addClass('ion-android-menu');
	});

	$("body").click(function(e) {
     if($(".header-mobile").css("display") == "block") {
        if(!$('.header-mobile').has(e.target).length) {
					$('.gnbMenu').animate({ marginLeft : '-300px' }, 350, 'easeOutQuad');
					//$('.ion-android-close').removeClass('ion-android-close').addClass('ion-android-menu');
        }
     }
	});


  // 메인 비주얼 //
	$(".main-vegas").vegas({
    slides: [
      { src: "../../assets/images/main_visual_img01.jpg" },
      { src: "../../assets/images/main_visual_img02.jpg" },
      { src: "../../assets/images/main_visual_img03.jpg" }
    ],
    animation: 'kenburns',
    delay: 7000,
    //overlay: '../../images/btnIcn/overlay_07.png'
  });

  $('.mv-prev').on('click', function () {
    $(".main-vegas").vegas('options', 'transition', 'fade').vegas('previous');
  });

  $('.mv-next').on('click', function () {
    $(".main-vegas").vegas('options', 'transition', 'fade').vegas('next');
  });

  $('.mv-btm').click(function(){
    $('html, body').animate({ scrollTop : $(window).height()-51 }, 900, 'easeOutQuad');
  });


  // 메인 - 카피 //
	$('.mv-copy > h2').textillate({
		in: { effect: 'flash', delay: 200, shuffle: true },
		out: { effect: 'flash', delay: 200, shuffle: true },
		loop: true
	});
	$('.mv-copy > h3').textillate({
		in: { effect: 'bounceIn', delay: 30, shuffle: true },
		out: { effect: 'bounceOut', delay: 30, shuffle: true },
		loop: true
	});


  // 서브 비주얼 //
	$(".visual-sub-vagas").vegas({
    slides: [
			{ src: "../../assets/images/visual_sub01.jpg" },
			{ src: "../../assets/images/visual_sub02.jpg" },
			{ src: "../../assets/images/visual_sub03.jpg" },
			{ src: "../../assets/images/visual_sub04.jpg" }
		],
		//animation: 'kenburns',
		animation: 'random',
		delay: 7000,
		//overlay: '../../images/btnIcn/overlay_01.png'
	});


  // 갤러리 - 오버효과 //
	$('.gallery-list > ul > li').hover(function (event) {
		$(this).find('p span').stop().animate({ width : '105%', margin : '0 0 0 -2.5%', opacity: '0.5' }, 300, 'easeOutQuad');
	}, function (event) {
		$(this).find('p span').stop().animate({ width : '100%', margin : '0', opacity: '1.0' }, 300, 'easeOutQuad');
	});
});