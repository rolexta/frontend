/*! [PROJECT_NAME] | Suitmedia */

((window, document, undefined) => {

    const path = {
        css: `${myPrefix}assets/css/`,
        js : `${myPrefix}assets/js/vendor/`
    }

    const assets = {
        _objectFit      : `${path.js}object-fit-images.min.js`,
        _headroom       : `${path.js}headroom.min.js`,
        _slick          : `${path.js}slick.min.js`
    }

    const slickPrev = '<button type="button" class="slick-prev"><span class="fa fa-angle-left"></span></button>'
    const slickNext = '<button type="button" class="slick-next"><span class="fa fa-angle-right"></span></button>'

    const Site = {
        enableActiveStateMobile() {
            if ( document.addEventListener ) {
                document.addEventListener('touchstart', () => {}, true)
            }
        },

        WPViewportFix() {
            if ( '-ms-user-select' in document.documentElement.style && navigator.userAgent.match(/IEMobile/) ) {
                let style = document.createElement('style')
                let fix = document.createTextNode('@-ms-viewport{width:auto!important}')

                style.appendChild(fix)
                document.head.appendChild(style)
            }
        },

        objectFitPolyfill() {
            load(assets._objectFit).then( () => {
                objectFitImages()
            })
        },

        headRoom() {
            let myElement = document.querySelector('.site-header')
            // construct an instance of Headroom, passing the element
            let headroom  = new Headroom(myElement)
            // initialise
            headroom.init()
        },

        introSlide() {
            let $slider = $('.section-intro')
            if(!$slider.length) return;
            Modernizr.load({
                load    : assets._slick,
                complete: function() {
                    $slider.slick({
                        prevArrow: slickPrev,
                        nextArrow: slickNext
                    })
                }
            })
        },

        mainNav() {
            let $nav    = $('.main-nav')

            function toggleNav(e) {
                e.preventDefault()
                if($nav.hasClass('is-active')) {
                    $nav.removeClass('is-active')
                } else {
                    $nav.addClass('is-active')
                }
            }

            $nav.off('click', '.btn-trigger', toggleNav)
            $nav.on('click', '.btn-trigger', toggleNav)
        }
    }

    Promise.all([
        load(assets._headroom)
    ]).then(() => {
        for (let fn in Site) {
            Site[fn]()
        }
        window.Site = Site
    })

    function exist(selector) {
        return new Promise((resolve, reject) => {
            let $elem = $(selector)

            if ( $elem.length ) {
                resolve($elem)
            } else {
                reject(`no element found for ${selector}`)
            }
        })
    }

    function load(url) {
        return new Promise((resolve, reject) => {
            Modernizr.load({
                load: url,
                complete: resolve
            })
        })
    }

    function loadJSON(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then(res => {
                if ( res.ok ) {
                    resolve(res.json())
                } else {
                    reject('Network response not ok')
                }
            }).catch(e => {
                reject(e)
            })
        })
    }

})(window, document)
