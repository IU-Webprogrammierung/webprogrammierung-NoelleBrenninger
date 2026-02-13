$("#page-header").load("components/header.component");
$("#footer").load("components/footer.component");
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