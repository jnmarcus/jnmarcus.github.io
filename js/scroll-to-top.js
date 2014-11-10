$(document).ready(function(){
     $(window).scroll(function () {
            if ($(this).scrollTop() > 75) {
                $('#scroll-to-top').fadeIn();
            } else {
                $('#scroll-to-top').fadeOut();
            }
        });
        // scroll body to 0px on click
        $('#scroll-to-top').click(function () {
            $('#scroll-to-top').tooltip('hide');
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
        
        $('##scroll-to-top').tooltip('show');

});