$(function () {
  var breakpoints = function () {
    var width = $('.test').width();
    $('.test').toggleClass('small', 0 <= width && width < 320);
    $('.test').toggleClass('medium', 320 <= width && width < 480);
    $('.test').toggleClass('large', 480 <= width);
  };

  $(document).on('ready', breakpoints);
  $(window).on('resize', breakpoints);
});
