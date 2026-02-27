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

$(function () {
    const $btn = $('.to-top-link');
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 200) {
            $btn.addClass('visible');
        } else {
            $btn.removeClass('visible');
        }
    });
});