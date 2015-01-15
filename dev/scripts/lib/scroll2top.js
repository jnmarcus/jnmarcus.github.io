$(window).scroll(function() {
  $('#device1').each(function(){
    var imagePos = $(this).offset().top;

    var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+400) {
      $(this).addClass("slideUp");
    }
  });
});

//$(document).ready(function(){
//  $('body').append('<div id="toTop" class="btn btn-info"><span class="glyphicon glyphicon-chevron-up"></span> Back to Top</div>');
//  $(window).scroll(function () {
//    if ($(this).scrollTop() != 0) {
//      $('#toTop').fadeIn();
//    } else {
//      $('#toTop').fadeOut();
//    }
//  });
//  $('#toTop').click(function(){
//    $("html, body").animate({ scrollTop: 0 }, 600);
//    return false;
//  });
//});

//$(document).ready(function(){
//  $(window).scroll(function () {
//    if ($(this).scrollTop() > 50) {
//      $('#back-to-top').fadeIn();
//    } else {
//      $('#back-to-top').fadeOut();
//    }
//  });
//  // scroll body to 0px on click
//  $('#back-to-top').click(function () {
//    $('#back-to-top').tooltip('hide');
//    $('body,html').animate({
//      scrollTop: 0
//    }, 800);
//    return false;
//  });
//
//  $('#back-to-top').tooltip('show');
//
//});