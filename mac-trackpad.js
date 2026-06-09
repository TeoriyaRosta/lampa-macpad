(function () {
    'use strict';

    var NAME = 'MacPad';

    var CSS = `
        .card, .card__view, .menu__item, .selector,
        .settings__list-item, .head__action, .button,
        [data-action], .full-start__button, .category__item,
        .extensions__item, .online_prextends__item,
        .items-scroll .card, .layer--menu .menu__item, .simple-button {
            cursor: pointer !important;
        }
        .card .card__view {
            transition: transform 0.12s ease, box-shadow 0.12s ease !important;
        }
        .card:hover .card__view {
            transform: scale(1.04) !important;
            box-shadow: 0 8px 24px rgba(0,0,0,0.5) !important;
            z-index: 5;
        }
        .menu__item:hover,
        .settings__list-item:hover,
        .selector:hover,
        .extensions__item:hover {
            background: rgba(255,255,255,0.12) !important;
            border-radius: 8px;
        }
        .items-scroll::-webkit-scrollbar,
        .scroll__list::-webkit-scrollbar,
        .scroll__body::-webkit-scrollbar { height: 0; width: 0; }
    `;

    function injectCSS() {
        if (document.getElementById('macpad-styles')) return;
        var el = document.createElement('style');
        el.id = 'macpad-styles';
        el.textContent = CSS;
        (document.head || document.documentElement).appendChild(el);
    }

    // Вертикальный скролл колёсиком → горизонтальный для каруселей
    function setupScroll() {
        document.addEventListener('wheel', function (e) {
            try {
                var row = e.target.closest('.items-scroll, .scroll--horizontal');
                if (!row) return;
                var horizontalOnly =
                    row.scrollWidth > row.clientWidth + 4 &&
                    row.scrollHeight <= row.clientHeight + 4;
                if (horizontalOnly && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                    e.preventDefault();
                    row.scrollLeft += e.deltaY * 1.4;
                }
            } catch (_) {}
        }, { passive: false });
    }

    function init() {
        try {
            injectCSS();
            setupScroll();
            console.log('[' + NAME + '] активирован');
            if (window.Lampa && Lampa.Noty) Lampa.Noty.show('MacPad активирован');
        } catch (err) {
            console.error('[' + NAME + '] ошибка init:', err);
        }
    }

    // Безопасный старт: ждём Lampa, но не падаем если её нет
    var tries = 0;
    var t = setInterval(function () {
        tries++;
        if (window.Lampa || tries > 40) {
            clearInterval(t);
            init();
        }
    }, 250);

})();
