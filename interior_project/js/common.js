$(document).ready(function () {

    /* Modal slider init */
    $('.overlay a[data-toggle="modal"]').click(function () {
        var index  = $(this).data('index');
        nslider.init(index)
        nslider.getSlides()
        mcThumbnailSlider.init(index)
    })


    $('.navbar-nav li').on('click', function () {
        $('.navbar-nav li').removeClass('active');
        $(this).addClass('active');
    });

    $('.testimonial').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.portfolio-inner-slider').slick({
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    $("#pagination-button").click(function () {
        $('html, body').animate({
            scrollTop: $("#news").offset().top
        }, 1200);
    });

    var $grid = $('.grid').masonry({
        columnWidth: ".item",
        itemSelector: ".item"
    });

    $grid.imagesLoaded().progress(function () {
        $grid.masonry('layout');
    });
    window.sr = ScrollReveal();
    sr.reveal('.tiles-wrapper .grid img', {duration: 800});

     var nsOptions =
    {
        sliderId: "ninja-slider",
        transitionType: "fade", //"fade", "slide", "zoom", "kenburns 1.2" or "none"
        autoAdvance: false, //If autoAdvance is required, don't set this to true. You can set the autoAdvance of the Thumbnail Slider to true because the "before" callback function listed below has been set to let this slider to be driven by the Thumbnail Slider.
        rewind: false,
        delay: "default",
        transitionSpeed: 400,
        aspectRatio: "1:1",
        initSliderByCallingInitFunc: true,
        shuffle: false,
        startSlideIndex: 0, //0-based
        navigateByTap: true,
        keyboardNav: true,
        m:false,
        before: function (currentIdx, nextIdx, manual) {
            if (manual && typeof mcThumbnailSlider != "undefined") mcThumbnailSlider.display(nextIdx);
        },
        license: "mylicense"
    };

    var nslider = new NinjaSlider(nsOptions);
    var thumbnailSliderOptions =
    {
        sliderId: "thumbnail-slider",
        orientation: "horizontal",
        thumbWidth: "auto",
        thumbHeight: "50px",
        showMode: 3,
        autoAdvance: false,
        selectable: true,
        slideInterval: 3000,
        transitionSpeed: 700,
        shuffle: false,
        startSlideIndex: 0, //0-based
        pauseOnHover: true,
        initSliderByCallingInitFunc: true,
        rightGap: null,
        keyboardNav: false,
        mousewheelNav: true,
        before: function (currentIdx, nextIdx, manual) {
            if (typeof nslider != "undefined")  nslider.displaySlide(nextIdx);
        },
        license: "b2e98"
    };

    var mcThumbnailSlider = new ThumbnailSlider(thumbnailSliderOptions);
});

