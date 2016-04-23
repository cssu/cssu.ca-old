'use strict';

// To keep track of which slide we're on (1 through 4)
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
// .slide-1 would show the first slide, slide-2 for the second, and so on.
for (var i = 0; i < cards.length; i++) {
  cards[i].onclick = (function(index) {
    return function() {
      slideshow.removeClass('slide-' + slide);
      slide = index + 1;
      slideshow.addClass('slide-' + slide);
    };
  })(i);
}

// Handle the navigation buttons, again manipulating the CSS classes
prev.onclick = function() {
  slideshow.removeClass('slide-' + slide);
  slide = slide - 1 > 0 ? slide - 1 : 4;
  slideshow.addClass('slide-' + slide);
};

// This is a separate function so it can be used for the auto-rotating function
function nextSlide() {
  slideshow.removeClass('slide-' + slide);
  slide = slide + 1 < 5 ? slide + 1 : 1;
  slideshow.addClass('slide-' + slide);
}

next.onclick = nextSlide;

// Handle the auto-rotating functionality of the slideshow
function startSlideshow() {
  interval = setInterval(nextSlide, 3750);
}

// Handle play/pause button
pause.onclick = function() {
  if (interval) {
    clearInterval(interval);
    interval = null;
    this.addClass('paused');
  } else {
    startSlideshow();
    this.removeClass('paused');
  }
};

startSlideshow();


// These are for IE support
Element.prototype.addClass = function(className) {
  if (this.classList)
    this.classList.add(className);
  else
    this.className += ' ' + className;
};

Element.prototype.removeClass = function(className) {
  if (this.classList)
    this.classList.remove(className);
  else
    this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
};
