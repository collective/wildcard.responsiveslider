  $( document ).ready(function() {
  /* Slider */
  if($('.portletresponsivesliderportlet').size() > 0){
    var nextBtn = $('.portletresponsivesliderportlet .next');
    var prevBtn = $('.portletresponsivesliderportlet .prev');

    var _showButtons = function(){
      nextBtn.hide();
      prevBtn.hide();
      var slides = $('.portletresponsivesliderportlet ul li');
      var current = $('.portletresponsivesliderportlet ul li.current');
      var index = current.index();
      var size = slides.size();
      if((index === 0 && size > 1) || (index + 1 < size)){
        nextBtn.fadeIn('fast');
      }
      if(index > 0 && size > 1){
        prevBtn.fadeIn('fast');
      }
    }
    var _swap = function(next){
      var slides = $('.portletresponsivesliderportlet ul li');
      var current = $('.portletresponsivesliderportlet ul li.current');
      $('.portletresponsivesliderportlet ul').height(current.height());
      nextBtn.fadeOut();
      prevBtn.fadeOut();
      current.fadeOut(function(){
        current.removeClass('current');
        next = slides.eq(next);
        next.fadeIn(function(){
          next.addClass('current');
          $('.portletresponsivesliderportlet ul').css('height', null);
          _showButtons();
        });
      });
    };

    $('.portletresponsivesliderportlet a.next').click(function(e){
      e.preventDefault();
      var slides = $('.portletresponsivesliderportlet ul li');
      var current = $('.portletresponsivesliderportlet ul li.current');
      var index = current.index();
      var next;
      if((index + 1) >= slides.size()){
        next = 0;
      }else{
        next = index + 1;
      }
      _swap(next);
    });
    $('.portletresponsivesliderportlet a.prev').click(function(e){
      e.preventDefault();
      var slides = $('.portletresponsivesliderportlet ul li');
      var current = $('.portletresponsivesliderportlet ul li.current');
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
  }
});
