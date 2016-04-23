'use strict';

(function(){

// To keep track of which slide we're on
var slide = 1;

// For the auto-rotating slideshow
var interval = null;

// The DOM elements
var slideshow = document.getElementById('slideshow'),
    slides    = document.getElementsByClassName('slideshow-slide'),
    cards     = document.getElementsByClassName('slideshow-card'),
    pause     = document.getElementById('slideshow-pause'),
    prev      = document.getElementById('slideshow-prev'),
    next      = document.getElementById('slideshow-next');

// Handle the cards -- show the respective card using the CSS classes
// .slide-1 would show the first slide, slide-2 for the second, and so on
for (var i = 0, len = cards.length; i < len; i++) {
  cards[i].onclick = (function(index) {
    return function() {
      slideshow.classList.remove('slide-' + slide);
      slide = index + 1;
      slideshow.classList.add('slide-' + slide);
    };
  })(i);
}

// Handle the navigation buttons, again manipulating the CSS classes
prev.onclick = function() {
  slideshow.classList.remove('slide-' + slide);
  slide = slide - 1 > 0 ? slide - 1 : cards.length;
  slideshow.classList.add('slide-' + slide);
};

// This is a separate function so it can be used for the auto-rotating function
function nextSlide() {
  slideshow.classList.remove('slide-' + slide);
  slide = slide + 1 <= cards.length ? slide + 1 : 1;
  slideshow.classList.add('slide-' + slide);
}

next.onclick = nextSlide;

// Handle the auto-rotating functionality of the slideshow
function startSlideshow() {
  interval = setInterval(nextSlide, 4000);
}

// Handle play/pause button
pause.onclick = function() {
  if (interval) {
    clearInterval(interval);
    interval = null;
    this.classList.add('paused');
  } else {
    startSlideshow();
    this.classList.remove('paused');
  }
};

startSlideshow();

})();
