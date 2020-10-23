/*global Image  Promise */
import './utils/modernizr'
import * as $ from 'jquery'
window.$ = window.jQuery = $;
import 'slick-carousel/slick/slick'
import 'jquery.maskedinput/src/jquery.maskedinput'
import 'ion-rangeslider/js/ion.rangeSlider'

const HEADER_ANIMATION = 'header-animation' 
const HERO_ANIMATION = 'hero-animation'
const TEAM_ITEM_UNHOVER = 'team-item--unhover'
const TEAM_ITEM_HOVER = 'team-item--hover'




const images = Array.from(document.images)
const $header = $('#header')
const $heroSlider = $('#hero-slider')
const $heroNavigation = $('#hero-navigation')
const $servicesItem = $('.services-item__text')
const $reviewsContentItemText = $('.reviews-content-item__text')
const $newsSliderArticleText = $('.news-slider-article__text')
const $teamSlider = $('#team-slider')
const $rangeSlider = $('.range-slider')
const $inputPhone = $('input[type="phone"]')


// FUNCTIONS_START
function countLoadedImages(selector) {
  const $loadLine = document.querySelector(selector)
  const imagesTotal = images.length
  // eslint-disable-next-line no-unused-vars
  let imagesLoaded = 0
  function counterWidth() {
    imagesLoaded++
    $loadLine.style.width = ((100 / imagesTotal) * imagesTotal) + '%'
  }
  counterWidth()
}

function succsesLoad(selector, ms) {
  window.setTimeout(function () {
    const preloader = $(selector)
    if (!preloader.hasClass('preloader--done')) {
      preloader.addClass('preloader--done')
      $header.addClass(HEADER_ANIMATION)
      $heroSlider.slick('getSlick').$slides.first().addClass(HERO_ANIMATION)
      $("body").css("overflow", "visible")
    }
  }, ms)
}

function cutText(node, length, separator = '') {
  node.text(function (_, text) {
    if (text.length > length) {
      $(this).text(text.substring(0, length) + separator)
    }
  })
}
// FUNCTIONS_END



// PRELOADER
$(window).on('load', function () {
  
  $('body').css('overflow', 'hidden')
  countLoadedImages('#load-line')

  function cloneImages() {
    return new Promise(resolve => {
      images.forEach(() => {
        let imageClone = new Image()
        imageClone.onload = imageClone.onerror = countLoadedImages
      })
      resolve(true)
    })

  }
  
  cloneImages().then(succsesLoad.bind(this, '#preloader', 1000))

})


// MAIN_CONTENT
$(document).on('DOMContentLoaded', function () {

  $heroSlider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    draggable: false,
    fade: true,
    infinite: false,
    rows: 0
  })



  $heroNavigation.slick({
    infinity: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '#hero-slider',
    arrows: false,
    dots: false,
    focusOnSelect: true,
    variableWidth: true,
    rows: 0
  })

  // add active class currentSlider for animations
  $heroNavigation.on('afterChange', (_, __, nextSlide) => {
    const currentSlide = $([...$heroSlider.slick('getSlick').$slides][nextSlide])

    if (!currentSlide.hasClass(HERO_ANIMATION)) {
      $('.' + HERO_ANIMATION).removeClass(HERO_ANIMATION)
      window.requestAnimationFrame(() => {
        currentSlide.addClass(HERO_ANIMATION)
      })
    }
  })


  cutText($servicesItem, 205, '')
  cutText($reviewsContentItemText, 500, '...')
  cutText($newsSliderArticleText, 65, '...')

  $teamSlider.slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    variableWidth: true,
    rows: 0
  });



  function showTeamSocials() {
    if ($(this).hasClass(TEAM_ITEM_UNHOVER)) {
      $(this).removeClass(TEAM_ITEM_UNHOVER)
    }
    $(this).addClass(TEAM_ITEM_HOVER)
  }

  function hideShowSocials() {
    $(this).removeClass(TEAM_ITEM_HOVER)
  }

  $teamSlider.on('mouseenter', '.team-item', showTeamSocials).on('mouseleave', '.team-item', hideShowSocials)

  

  function maskedPhone(jQnode, mask = '+7(999) 999-99-99') {
    jQnode.mask(mask)
    jQnode.on('change', function () {
      const $phoneStars = $(this).next();
      /\d/.test($(this).val()) ?
        $phoneStars.css('display', 'none') :
        $phoneStars.css('display', 'block')
    })
  }
  maskedPhone($inputPhone)


  $rangeSlider.ionRangeSlider({
    postfix: "P",
    min: 0,
    max: 90000,
    from: 0,
    grid: true,
    step: 10000,
    grid_num: 9
  })


  $('#services-slider').slick({
    prevArrow: '<button type="button" class="main-slider-btn main-slider-btn--small main-slider-btn--prev slick-btn slick-prev"></button>',
    nextArrow: '<button type="button" class="main-slider-btn main-slider-btn--small main-slider-btn--next slick-btn slick-next"></button>',
    dots: false,
    arrows: true,
    rows: 0
  })

  $('.slider-works').slick({
    fade: true,
    dots: true,
    arrows: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    rows: 0
  })

  //reviews sliders start
  $('#slider-images').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    asNavFor: '#reviews-slider-content',
    infinite: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1149,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          variableWidth: true
        }
      },
    ]
  });

  $('#reviews-slider-content').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '#slider-images',
    fade: true,
    prevArrow: '.reviews-main-btns .main-slider-btn--prev',
    nextArrow: '.reviews-main-btns .main-slider-btn--next',
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000
  })
  //reviews sliders end
  //services start 



  $('#news-slider').slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow: '<button type="button" class="slick-btn slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-btn slick-next"></button>',
    infinite: false,
    responsive: [
      {
        breakpoint: 876,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  })



  function accordion(itemTarget, activeClass, e) {
      let item = e.target.closest('.' + itemTarget)
      $('.' + activeClass).removeClass(activeClass)
      $(item).addClass(activeClass) 
  }
  $('#question-accordion').on('click', accordion.bind(this, 'question-accordion__item', 'question-accordion__item--active'))

  



})




