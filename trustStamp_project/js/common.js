$(document).ready(function () {

    $('#navbar-toggler').click(function () {
        $('#navBar').toggleClass('is-opened');
    });

    $('ul.nav > li').click(function () {
        $('ul.nav > li').removeClass('active');
        $(this).addClass('active');
    })

});


