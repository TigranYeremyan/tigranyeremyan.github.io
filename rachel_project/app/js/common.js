$(document).ready(function () {
    $("#to-form").click(function () {
        $('html, body').animate({
            scrollTop: $("#section-form").offset().top
        }, 1200);
    });
    $('#username').click(function (e) {
        e.stopPropagation();
        $('#username-label').addClass('translated-0')
        $('#username-label').removeClass('translated')
    });
    function checkUsername() {
        var value = $('#username').val().trim(" ");
        return value.length === 0;
    };
    $('body').click(function () {
        if (checkUsername()) {
            $('#username-label').removeClass('translated-0')
            $('#username-label').addClass('translated')
        }
    });
    $('#password').click(function (e) {
        e.stopPropagation();
        $('#password-label').addClass('translated-0')
        $('#password-label').removeClass('translated')
    });
    function checkPassword() {
        var value = $('#password').val();
        return value.length === 0;
    };
    $('body').click(function () {
        if (checkPassword()) {
            $('#password-label').removeClass('translated-0')
            $('#password-label').addClass('translated')
        }
    });
});

