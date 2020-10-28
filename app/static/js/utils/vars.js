import * as $ from 'jquery'

const vars = {
  images: Array.from(document.images),
  $header: $('#header'),
  $headerContainer: $('.header__container'),
  $headerLogo: $('.header__logo'),
  $headerContacts: $('.header__contacts'),
  $navigation: $('#navigation'),
  $navigationList: $('.navigation__list'),
  $heroSlider: $('#hero-slider'),
  $burgerBtn: $('#burger-btn'),
  $heroNavigation: $('#hero-navigation'),
  $aboutItems: $('#about-items'),
  $aboutText: $('#about__text'),
  $aboutBtn: $('#about-btn'),
  $servicesItem: $('.services-item__text'),
  $reviewsContentItemText: $('.reviews-content-item__text'),
  $newsSliderArticleText: $('.news-slider-article__text'),
  $teamSlider: $('#team-slider'),
  $rangeSlider: $('.range-slider'),
  $inputPhone: $('input[type="phone"]'),
  optionSlick: {
    heroNavigationSlick: {
      infinity: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '#hero-slider',
      arrows: false,
      dots: false,
      focusOnSelect: true,
      variableWidth: true,
      rows: 0
    },
    aboutItemsSlick: {
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      variableWidth: true,
      infinite: true,
      rows: 0

    }
  },
  html: {
    aboutTextMobile: `
    <div class="about-text-mobile__content">
     Маркетинговое агентство PineApple - Ваш
     надежный партнер. Комплексный
     подход к продвижению в интернете.
     </div>
     <div class="about-text-mobile__content">
     Выполним работу качественно, в срок.
     Даем <strong class="about-text-mobile__strong">100% гарантию</strong> результата.
     </div>
     <div class="about-text-mobile__content">
     Поможем построить бизнес сочно
     и со вкусом.
     </div>`
  }
}


export { vars }