// iPhone scaling bug fix by @mathias, @cheeaun and @jdalton
(function(doc) {

    var addEvent = 'addEventListener',
        type = 'gesturestart',
        qsa = 'querySelectorAll',
        scales = [1, 1],
        meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

    function fix() {
        meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
        doc.removeEventListener(type, fix, true);
    }

    if ((meta = meta[meta.length - 1]) && addEvent in doc) {
        fix();
        scales = [0.25, 1.6];
        doc[addEvent](type, fix, true);
    }

}(document));

(function($) {
    $(function() {
        $(window).scroll(function() {
            var winTop = $(window).scrollTop();
            if (winTop >= 120) {
                $('.sticky-header').addClass('header-slide-down');
            } else {
                $('.sticky-header').removeClass('header-slide-down');
            }
        });
    });

    $(document).ready(function() {
        $('.site-header').clone().addClass('sticky-header').insertBefore('.site-header');

        $('.scroll-to').click(function(e) {
            e.preventDefault();

            var outer_height  = $('header[role="banner"]').first().outerHeight();
            var full_url      = this.href;
            var parts         = full_url.split('#');
            var trgt          = parts[1];
            var target_offset = $('#' + trgt).offset();
            var target_top    = target_offset.top - outer_height;

            $('html, body').animate({scrollTop:target_top}, 500);
        });

        $('.video-modal').magnificPopup({
            disableOn       : 720,
            type            : 'iframe',
            mainClass       : 'mfp-fade',
            removalDelay    : 160,
            preloader       : false,
            fixedContentPos : false,
            showCloseBtn    : true,
            closeBtnInside  : true,
            closeMarkup     : '<button title="%title%" type="button" class="mfp-close"><span class="screen-reader-text">Close</span></button>'
        });

        $('.vid-block').fitVids();
    });

})(jQuery);