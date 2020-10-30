/*global Promise */
import './utils/modernizr'
import * as $ from 'jquery'
window.$ = window.jQuery = $;
import 'slick-carousel/slick/slick'
import 'jquery.maskedinput/src/jquery.maskedinput'
import 'ion-rangeslider/js/ion.rangeSlider'
import { constant } from './utils/const'
import { vars } from './utils/vars'
import { adaptive } from './utils/adaptive'
import { addHeroAnimation, aboutInLocalStorage } from './utils/functions'



// FUNCTIONS_START
function loadingPage(node, time) {

  let percent = Math.ceil(100 / (Math.ceil(time / 300)))

  let widthPercent = 0

  while (100 > widthPercent) {
    widthPercent += percent
  }

  node.css('width', widthPercent > 100 ? 100 + '%' : widthPercent + '%')

}


function succsesLoad(node) {

  if (!node.hasClass('preloader--loading') || !node.hasClass('preloader--loading-mobile')) {

    if (window.innerWidth <= constant.adaptive.WIDTHx930) {

      node.addClass('preloader--loading-mobile')
      let $loader = node.children().first()
      $loader.on('transitionend', (e) => transEndPreloader(node, e)) 
    } else {
      node.addClass('preloader--loading')
      node.on('transitionend', (e) => transEndPreloader(node, e))
    }
       
    
    vars.$header.addClass(constant.className.HEADER_ANIMATION)
    vars.$heroSlider.slick('getSlick').$slides.first().addClass(constant.className.HERO_ANIMATION)
    $("body").css("overflow", "visible")
    vars.$wrapper.off('touchmove', vars.fn.prevent)

   
  }
}

function transEndPreloader(node, e) {

  if (e.target.id === 'preloader' || e.target.id === 'loader') { 
    node.addClass('preloader--end')
    adaptiveAnimationAfterLoad()
  }
}

function adaptiveAnimationAfterLoad() {

  if (window.innerWidth <= constant.adaptive.WIDTHx600) {

    vars.$headerLogo.insertAfter(vars.$burgerBtn)

  } else if (window.innerWidth > constant.adaptive.WIDTHx600) {

    vars.$headerLogo.insertBefore(vars.$headerContacts)
  }
 
  if (window.innerWidth <= constant.adaptive.WIDTHx930) {
    vars.$headerLogo.addClass(constant.className.HEADER_LOGO_ACTIVE)
  }
 
}


function cutText(node, length, separator = '') {
  node.text(function (_, text) {
    if (text.length > length) {
      $(this).text(text.substring(0, length) + separator)
    }
  })
}
// FUNCTIONS_END


$(window).on('load', function () {

  let time = Math.ceil(window.performance.now())

  $('body').css('overflow', 'hidden')
  vars.$wrapper.on('touchmove', vars.fn.prevent)

  function cloneImages() {
    return new Promise(resolve => {
      loadingPage(vars.$loadLine, time)
      vars.$loadLine.on('transitionend', () => resolve(true))
    })

  }

  cloneImages().then(succsesLoad.bind(this, vars.$preloader))
})


// PRELOADER

