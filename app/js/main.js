
$(document).ready(function () {
  //запускаем прелоадер по загрузкt html
  $("html,body").css("overflow", "hidden"); 
  var
    images = document.images,
    imagesTotalCount = images.length,
    imagesLoadedCount = 0;
  percDisplay = document.getElementById('load-border');
  for (var i = 0; i < imagesTotalCount; i++) {
    imageClone = new Image();
    imageClone.onload = imageLoaded;
    imageClone.onerror = imageLoaded;
    imageClone.src = images[i].src;
  }
  //функция полосы загрузки в зависимости от количества загруженных картинок с минимальным временем в 1 секунду
  function imageLoaded() {
    imagesLoadedCount++;
    percDisplay.style.width = (((100 / imagesTotalCount) * imagesLoadedCount) << 0) + '%';
    if (imagesLoadedCount >= imagesTotalCount) {
      setTimeout(function () {
        var preloader = document.getElementById('page-preloader');
        /*   var loader = document.getElementById('loader'); */
        if (!preloader.classList.contains('done')) {
          preloader.classList.add('done');
          $("html, body").css("overflow", "visible");
          $('.preloader').css('background-image', 'none');
          /* loader.classList.add('loader-static'); */
        }
      }, 1000);
    }
  }

  //События кликак на бургер меню
  $('.header__menu-btn').on('click', function () {
    $(this).toggleClass('header__menu-btn--active')
    $('.header__menu ').toggleClass('header__menu--active');
  });
  //По истечению этого таймера начнет действовать анимация контента шапки сайта
  setTimeout(function(){
    $('.header__slider').addClass('header__slider-animation');
  }, 3000);

//Функция отвечает за планвый переход по якорным ссылкам
  $(function(){
    $('a[href^="#"]').on('click', function(event) {
      // отменяем стандартное действие
      event.preventDefault();
      
      var scrollToBlock = $(this).attr("href"),
          blockPosition = $(scrollToBlock).offset().top;
      /*
      scrollToBlock - в переменную заносим информацию о том, к какому блоку надо перейти
      blockPosition - определяем положение блока на странице
      */ 
      $('html, body').animate({scrollTop: blockPosition}, 2000); 
      // 2000 скорость перехода в миллисекундах
    });
  });

    const MODALCALL = $('[data-modal]');

    MODALCALL.on('click', function(){
      event.preventDefault();
      let modalId =  $(this).data('modal');
      $(modalId).fadeIn();
      $('body').css('overflow', 'hidden');
    });
  


  //close start
  $('.close').click(function () {
    $(this).closest('.modal').fadeOut();
    $('.validate').fadeOut(800);
    $("body").css('overflow', 'visible');
  }).mouseenter(function () {
    $(this).toggleClass('close--active');
  });
  //close end 

  //mask phone start
  function phone() {
    let phone = $('input[type="phone"]');
    phone.mask('+7(999) 999-99-99');
    phone.on('change', function () {
      console.log(phone.length);
      if (phone.length == 1) {
        $('input[type="phone"] + span').css('font-size', '0px');
      }
    });
  }
  phone();
  //mask phone end
 
  //FormStyler start
  $('input, select').styler();
  //FormStyler end
  $('.header__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    draggable:false,
    fade: true,
    infinite: false,
    rows: 0
  });
  $('.header-slider__navigation').slick({
    infinity:false,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.header__slider', 
    arrows: false,
    dots: false,
    focusOnSelect: true,
    variableWidth: true,
    rows: 0
  });

  $('.team__slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    variableWidth: true,
    rows: 0
  });

  //участок код отвечает за открытие и переключение списка в секции "question"
  $('.question__list li').on('click', function(){
    $('.question__list li.active').removeClass('active');
    if($(this).hasClass('active')){
      $(this).removeClass('active');
    } 
    else{
      $(this).addClass('active');
    }
  });
  //reviews sliders start
  $('.slider-images').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    asNavFor: '.slider-content',
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
 
  $('.slider-content').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slider-images',
    fade: true,
    prevArrow: '<button type="button" class="slick-btn slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-btn slick-next"></button>',
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000
  });
  //reviews sliders end
  //services start 
  $('.services-slider').slick({
    prevArrow: '<button type="button" class="slick-btn slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-btn slick-next"></button>',
    dots: false,
    arrows: true,
    rows: 0
  });

  $('.services-slider .slider-works').slick({
    fade: true,
    dots: true,
    arrows: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    rows: 0
  });

  $('.footer-slider').slick({
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
  });
 

  $('.range-slider').ionRangeSlider({
    postfix: "P",
    min: 0,
    max: 90000,
    from: 0,
    grid: true,
    step: 10000,
    grid_num: 9
  });

  // validation form start
    function validForm() {
      let audit = $('.audit'),
          reviews = $('.reviews__form'),
          form = $('form'),
          subscribe = $('.footer__subscribe-form'),
          fullForm = $('.full-form__inner'),
          validName = $('input[type="text"]'),
          validCheck = $('input[type="check"]'),
          validPhone = $('input[type="phone"]'),
          validEmail = $('input[type="email"]'),
          pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1-6}\.)?[a-z]{2,6}$/i;
      
      audit.submit(function(){
        event.preventDefault();
        let validName = $('.audit input[type="text"]'),
            validPhone = $('.audit input[type="phone"]'),
            validAll = $('.audit input'),
            validNameBool = false,
            validPhoneBool = false;
        if (validName.val() != '') {
            validNameBool = true;
        }
        if (validPhone.val() != '') {
          validPhoneBool = true;
        } 
        if (validNameBool == true && validPhoneBool == true) {
          $.ajax({
            url: 'send.php',
            type: 'GET',
            dataType: 'html',
            data: {
              name: userName,
              mail: userMail,
              subject: userSubject,
              message: userMessage
            },
          }).done(function() {
            audit.fadeOut();
            audit[0].reset();
            $('#succses-submit').css('display', 'flex');
            $('#error-fill').css('display', 'none');
          })
          .fail(function() {
            $('#error-fill').css('display', 'flex');
            $('#succses-submit').css('display', 'none');
            validAll.css('border-color', '#e93b50');
          });
         
        } else {
          $('#error-fill').css('display', 'flex');
          validAll.css('border-color', '#e93b50');
        }
      });    
    };
    validForm();
  // validation form end

  // $('.header__item-subtitle').textillate();
  // $('.header-slider__navigation-item').click(function(){
  //     $('.header__item-subtitle').textillate({
  //       loop: true
  //     });
  // });
  // function repeatAnimateNavSlider(e){
  //       $('.header__item-subtitle').textillate();
  // };
  
  // repeatAnimateNavSlider();
  $(window).on('resize', function(){
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
      for (let i = 0; i < 2;i++) {
        $('.services-slider__item[data-slick-index="'+ i +'"] .services-slider__item-action').appendTo('.services-slider__item[data-slick-index="'+ i +'"] .services-slider__item-inner');
      };
      //services end
    }
    else {
      //about start
      $('.about__inner').slick("unslick");
      $('#about__btn').appendTo('.about__inner');
      //about end 
      //services start 
      for (let i = 0; i < 2;i++) {
        $('.services-slider__item[data-slick-index="'+ i +'"] .services-slider__item-action').appendTo('.services-slider__item[data-slick-index="'+ i +'"] .services-slider__item-content');
      };
      //services end 
    } 
  });

  $('.modal').on('click', function() {
    $(this).fadeOut();
    $('.validate').fadeOut();
    $('body').css('overflow', 'visible');  
  });
  $('.audit, .full-form, .set-form').on('click', function(){
    event.stopPropagation();
  });
});


