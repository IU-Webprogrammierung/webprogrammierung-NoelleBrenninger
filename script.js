$('.faq-accordeon button').on('click', function () {
    const $clickedButton = $(this);
    const targetId = $clickedButton.attr('aria-controls');
    const $targetAnswer = $('#' + targetId);
    const isCurrentlyExpanded = $clickedButton.attr('aria-expanded') === 'true';

    $('.faq-accordeon button[aria-expanded="true"]').not($clickedButton).each(function () {
        const $otherButton = $(this);
        const otherTargetId = $otherButton.attr('aria-controls');
        const $otherAnswer = $('#' + otherTargetId);
        $otherButton.attr('aria-expanded', 'false');
        $otherAnswer.slideUp(300);
    });
    if (isCurrentlyExpanded) {
        $clickedButton.attr('aria-expanded', 'false');
        $targetAnswer.slideUp(300);
    } else {
        $clickedButton.attr('aria-expanded', 'true');
        $targetAnswer.slideDown(300);
    }
});

$('.prozess-steps .prozess-card').on('click', function () {
    const $clickedTab = $(this);
    if ($clickedTab.attr('aria-selected') === 'true') {
        return;
    }
    $('.prozess-steps .prozess-card').attr('aria-selected', 'false').attr('tabindex', '-1');
    $clickedTab.attr('aria-selected', 'true').attr('tabindex', '0').focus();
    $('.prozess-details').hide();
    const targetContentId = '#' + $clickedTab.attr('aria-controls');
    $(targetContentId).fadeIn(300);
});

$('.prozess-steps').on('keydown', '.prozess-card', function (e) {
    const $currentTab = $(this);
    const $tabs = $('.prozess-steps .prozess-card');
    let index = $tabs.index($currentTab);
    let newIndex = -1;
    switch (e.key) {
        case 'ArrowLeft':
            newIndex = (index - 1 + $tabs.length) % $tabs.length;
            break;
        case 'ArrowRight':
            newIndex = (index + 1) % $tabs.length;
            break;
        case 'Home':
            newIndex = 0;
            break;
        case 'End':
            newIndex = $tabs.length - 1;
            break;
        default:
            return;
    }

     if (newIndex !== -1) {
        e.preventDefault();
 const $newTab = $tabs.eq(newIndex);
  $currentTab.attr('aria-selected', 'false').attr('tabindex', '-1');
$newTab.attr('aria-selected', 'true').attr('tabindex', '0');
        $newTab.focus();
 $('.prozess-details').hide();
        const targetContentId = '#' + $newTab.attr('aria-controls');
        $(targetContentId).fadeIn(300);
    }
});



    const $btn = $('.to-top-link');
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 200) {
            $btn.addClass('visible');
        } else {
            $btn.removeClass('visible');
        }
    });

    $btn.on('click', function (e) {
        e.preventDefault();

        const targetId = $(this).attr('href');
        const $targetElement = $(targetId);

        if ($targetElement.length) {
            $('html, body').animate({
                scrollTop: $targetElement.offset().top
            }, 800, function () {
                $(e.currentTarget).blur();
            });
        } else {
            $(e.currentTarget).blur();
        }
    });

    const $galleryThumbs = $('.gallery-thumb');
    const $lightboxOverlay = $('#lightbox-overlay');
    const $lightboxImage = $lightboxOverlay.find('.lightbox-image');
    const $lightboxCloseBtn = $lightboxOverlay.find('.lightbox-close');
    const $body = $('body');

    let $lastFocusedThumbnail = null;

    const closeLightboxLogic = () => {
        $body.removeClass('no-scroll');
        $lightboxOverlay.removeClass('is-open');
        $lightboxOverlay.attr('aria-hidden', 'true');
        if ($lastFocusedThumbnail) {
            $lastFocusedThumbnail.focus();
        }
        setTimeout(() => {
            $lightboxImage.removeAttr('src');
            $lightboxImage.removeAttr('alt');
        }, 300);
    };

    $galleryThumbs.on('click', function (e) {
        e.preventDefault();

        const $clickedImg = $(this).find('img');
        const imgSrc = $clickedImg.attr('src');
        const imgAlt = $clickedImg.attr('alt');

        $lastFocusedThumbnail = $(this);
        $lightboxImage.attr('src', imgSrc);
        $lightboxImage.attr('alt', imgAlt);
        $body.addClass('no-scroll');
        $lightboxOverlay.addClass('is-open');
        $lightboxOverlay.attr('aria-hidden', 'false');
        $lightboxCloseBtn.focus();
    });

    $lightboxCloseBtn.on('click', closeLightboxLogic);

    $lightboxOverlay.on('click', function (e) {
        if ($(e.target).is($lightboxOverlay)) {
            closeLightboxLogic();
        }
    });

    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && $lightboxOverlay.hasClass('is-open')) {
            closeLightboxLogic();
        }
    });

    $lightboxOverlay.on('keydown', function (e) {
        if (!$lightboxOverlay.hasClass('is-open')) {
            return;
        }

        const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

        if (!isTabPressed) {
            return;
        }

        const focusableElements = $lightboxOverlay.find('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])').filter(':visible');
        const firstFocusableElement = focusableElements.first();
        const lastFocusableElement = focusableElements.last();

        if (e.shiftKey) {
            if ($(document.activeElement).is(firstFocusableElement)) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else {
            if ($(document.activeElement).is(lastFocusableElement)) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    });