$(document).on('DOMContentLoaded', function () {

  vars.$burgerBtn.on('click', function () {
    $(this).toggleClass('burger-btn--active')
    vars.$navigation.toggleClass('navigation--active')
  })

  vars.$heroSlider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    draggable: false,
    fade: true,
    infinite: false,
    rows: 0
  })


  vars.$heroSlider.on('afterChange', (_, __, nextSlide) => {
    const currentSlide = $([...vars.$heroSlider.slick('getSlick').$slides][nextSlide])
    addHeroAnimation(currentSlide)
  })

  adaptive()
  window.addEventListener('resize', adaptive)


  aboutInLocalStorage()

  cutText(vars.$servicesItem, 205, '')
  cutText(vars.$reviewsContentItemText, 500, '...')
  cutText(vars.$newsSliderArticleText, 65, '...')

  vars.$teamSlider.slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    variableWidth: true,
    rows: 0
  });



  function showTeamSocials() {
    if ($(this).hasClass(constant.className.TEAM_ITEM_UNHOVER)) {
      $(this).removeClass(constant.className.TEAM_ITEM_UNHOVER)
    }
    $(this).addClass(constant.className.TEAM_ITEM_HOVER)
  }

  function hideShowSocials() {
    $(this).removeClass(constant.className.TEAM_ITEM_HOVER)
  }

  vars.$teamSlider.on('mouseenter', '.team-item', showTeamSocials).on('mouseleave', '.team-item', hideShowSocials)



  function maskedPhone(jQnode, mask = '+7(999) 999-99-99') {
    jQnode.mask(mask)
    jQnode.on('change', function () {
      const $phoneStars = $(this).next();
      /\d/.test($(this).val()) ?
        $phoneStars.css('display', 'none') :
        $phoneStars.css('display', 'block')
    })
  }
  maskedPhone(vars.$inputPhone)


  vars.$rangeSlider.ionRangeSlider({
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
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 481,
        settings: {
          slidesToShow: 1,
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



// MAIN_CONTENT





// document.addEventListener('DOMContentLoaded', function() {

// $(document).ready(function () {


  //События кликак на бургер меню






  //Функция отвечает за планвый переход по якорным ссылкам
  // $('a[href^="#"]').on('click', function (event) {
  //   // отменяем стандартное действие
  //   event.preventDefault();

  //   var scrollToBlock = $(this).attr("href"),
  //     blockPosition = $(scrollToBlock).offset().top;
  //   /*
  //   scrollToBlock - в переменную заносим информацию о том, к какому блоку надо перейти
  //   blockPosition - определяем положение блока на странице
  //   */
  //   $('html, body').animate({ scrollTop: blockPosition }, 2000);

  // });

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
  // $('.modal').on('click', function () {
  //   $(this).fadeOut();
  //   $('body').css('overflow', 'visible');
  // }).on('click', '.audit, .full-form, .set-form', function (event) {
  //   event.stopPropagation();
  // });
  // $('#validate').on('click', function () {
  //   let modal = $('.modal').attr('style');
  //   $(this).fadeOut();
  //   $('body').css('overflow', 'visible');
  //   if (modal == 'display: block;') {
  //     $('body').css('overflow', 'hidden');
  //   }
  // });
  //hide Modal end
  //show Modal start
  // const MODALCALL = $('[data-modal]');
  // MODALCALL.on('click', function () {
  //   event.preventDefault();
  //   let modalId = $(this).data('modal');
  //   $(modalId).fadeIn();
  //   includeModal(modalId);
  //   $('body').css('overflow', 'hidden');
  // });





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
  // $('.modal').on('click', '.close', function () {
  //   $(this).closest('.modal').fadeOut();
  //   $('.validate').fadeOut(800);
  //   $('body').css('overflow', 'visible');
  // }).on('mouseenter', '.close', function () {
  //   $(this).toggleClass('close--active');
  // });
  //close end 

//   function universalValidInput(name) {
//     if (name.val() != '') {
//       $(name).css('border-color', '#c76d02');
//       return true;
//     } else {
//       $(name).css('border-color', '#e93b50');
//     }
//   };
//   function universalValidSelect(name) {
//     if (name.hasClass('changed')) {
//       $('.jq-selectbox__select').css('border-color', '#c76d02');
//       return true;
//     } else {
//       $('.jq-selectbox__select').css('border-color', '#e93b50');
//     }
//   };
//   function universalValidCheck(name) {
//     if (name.hasClass('checked')) {
//       return true;
//     }
//   }
//   // validation form start
//   function validForm() {
//     let audit = $('#audit'),
//       reviews = $('#reviews'),
//       set = $('#set'),
//       subscribe = $('.footer__subscribe-form'),
//       fullForm = $('#full-form'),
//       pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1-6}\.)?[a-z]{2,6}$/i;

//     audit.on('submit', function () {
//       event.preventDefault();
//       let validName = $('.audit input[type="text"]'),
//         validPhone = $('.audit input[type="phone"]');
//       if (universalValidInput(validName) == true && universalValidInput(validPhone) == true) {
//         $.ajax({
//           url: 'send.php',
//           type: 'POST',
//           dataType: 'html'
//         }).done(function () {
//           audit.fadeOut();
//           $('#validate').fadeIn().load('validate.html #succses-submit');
//         })
//           .fail(function () {
//             $('#validate').fadeIn().load('validate.html #error-submit');
//           });
//       } else {
//         $('#validate').fadeIn().load('validate.html #error-fill');
//       }
//     });
//     fullForm.on('submit', function () {
//       event.preventDefault();
//       let validName = $('.full-form input[type="text"]'),
//         validPhone = $('.full-form input[type="phone"]'),
//         validUrl = $('.full-form input[type="url"]'),
//         validSelect = $('.full-form .jq-selectbox.jqselect'),
//         validCheck = $('.full-form .jq-checkbox');
//       if (universalValidInput(validName) == true && universalValidInput(validPhone) == true && universalValidInput(validUrl) == true && universalValidSelect(validSelect) == true && universalValidCheck(validCheck) == true) {
//         $.ajax({
//           url: 'send.php',
//           type: 'POST',
//           dataType: 'html'
//         }).done(function () {
//           fullForm.fadeOut();
//           $('#validate').fadeIn().load('validate.html #succses-submit');
//         })
//           .fail(function () {
//             $('#validate').fadeIn().load('validate.html #error-submit');
//           });
//       } else {
//         $('#validate').fadeIn().load('validate.html #error-fill');
//       }
//     });
//     set.on('submit', function () {
//       event.preventDefault();
//       let validName = $('.set-form input[type="text"]'),
//         validPhone = $('.set-form input[type="phone"]'),
//         validCheck = $('.set-form .jq-checkbox');
//       if (universalValidInput(validName) == true && universalValidInput(validPhone) == true && universalValidCheck(validCheck) == true) {
//         $.ajax({
//           url: 'send.php',
//           type: 'POST',
//           dataType: 'html'
//         }).done(function () {
//           set.fadeOut();
//           $('#validate').fadeIn().load('validate.html #succses-submit');
//         })
//           .fail(function () {
//             $('#validate').fadeIn().load('validate.html #error-submit');
//           });
//       } else {
//         $('#validate').fadeIn().load('validate.html #error-fill');
//       }
//     });
//     reviews.on('submit', function () {
//       event.preventDefault();
//       $('body').css('overflow', 'hidden');
//       let validName = $('.reviews__form input[type="text"]'),
//         validPhone = $('.reviews__form input[type="phone"]'),
//         validConfi = $('.reviews__form #input__confidentiality-styler');
//       if (universalValidCheck(validConfi) == true) {
//         if (universalValidInput(validName) == true && universalValidInput(validPhone) == true) {
//           $.ajax({
//             url: 'send.php',
//             type: 'POST',
//             dataType: 'html'
//           }).done(function () {
//             validName.val('');
//             validPhone.val('');
//             validConfi.removeClass('checked');
//             $('#validate').fadeIn().load('validate.html #succses-submit');
//           })
//             .fail(function () {
//               $('#validate').fadeIn().load('validate.html #error-submit');
//             });
//         } else {
//           $('#validate').fadeIn().load('validate.html #error-fill');
//         }
//       } else {
//         $('#validate').fadeIn().load('validate.html #error-confidentiality');
//       }
//     });
//     subscribe.on('submit', function () {
//       event.preventDefault();
//       $('body').css('overflow', 'hidden');
//       let validName = $('.footer__subscribe-form input[type="text"]');
//       if (universalValidInput(validName) == true) {
//         if (validName.val().search(pattern) == 0) {
//           $.ajax({
//             url: 'send.php',
//             type: 'POST',
//             dataType: 'html'
//           }).done(function () {
//             validName.val('');
//             $('#validate').fadeIn().load('validate.html #succses-subscribe');
//           })
//             .fail(function () {
//               $('#validate').fadeIn().load('validate.html #error-submit');
//             });
//         } else {
//           $('#validate').fadeIn().load('validate.html #error-email');
//         }
//       } else {
//         $('#validate').fadeIn().load('validate.html #error-fill');
//       }
//     });
//   }





//   validForm();




//   $(window).on('resize', function () {
//     var win = $(this);
//     if (win.width() <= 800) {
//       //about start


//       //about end
//       //services start 
//       for (let i = 0; i < 2; i++) {
//         $('.services-slider__item[data-slick-index="' + i + '"] .services-slider__item-action').appendTo('.services-slider__item[data-slick-index="' + i + '"] .services-slider__item-inner');
//       };
//       //services end
//     }
//     else {
//       //about start

//       //about end 
//       //services start 
//       for (let i = 0; i < 2; i++) {
//         $('.services-slider__item[data-slick-index="' + i + '"] .services-slider__item-action').appendTo('.services-slider__item[data-slick-index="' + i + '"] .services-slider__item-content');
//       }
//       //services end 
//     }
//   });
// });


// })






