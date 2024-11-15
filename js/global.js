const $win = $(window);
const $doc = $(document);
const $html = $('html');

const winW = () => $win.width();
const winH = () => $win.height();
const winSh = () => $win.scrollTop();

//calc(var(--vh, 1vh) * 100)
const setCSSVars = () => {
	document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
	document.documentElement.style.setProperty('--vw', `${window.innerWidth * 0.01}px`);
};
setCSSVars();
window.addEventListener('resize', setCSSVars);

function getParameter(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var tab = {//탭 내부의 탭
	init: function() {
		if($('[role="tab-list"]').length > 0){
			this.action();
		}
	},
	action: function(){
		$('[role ="tab-list"] button').on('click',function(){
			var id = $(this).attr('aria-controls');
			var idEle = $('#'+id);
			var idCls = idEle.attr('class');

			if($(this).closest('ul').length > 0){
				$(this).closest('li').addClass('active').siblings().removeClass('active');
				$(this).attr('aria-selected',true).closest('li').siblings().find('button').attr('aria-selected',false);
			}else{
				$(this).addClass('active').siblings().removeClass('active');
				$(this).attr('aria-selected',true).siblings().attr('aria-selected',false);
			}

			$('.'+idCls).attr('aria-hidden',true);
			idEle.attr('aria-hidden',false);

			return false;
		});
	}
};


var tabSel = {//탭 내부의 탭
	init: function() {
		if($('.tabSel').length > 0){
			this.action();
		}
	},
	action: function(){
		$('.tabSel > button').on('click',function(){
			$(this).closest('.tabSel').toggleClass('active');
		});
		$('.tabSel .tab button').on('click',function(){
			$(this).closest('.tabSel').removeClass('active').children('button').html($(this).text());
		});
	}
};


var contRnd = {
	init: function() {
		if($('.contRndTop1').length > 0){
			this.action();
		}
	},
	action: function(){
		if(getParameter('tab')){
			var tabNum = Number(getParameter('tab'));
			$('.jsTab li').eq(tabNum-1).find('button').trigger('click');
		}
	}
};

var mainTech = {
	init: function() {
		if($('.mainSec.technology').length > 0){
			this.action();
		}
	},
	action: function(){
		var mainSecTechnology = document.querySelector('.mainSec.technology');
		var observer = new IntersectionObserver(function(entries, observer) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					$('.mainSec.technology').addClass('moveOn');
				}
			});
		}, { threshold: 0.5 });
		observer.observe(mainSecTechnology);

		var mainSecRecruit = document.querySelector('.mainSec.recruit');
		var observer2 = new IntersectionObserver(function(entries, observer) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					$('.mainSec.recruit').addClass('moveOn');
				}
			});
		}, { threshold: 0.5 });
		observer2.observe(mainSecRecruit);
	}
};


var headerGnb = {
	init: function() {
		this.action();
	},
	action: function(){
		$('.menuNav .menuDepth2 > li > a').on('click',function(e){
			if (matchMedia('screen and (max-width: 1024px)').matches && $(this).next('ul').length > 0) {
				e.preventDefault();
			}
		});
	}
};

var mainPop = {
	init: function() {
		if($('._sPop').length > 0){
			this.action();
		}
	},
	action: function(){

		$(".btn_all").on("click", function(){
			if($("._sPop").hasClass("off") === true){
				$("._sPop").removeClass("off");
			} else{
				$("._sPop").addClass("off")
			}
			if($(".layer_up").hasClass("off") === true){
				$(".layer_up").removeClass("off");
			} else{
				$(".layer_up").addClass("off")
			}
		})
		setTimeout(function(){
			$('._sPop').removeClass('mi').addClass('on').css('transition', '.4s')
				setTimeout(function(){
					$('._sPop').css('transition', '0s')
				},500)
		}, 500);

		$('._sPop > div > button').on('click', function(){
			$('._sPop').toggleClass('on')
			$('._sPop').css('transition', '0s')
		})

		$('._sPop .tit').on('click', function(){
			$('._sPop').addClass('on')
			$('._sPop').css('transition', '0s')
		})
	}
};

