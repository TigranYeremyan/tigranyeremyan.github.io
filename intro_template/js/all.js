(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

window.addEventMultiple = function (element, events, callback) {
    events.forEach(function (event) {
        element.addEventListener(event, callback);
    });
};

var checkNavContent = function checkNavContent(navbarElem, targetElem) {
    var pageScrollY = window.scrollY;
    var topNav = document.getElementById(navbarElem);
    var targetElemEnd = document.getElementById(targetElem).offsetHeight;
    if (pageScrollY > targetElemEnd - topNav.offsetHeight && topNav) {
        topNav.classList.add('scrolled');
        topNav.classList.add('is-sticky');
    } else {
        topNav.classList.remove('scrolled');
        topNav.classList.remove('is-sticky');
    }
};

function progressBar() {
    var progressHolder = $('#skills-progress');
    if (!progressHolder.length) return;
    var elementTop = progressHolder.offset().top;
    var elementBottom = elementTop + progressHolder.outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    var isInViewport = elementBottom > viewportTop && elementTop < viewportBottom;
    if (progressHolder && isInViewport) {
        $(".progress-item").each(function () {
            var value = $(this).attr("data-value");
            var width = value + "%";
            $(this).find(".bar").css("width", width);
        });
    }
}

var openMenu = function openMenu() {
    var toggler = document.getElementById("menu-toggler");
    var topNav = document.getElementById("menu-top");
    toggler.addEventListener('click', function () {
        if (window.matchMedia("(min-width: 992px)").matches) {
            if (topNav.classList.contains('scrolled')) {
                topNav.classList.remove('scrolled');
            } else {
                topNav.classList.add('scrolled');
            }
        }
        if (window.matchMedia("(max-width: 991px)").matches) {
            var mobileMenu = document.getElementById('navbar');
            toggler.classList.toggle('opened');
            mobileMenu.classList.toggle('opened');
            if (mobileMenu.classList.contains('opened')) {
                window.addEventListener('scroll', function () {
                    toggler.classList.remove('opened');
                    mobileMenu.classList.remove('opened');
                });
            }
        }
    });
};

var setActivePricingCard = function setActivePricingCard() {
    var pricingCards = document.querySelectorAll('.pricing-card-1');
    if (pricingCards && window.matchMedia("(min-width: 768px)").matches) {
        var _loop = function _loop(i) {
            var self = pricingCards[i];
            self.onmouseenter = function () {
                pricingCards.forEach(function (item) {
                    item.classList.remove('active');
                });
                self.classList.add('active');
                self.querySelector('.btn').classList.remove('black');
                self.querySelector('.btn').classList.add('white-light-green');
            };
            self.ontouchstart = function () {
                pricingCards.forEach(function (item) {
                    item.classList.remove('active');
                });
                self.classList.add('active');
                self.querySelector('.btn').classList.remove('black');
                self.querySelector('.btn').classList.add('white-light-green');
            };
            self.onmouseleave = function () {
                pricingCards.forEach(function (item) {
                    item.classList.remove('active');
                });
                pricingCards[1].classList.add('active');
                self.querySelector('.btn').classList.add('black');
                self.querySelector('.btn').classList.remove('white-light-green');
            };
            self.ontouchend = function () {
                pricingCards.forEach(function (item) {
                    item.classList.remove('active');
                });
                pricingCards[1].classList.add('active');
                self.querySelector('.btn').classList.add('black');
                self.querySelector('.btn').classList.remove('white-light-green');
            };
        };

        for (var i = 0; i < pricingCards.length; i++) {
            _loop(i);
        }
    }
};

var openMapBoard = function openMapBoard() {
    var boardSwitcher = document.getElementById('boardSwitcher');
    if (boardSwitcher) {
        boardSwitcher.addEventListener('click', function () {
            boardSwitcher.classList.toggle('map-closed');
        });
    }
};

var scrollToElem = function scrollToElem(element, target, diffElement) {
    var elemExist = document.querySelector(element);
    if (!elemExist) return;
    elemExist.addEventListener('click', function () {
        var scrollTarget = document.getElementById(target);
        var headerHeight = document.getElementById(diffElement).offsetHeight;
        var scrollTargetTop = scrollTarget.offsetTop;
        var absScrollPos = scrollTargetTop - headerHeight;
        $('html, body').animate({
            scrollTop: absScrollPos
        }, 950);
    });
};

var openNavSearch = function openNavSearch() {
    var searchIcon = document.getElementById('navSearchIcon');
    if (searchIcon) {
        var searchField = document.getElementById('navSearchField');
        var searchFieldCloser = document.getElementById('navSearchFieldCloser');
        searchIcon.addEventListener('click', function () {
            searchField.classList.add('opened');
        });
        searchFieldCloser.addEventListener('click', function () {
            searchField.classList.remove('opened');
        });
    }
};

addEventMultiple(window, ['load', 'scroll'], function () {
    checkNavContent('menu-top', 'banner-1');
    progressBar();
});

addEventMultiple(window, ['load'], function () {
    openMenu();
});

function productRadioButton() {
    $(".product-radio").each(function () {
        var colorCode = $(this).children("label").attr("data-color-code");
        var colorName = $(this).children("label").attr("data-color-name");
        $(this).css("border-color", colorCode);
        $(this).children("label").css("background-color", colorCode);
        $(this).children("input").on("click", function () {
            $(this).closest(".color").children("p").children(".selected-color").text(colorName);
        });
    });
}

$(document).ready(function () {
    $("#owl-team-main").owlCarousel({
        dots: false,
        responsive: {
            320: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        },
        nav: true,
        navText: ["<span class='fa fa-arrow-left text-white'></span>", "<span class='fa fa-arrow-right text-white'></span>"]
    });
    $("#owl-team").owlCarousel({
        dots: false,
        responsive: {
            320: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        },
        nav: true,
        navText: ["<span class='fa fa-arrow-left'></span>", "<span class='fa fa-arrow-right'></span>"]
    });
    $("#owl-testimonial").owlCarousel({
        dots: false,
        responsive: {
            320: {
                items: 1
            },
            768: {
                items: 1
            }
        },
        nav: true,
        navText: ["<span class='fa fa-arrow-left'></span>", "<span class='fa fa-arrow-right'></span>"]
    });
    $('#owl-product').owlCarousel({
        dots: true,
        nav: false,
        autoplay: true,
        animateOut: 'slideOutDown',
        animateIn: 'flipInX',
        items: 1,
        smartSpeed: 450
    });
    $(".selectize").selectize();
    $(".nice-select").niceSelect();
    productRadioButton();
    $(".wc_payment_method .custom-radio label").each(function () {
        $(this).on("click", function () {
            $(".wc_payment_method .payment_box").slideUp();
            // $(this).closest(".custom-radio").next(".payment_box").slideDown();
        });
    });
    function woocommerceInfoToggle() {
        $(".woocommerce-info").each(function () {
            $(this).find(".woocommerce-info-toggle").on("click", function (event) {
                event.preventDefault();
                $(this).next("form").slideToggle();
            });
        });

        $(".create-account label").on("click", function () {
            $(this).closest(".create-account").next(".password-field").slideToggle();
        });

        $(".diff_shipping_address").on("click", function () {
            $(this).closest(".custom-checkbox").next(".diff-shipping-address").slideToggle();
        });

        $(".wc_payment_method .custom-radio label").each(function () {
            $(this).on("click", function () {
                $(".wc_payment_method .payment_box").slideUp();
                $(this).closest(".custom-radio").next(".payment_box").slideDown();
            });
        });
    }
    woocommerceInfoToggle();
});

$(window).on('load', function () {
    function isotopeMasonry() {
        $(".isotope-gutter").isotope({
            itemSelector: '[class^="col-"]',
            percentPosition: true
        });
        $(".isotope-no-gutter").isotope({
            itemSelector: '[class^="col-"]',
            percentPosition: true
        });
        $(".isotope-filter a").on("click", function () {
            $(".isotope-filter a").removeClass("active");
            $(this).addClass("active");
            // portfolio fiter
            var selector = $(this).attr("data-filter");
            $(".isotope-gutter, .isotope-no-gutter").isotope({
                filter: selector + ", .filter-wrapper",
                animationOptions: {
                    duration: 750,
                    easing: "linear",
                    queue: false
                }
            });
            return false;
        });
    }
    isotopeMasonry();
    scrollToElem('#brandImg', 'banner-1', 'menu-top');
    scrollToElem('#nav-home-1', 'banner-1', 'menu-top');
    openNavSearch();
    openMapBoard();
    setActivePricingCard();
    $(".quantity-field .add").on("click", function () {
        $(this).prev().val(+$(this).prev().val() + 1);
    });
    $(".quantity-field .sub").on("click", function () {
        if ($(this).next().val() > 0) $(this).next().val(+$(this).next().val() - 1);
    });
});

},{}]},{},[1]);
