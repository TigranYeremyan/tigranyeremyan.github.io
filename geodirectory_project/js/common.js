$(document).ready(function () {

    $('#navbar-toggler').click(function () {
        $('#navBar').toggleClass('is-opened');
    });

    $('ul.nav > li').click(function () {
        $('ul.nav > li').removeClass('active');
        $(this).addClass('active');
    })

});

$(window).scroll(function () {
    var $navBar = $(".navbar");
    if ($(this).scrollTop() > 20) {
        $($navBar).addClass('overlayed');
    }
    else {
        $($navBar).removeClass('overlayed');
    }
});

