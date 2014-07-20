// To keep track of which slide we're on
var slide = 1;

// The DOM elements
var slideshow = document.getElementsByClassName('slideshow')[0];
var slides    = document.getElementsByClassName('slideshow-slides')[0].getElementsByTagName('li');
var cards     = document.getElementsByClassName('slideshow-cards')[0].getElementsByTagName('li');
var prev      = document.getElementById('slideshow-prev');
var next      = document.getElementById('slideshow-next');

for (var i = 0; i < cards.length; i++) {
  cards[i].onclick = (function(index) {
    return function() {
      slideshow.classList.remove('slide-' + slide);
      slide = index + 1;
      slideshow.classList.add('slide-' + slide);
    };
  })(i);
}

prev.onclick = function() {
  slideshow.classList.remove('slide-' + slide);
  slide = slide - 1 > 0 ? slide - 1 : 4;
  slideshow.classList.add('slide-' + slide);
};

next.onclick = function() {
  slideshow.classList.remove('slide-' + slide);
  slide = slide + 1 < 5 ? slide + 1 : 1;
  slideshow.classList.add('slide-' + slide);
};