// document.addEventListener('DOMContentLoaded', function() {

$(document).ready(function () {


  //События кликак на бургер меню
  $('.header__menu-btn').on('click', function () {
    $(this).toggleClass('header__menu-btn--active')
    $('.header__menu ').toggleClass('header__menu--active');
  });
  //По истечению этого таймера начнет действовать анимация контента шапки сайта


  //Функция отвечает за планвый переход по якорным ссылкам
  $('a[href^="#"]').on('click', function (event) {
    // отменяем стандартное действие
    event.preventDefault();

    var scrollToBlock = $(this).attr("href"),
      blockPosition = $(scrollToBlock).offset().top;
    /*
    scrollToBlock - в переменную заносим информацию о том, к какому блоку надо перейти
    blockPosition - определяем положение блока на странице
    */
    $('html, body').animate({ scrollTop: blockPosition }, 2000);

  });

  //animation text header start
  // $('.header__item-subtitle').textillate({
  //   in: {
  //     effect: 'fadeIn'
  //   },
  // });
  // $('.header-slider__navigation-item').on('click', function () {
  //   if ($(this).hasClass('slick-current')) {
  //     $('.header__item-subtitle > span[style]').remove();
  //     $('.header__item-subtitle .texts .current > span[style]').remove();
  //     $('.header__item-subtitle .texts').css('display', 'block');
  //     $('.header__item-subtitle .texts .current').textillate({
  //       in: {
  //         effect: 'fadeIn'
  //       },
  //     });
  //   }
  // });
  //animation text header end
  //hide Modal start
  $('.modal').on('click', function () {
    $(this).fadeOut();
    $('body').css('overflow', 'visible');
  }).on('click', '.audit, .full-form, .set-form', function (event) {
    event.stopPropagation();
  });
  $('#validate').on('click', function () {
    let modal = $('.modal').attr('style');
    $(this).fadeOut();
    $('body').css('overflow', 'visible');
    if (modal == 'display: block;') {
      $('body').css('overflow', 'hidden');
    }
  });
  //hide Modal end
  //show Modal start
  const MODALCALL = $('[data-modal]');
  MODALCALL.on('click', function () {
    event.preventDefault();
    let modalId = $(this).data('modal');
    $(modalId).fadeIn();
    includeModal(modalId);
    $('body').css('overflow', 'hidden');
  });





  //search Modal start 
  // function includeModal(modalId) {
  //   let modal = $('.modal');
  //   switch (modalId) {
  //     case '#audit':
  //       $(modalId).load('audit.html .audit', function () {
  //         phone(modal);
  //       });
  //       break;
  //     case '#full-form':
  //       $(modalId).load('fullForm.html .full-form', function () {
  //         phone(modal);
  //         $('input, select').styler();
  //       });
  //       break;
  //     case '#set':
  //       $(modalId).load('setForm.html .set-form', function () {
  //         phone(modal);
  //         $('input, select').styler();
  //       });
  //       break;
  //   }
  // };
  //search Modal end 
  //show Modal end

  //close start
  $('.modal').on('click', '.close', function () {
    $(this).closest('.modal').fadeOut();
    $('.validate').fadeOut(800);
    $('body').css('overflow', 'visible');
  }).on('mouseenter', '.close', function () {
    $(this).toggleClass('close--active');
  });
  //close end 

  function universalValidInput(name) {
    if (name.val() != '') {
      $(name).css('border-color', '#c76d02');
      return true;
    } else {
      $(name).css('border-color', '#e93b50');
    }
  };
  function universalValidSelect(name) {
    if (name.hasClass('changed')) {
      $('.jq-selectbox__select').css('border-color', '#c76d02');
      return true;
    } else {
      $('.jq-selectbox__select').css('border-color', '#e93b50');
    }
  };
  function universalValidCheck(name) {
    if (name.hasClass('checked')) {
      return true;
    }
  }
  // validation form start
  function validForm() {
    let audit = $('#audit'),
      reviews = $('#reviews'),
      set = $('#set'),
      subscribe = $('.footer__subscribe-form'),
      fullForm = $('#full-form'),
      pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1-6}\.)?[a-z]{2,6}$/i;

    audit.on('submit', function () {
      event.preventDefault();
      let validName = $('.audit input[type="text"]'),
        validPhone = $('.audit input[type="phone"]');
      if (universalValidInput(validName) == true && universalValidInput(validPhone) == true) {
        $.ajax({
          url: 'send.php',
          type: 'POST',
          dataType: 'html'
        }).done(function () {
          audit.fadeOut();
          $('#validate').fadeIn().load('validate.html #succses-submit');
        })
          .fail(function () {
            $('#validate').fadeIn().load('validate.html #error-submit');
          });
      } else {
        $('#validate').fadeIn().load('validate.html #error-fill');
      }
    });
    fullForm.on('submit', function () {
      event.preventDefault();
      let validName = $('.full-form input[type="text"]'),
        validPhone = $('.full-form input[type="phone"]'),
        validUrl = $('.full-form input[type="url"]'),
        validSelect = $('.full-form .jq-selectbox.jqselect'),
        validCheck = $('.full-form .jq-checkbox');
      if (universalValidInput(validName) == true && universalValidInput(validPhone) == true && universalValidInput(validUrl) == true && universalValidSelect(validSelect) == true && universalValidCheck(validCheck) == true) {
        $.ajax({
          url: 'send.php',
          type: 'POST',
          dataType: 'html'
        }).done(function () {
          fullForm.fadeOut();
          $('#validate').fadeIn().load('validate.html #succses-submit');
        })
          .fail(function () {
            $('#validate').fadeIn().load('validate.html #error-submit');
          });
      } else {
        $('#validate').fadeIn().load('validate.html #error-fill');
      }
    });
    set.on('submit', function () {
      event.preventDefault();
      let validName = $('.set-form input[type="text"]'),
        validPhone = $('.set-form input[type="phone"]'),
        validCheck = $('.set-form .jq-checkbox');
      if (universalValidInput(validName) == true && universalValidInput(validPhone) == true && universalValidCheck(validCheck) == true) {
        $.ajax({
          url: 'send.php',
          type: 'POST',
          dataType: 'html'
        }).done(function () {
          set.fadeOut();
          $('#validate').fadeIn().load('validate.html #succses-submit');
        })
          .fail(function () {
            $('#validate').fadeIn().load('validate.html #error-submit');
          });
      } else {
        $('#validate').fadeIn().load('validate.html #error-fill');
      }
    });
    reviews.on('submit', function () {
      event.preventDefault();
      $('body').css('overflow', 'hidden');
      let validName = $('.reviews__form input[type="text"]'),
        validPhone = $('.reviews__form input[type="phone"]'),
        validConfi = $('.reviews__form #input__confidentiality-styler');
      if (universalValidCheck(validConfi) == true) {
        if (universalValidInput(validName) == true && universalValidInput(validPhone) == true) {
          $.ajax({
            url: 'send.php',
            type: 'POST',
            dataType: 'html'
          }).done(function () {
            validName.val('');
            validPhone.val('');
            validConfi.removeClass('checked');
            $('#validate').fadeIn().load('validate.html #succses-submit');
          })
            .fail(function () {
              $('#validate').fadeIn().load('validate.html #error-submit');
            });
        } else {
          $('#validate').fadeIn().load('validate.html #error-fill');
        }
      } else {
        $('#validate').fadeIn().load('validate.html #error-confidentiality');
      }
    });
    subscribe.on('submit', function () {
      event.preventDefault();
      $('body').css('overflow', 'hidden');
      let validName = $('.footer__subscribe-form input[type="text"]');
      if (universalValidInput(validName) == true) {
        if (validName.val().search(pattern) == 0) {
          $.ajax({
            url: 'send.php',
            type: 'POST',
            dataType: 'html'
          }).done(function () {
            validName.val('');
            $('#validate').fadeIn().load('validate.html #succses-subscribe');
          })
            .fail(function () {
              $('#validate').fadeIn().load('validate.html #error-submit');
            });
        } else {
          $('#validate').fadeIn().load('validate.html #error-email');
        }
      } else {
        $('#validate').fadeIn().load('validate.html #error-fill');
      }
    });
  };



  validForm();
  $(window).on('resize', function () {
    var win = $(this);
    if (win.width() <= 800) {
      //about start
      $('#about__btn').appendTo('.about .container');
      $('.about__inner').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        variableWidth: true,
        infinite: true,
        rows: 0
      });

      //about end
      //services start 
      for (let i = 0; i < 2; i++) {
        $('.services-slider__item[data-slick-index="' + i + '"] .services-slider__item-action').appendTo('.services-slider__item[data-slick-index="' + i + '"] .services-slider__item-inner');
      };
      //services end
    }
    else {
      //about start
      $('.about__inner').slick("unslick");
      $('#about__btn').appendTo('.about__inner');
      //about end 
      //services start 
      for (let i = 0; i < 2; i++) {
        $('.services-slider__item[data-slick-index="' + i + '"] .services-slider__item-action').appendTo('.services-slider__item[data-slick-index="' + i + '"] .services-slider__item-content');
      }
      //services end 
    }
  });
});


// })






