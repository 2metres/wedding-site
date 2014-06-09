$('.site-nav a').smoothScroll();

$('#details').waypoint(function() {
  $('.site-nav').toggleClass('fixed-top');
}, { offset: 100 });