var mainPop2 = {
	init: function() {
		if($('._nPop').length > 0){
			this.action();
		}
	},
	action: function(){
		const nPop = $('._nPop'); // _nPop을 변수로 지정
		const mainPopSlide = nPop.find('.roll');
		const pageElement = nPop.find('.page'); // 페이지 번호를 표시할 요소

		let isSlickInitialized = false; // 슬라이더가 초기화되었는지 여부를 추적

		// 슬라이더 초기화 함수
		function initializeSlider() {
			if (!isSlickInitialized) {
				mainPopSlide.slick({
					speed: 200,
					arrows: false,
					autoplay: true,
					autoplaySpeed: 5000,
					rows: 2,
					customPaging: function(slider, i) {
						return '<strong>' + (i + 1) + '</strong><span>/</span><strong class="total">' + slider.slideCount + '</strong>';
					}
				});
				isSlickInitialized = true;
			}
		}

		// 페이지 번호를 업데이트하는 함수
		function updatePageNumber(slider) {
			const currentPage = slider.slick('slickCurrentSlide') + 1;
			const totalPages = slider.slick('getSlick').slideCount;
			pageElement.html('<strong>' + currentPage + '</strong><span>/</span><strong class="total">' + totalPages + '</strong>');
		}

		// 슬라이더 초기화 및 페이지 번호 설정
		initializeSlider();
		updatePageNumber(mainPopSlide);

		// 슬라이더를 재설정하는 함수
		function updateSlider() {
			if (nPop.hasClass('wide')) {
				mainPopSlide.slick('unslick');
				isSlickInitialized = false;
			} else {
				initializeSlider();
				mainPopSlide.slick('setPosition');
				updatePageNumber(mainPopSlide);
			}
		}

		// 이벤트 핸들러 등록
		nPop.on('click', '.onoff', function() {
			nPop.toggleClass('on').removeClass('wide');
			updateSlider();
		}).on('click', '.prev', function() {
			if (mainPopSlide.hasClass('slick-slider')) {
				mainPopSlide.slick('slickPrev');
				updatePageNumber(mainPopSlide);
			}
		}).on('click', '.next', function() {
			if (mainPopSlide.hasClass('slick-slider')) {
				mainPopSlide.slick('slickNext');
				updatePageNumber(mainPopSlide);
			}
		}).on('click', '.allview', function() {
			nPop.toggleClass('wide');
			updateSlider();
		});

		// 슬라이드 변경시 페이지 번호 업데이트
		mainPopSlide.on('afterChange', function(event, slick, currentSlide) {
			updatePageNumber($(slick.$slider));
		});

		nPop.on('mouseenter', function() {
			if (mainPopSlide.hasClass('slick-slider')) {
				mainPopSlide.slick('slickPause');
			}
		}).on('mouseleave', function() {
			if (mainPopSlide.hasClass('slick-slider')) {
				mainPopSlide.slick('slickPlay');
			}
		});
	}
};

var viewBodyImg = {
	init: function() {
		if($('.viewBody').length > 0){
			this.action();
		}
	},
	action: function(){
		var viewTitle = $('.viewTit').text(); // .viewTit의 텍스트를 한 번만 가져옴
		var lang = $('html').attr('lang'); // html의 lang 속성값 가져오기
		var altTextPrefix = lang === 'ko' ? '이미지' : 'image'; // lang에 따른 alt 텍스트 설정

		$('.viewBody img').filter(function() {
			var altText = $(this).attr('alt');
			return !altText || altText.trim() === ''; // alt 속성이 없거나 빈 값인 경우만 필터링
		}).each(function(index) {
			$(this).attr('alt', viewTitle + ' ' + altTextPrefix + ' ' + (index + 1)); // alt 속성에 텍스트와 번호를 넣음
		});
	}
};

var rndMod = {
	init: function() {
		if($('.hanmiRnd .mod').length > 0){
			this.action();
		}
	},
	action: function(){
		$('.hanmiRnd .mod .area button').on('focus mouseenter',function(){
			$(this).addClass('active').siblings().removeClass('active');
		});
		$('.hanmiRnd .mod .area').on('focusout mouseleave',function(){
			$('.hanmiRnd .mod .area button').removeClass('active');
		});
	}
};

$doc.ready(() => {
	tab.init();
	tabSel.init();
	contRnd.init();
	mainTech.init();
	headerGnb.init();
	mainPop.init();
	mainPop2.init();
	viewBodyImg.init();
	rndMod.init();
});

$win.on('load', () => {
	$html.addClass('load');
});