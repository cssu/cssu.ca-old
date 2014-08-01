// To keep track of which slide we're on
var slide = 1;

// For the automatic slideshow
var interval = null;

// The DOM elements
var slideshow = document.getElementsByClassName('slideshow')[0],
    slides    = document.getElementsByClassName('slideshow-slide'),
    cards     = document.getElementsByClassName('slideshow-card'),
    prev      = document.getElementById('slideshow-prev'),
    next      = document.getElementById('slideshow-next');

for (var i = 0; i < cards.length; i++) {
  cards[i].onclick = (function(index) {
    return function() {
      slideshow.removeClass('slide-' + slide);
      slide = index + 1;
      slideshow.addClass('slide-' + slide);
    };
  })(i);
}

prev.onclick = function() {
  slideshow.removeClass('slide-' + slide);
  slide = slide - 1 > 0 ? slide - 1 : 4;
  slideshow.addClass('slide-' + slide);
};

next.onclick = nextSlide;

function nextSlide() {
  slideshow.removeClass('slide-' + slide);
  slide = slide + 1 < 5 ? slide + 1 : 1;
  slideshow.addClass('slide-' + slide);
}


// Auto-slideshow
function startSlideshow() {
  interval = setInterval(nextSlide, 3500);
}

slideshow.onmouseover = function() {
  clearInterval(interval);
}

slideshow.onmouseout = startSlideshow;

startSlideshow();


/* These are for IE support. */

Element.prototype.addClass = function(className) {
  if (this.classList)
    this.classList.add(className);
  else
    this.className += ' ' + className;
}

Element.prototype.removeClass = function(className) {
  if (this.classList)
    this.classList.remove(className);
  else
    this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}
