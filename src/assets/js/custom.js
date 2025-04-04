(function ($) {
	"use strict";

	// Owl Carousel Initialization
	$('.owl-men-item').owlCarousel({
		items: 5,
		loop: true,
		dots: true,
		nav: true,
		margin: 30,
		responsive: {
			0: { items: 1 },
			600: { items: 2 },
			1000: { items: 3 }
		}
	});

	$('.owl-women-item').owlCarousel({
		items: 5,
		loop: true,
		dots: true,
		nav: true,
		margin: 30,
		responsive: {
			0: { items: 1 },
			600: { items: 2 },
			1000: { items: 3 }
		}
	});

	$('.owl-kid-item').owlCarousel({
		items: 5,
		loop: true,
		dots: true,
		nav: true,
		margin: 30,
		responsive: {
			0: { items: 1 },
			600: { items: 2 },
			1000: { items: 3 }
		}
	});

	// Header Background on Scroll
	$(window).scroll(function () {
		var scroll = $(window).scrollTop();
		var box = $('#top').height();
		var header = $('header').height();

		if (scroll >= box - header) {
			$("header").addClass("background-header");
		} else {
			$("header").removeClass("background-header");
		}
	});

	// Mobile Menu Fix
	mobileNav();

	// Scroll animation initialization
	window.sr = new scrollReveal();

	// Menu Dropdown Toggle
	if ($('.menu-trigger').length) {
		$(".menu-trigger").on('click', function () {
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}

	// Menu Elevator Animation with Updated Code
	$('.scroll-to-section a[href]').not('[href="javascript:;"]').on('click', function (e) {
		e.preventDefault();

		$(document).off("scroll");

		$('.scroll-to-section a').each(function () {
			$(this).removeClass('active');
		});
		$(this).addClass('active');

		var target = this.hash;
		var targetElement = $(target);
		if (targetElement.length) {
			$('html, body').stop().animate({
				scrollTop: (targetElement.offset().top) - 79
			}, 500, 'swing', function () {
				window.location.hash = target;
				$(document).on("scroll", onScroll);
			});
		}
	});

	// Scroll Highlight Function
	function onScroll(event) {
		var scrollPos = $(document).scrollTop();
		$('.nav a').each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));

			// Ensure refElement exists
			if (refElement.length) {
				if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
					$('.nav ul li a').removeClass("active");
					currLink.addClass("active");
				} else {
					currLink.removeClass("active");
				}
			}
		});
	}

	// Page Loading Animation
	$(window).on('load', function () {
		if ($('.cover').length) {
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function () {
			setTimeout(function () {
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});

	// Window Resize Mobile Menu Fix
	$(window).on('resize', function () {
		mobileNav();
	});

	// Mobile Menu Logic
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function () {
			if (width < 767) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}
})(window.jQuery);
