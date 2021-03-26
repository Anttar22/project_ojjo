// Hamburger menu
(function () {
    const hamburgerBtn = document.querySelector('.hamburger')

    hamburgerBtn.addEventListener('click', function () {
        const wrapper = document.querySelector('.header__inner-wrapper')

        this.classList.toggle('is-active')



        if (this.classList.contains('is-active')) {
            wrapper.classList.add('hide')

            setTimeout(function () {
                wrapper.classList.add('active')
            }, 50)

            document.body.style.overflow = 'hidden'

        } else {
            wrapper.classList.remove('active')

            setTimeout(function () {
                wrapper.classList.remove('hide')
            }, 50)

            document.body.style.overflow = 'visible'
        }
    })

})();

// Tabs Btn active
(function () {
    const tabsBtn = document.querySelectorAll('.tabs__nav-btn')

    tabsBtn.forEach(function (item) {

        item.addEventListener('click', function (e) {
            e.preventDefault()

            tabsBtn.forEach(function (item) {
                item.classList.remove('active')
            })
            this.classList.add('active')
        })
    })
    tabsBtn[0].click()
})();

// Tabs Content active
(function () {
    const tabs = document.querySelectorAll('.tabs__nav-btn')
    const contents = document.querySelectorAll('.tabs__content-list')

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {

            const tabID = this.getAttribute('href').substring(1)

            contents.forEach(content => {
                content.classList.remove('active')

                if (content.getAttribute('id') === tabID) {
                    content.classList.add('active')
                }
            })
        })
    })
    contents[0].classList.add('active')
})();

// Video play
(function () {

    const btns = document.querySelectorAll('.social-section__video-control')


    btns.forEach(btn => {
        const video = btn.parentElement
        const display = video.querySelector('.video')
        const icon = btn.querySelector('use')

        btn.addEventListener('click', function () {

            if (display.paused) {
                display.play()
                icon.setAttribute('xlink:href', 'img/icon-sprite.svg#pause')
            } else {
                display.pause()
                icon.setAttribute('xlink:href', 'img/icon-sprite.svg#play')
            }
        })
    })
})();

// Modal widnows


(function () {
    const modal = $.modal({
        header: true,
        footer: true,
        title: 'Окно Antona',
        closed: true,
        width: '300px',
        content: '',

        authorization: {
            input: [
                {
                    type: 'text', placeholder: 'Имя'
                },
                {
                    type: 'password', placeholder: 'Пароль'
                },
            ],
            rememberCheckbox: false,
            action: 'test.php'
        },

        footerBtn: [
            {
                text: 'Ок', class: 'gray', handler() {
                    console.log('Сработала кнопка ОК')
                    modal.close()
                }
            },
            {
                text: 'Cancel', class: 'white', handler() {
                    console.log('Сработала кнопка CANCEL')
                    modal.close()
                }
            }
        ]

    }) // default

    const modalAuth = $.modal({
        header: true,
        footer: true,
        title: 'Авторизация',
        closed: true,
        width: '300px',

        authorization: {
            input: [
                {
                    type: 'text', placeholder: 'Имя'
                },
                {
                    type: 'password', placeholder: 'Пароль'
                },
            ],
            rememberCheckbox: true,
            action: 'test.php'
        },

        footerBtn: [
            {
                text: 'Войти', class: 'gray', handler() {
                    console.log('Сработала кнопка ОК')
                    modalAuth.close()
                }
            }
        ]

    })

    const modalSearch = $.modal({
        header: true,
        footer: false,
        title: 'Поиск',
        closed: false,
        width: '400px',

        authorization: {
            input: [
                {
                    type: 'text', placeholder: 'Что ищем?'
                }
            ]
        },

        footerBtn: [
            {
                text: 'Найти', class: 'gray', handler() {
                    console.log('Сработала кнопка ОК')
                    modalSearch.close()
                }
            }
        ]
    })





    const authBtn = document.querySelector('#login-btn')
    const serarchBtn = document.querySelector('#search-btn')

    authBtn.addEventListener('click', modalAuth.open)
    serarchBtn.addEventListener('click', modalSearch.open)
})()











