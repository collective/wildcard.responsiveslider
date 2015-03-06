/* global $ */

$( document ).ready(function() {
  'use strict';

  /* Slider */
  $('.portletresponsivesliderportlet').each(function(){
    var $slider = $(this);
    var selectors = {
      next: 'a.next',
      prev: 'a.prev',
      slides: 'ul.slides li',
      slideContainer: 'ul.slides',
      current: 'ul.slides li.current',
      dots: 'ul.dots'
    };

    var nextBtn = $(selectors.next, $slider);
    var prevBtn = $(selectors.prev, $slider);

    /* add dots */
    var $dots = $('<ul class="dots" />');
    $(selectors.slides, $slider).each(function(index){
      var $el = $('<li><a href="#"></a></li>');
      $dots.append($el);
      $('a', $el).click(function(e){
        e.preventDefault();
        _swap(index);
      });
    });
    $('li', $dots).eq(0).addClass('current');
    $slider.append($dots);

    var _showButtons = function(){
      nextBtn.hide();
      prevBtn.hide();
      var slides = $(selectors.slides, $slider);
      var current = $(selectors.current, $slider);
      var index = current.index();
      var size = slides.size();
      if((index === 0 && size > 1) || (index + 1 < size)){
        nextBtn.fadeIn('fast');
      }
      if(index > 0 && size > 1){
        prevBtn.fadeIn('fast');
      }
    };

    var _swap = function(next){
      var slides = $(selectors.slides, $slider);
      var current = $(selectors.current, $slider);
      $(selectors.slideContainer, $slider).height(current.height());
      nextBtn.fadeOut();
      prevBtn.fadeOut();
      current.fadeOut(function(){
        current.removeClass('current');
        $(selectors.dots + ' li').removeClass('current');
        var $dot = $(selectors.dots + ' li').eq(next);
        next = slides.eq(next);
        next.fadeIn(function(){
          next.addClass('current');
          $dot.addClass('current');
          $(selectors.slideContainer, $slider).css('height', null);
          _showButtons();
        });
      });
    };

    $(selectors.next, $slider).click(function(e){
      e.preventDefault();
      var slides = $(selectors.slides, $slider);
      var current = $(selectors.current, $slider);
      var index = current.index();
      var next;
      if((index + 1) >= slides.size()){
        next = 0;
      }else{
        next = index + 1;
      }
      _swap(next);
    });
    $(selectors.prev, $slider).click(function(e){
      e.preventDefault();
      var slides = $(selectors.slides, $slider);
      var current = $(selectors.current, $slider);
      var index = current.index();
      var next;
      if(index === 0){
        next = slides.size() - 1;
      }else{
        next = index - 1;
      }
      _swap(next);
    });
    /* == Initialize */
    _showButtons();
  });

});
