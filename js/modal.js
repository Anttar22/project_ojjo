const $ = {}


Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}

function noop() { }

function createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal__footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn--${btn.class}`)
        $btn.onclick = btn.handler || noop()

        wrap.appendChild($btn)
    })

    return wrap
}

function createModalAuthorization(input = [], rememberCheckbox, action = '') {
    if (input.length === 0) {
        return document.createElement('div')
    }

    const inputWrap = document.createElement('div')
    inputWrap.classList.add('modal__wrapper')

    input.forEach(input => {
        const $inp = document.createElement('input')
        $inp.classList.add('modal__input')
        $inp.setAttribute('type', input.type)
        $inp.setAttribute('placeholder', input.placeholder)

        inputWrap.appendChild($inp)
    })


    const labelCheckbox = document.createElement('label')
    labelCheckbox.classList.add('modal__label')
    labelCheckbox.insertAdjacentHTML('afterbegin', `
            <input class="modal__label-checkbox" type="checkbox" checked>
            <span class="modal__label-title">Запомнить</span>
    `)

    rememberCheckbox ? inputWrap.append(labelCheckbox) : ''


    const form = document.createElement('form')
    form.setAttribute('action', action)

    form.appendChild(inputWrap)


    return form
}


function createModal(options) {
    const modal = document.createElement('div')
    modal.classList.add('modal')
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal__overlay" data-close="true">
            <div class="modal__window" data-shift style="width: ${options.width || '400px'}">
                ${options.closed ? `
                    <button class="modal__close" data-close="true">
                        <svg class="icon icon--cross" data-close="true">
                            <use xlink:href="img/icon-sprite.svg#cross" data-close="true">
                        </svg>
                    </button>
                ` : ''}

                ${options.header ? `
                    <div class="modal__header">
                        <h3 class="modal__title">${options.title || 'Окно'}</h3>
                    </div>
                ` : ''}

                <div class="modal__body" data-content>
                    ${options.content || ''}
                </div>
            </div>
        </div>
    `)

    const footer = createModalFooter(options.footerBtn)
    footer.appendAfter(modal.querySelector('[data-content]'))

    const input = createModalAuthorization(
        options.authorization.input,
        options.authorization.rememberCheckbox,
        options.authorization.action)
    modal.querySelector('.modal__body').appendChild(input)

    document.body.prepend(modal)
    return modal
}

function scrollWidth() {
    let div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.append(div);
    let sWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    return sWidth
}

$.modal = function (options) {

    const modal = createModal(options)

    const elShift = document.querySelectorAll('[data-shift]')

    const m = {
        open() {
            modal.classList.add('active')
            document.documentElement.classList.add('disable-scroll')

            elShift.forEach(elem => {
                elem.style.left = '-' + scrollWidth() / 2 + 'px'
            })
        },

        close() {
            modal.classList.remove('active')
            document.documentElement.classList.remove('disable-scroll')


            elShift.forEach(elem => {
                elem.style.left = ''
            })
        },

        setContent(html) {
            modal.querySelector('[data-content]').innerHTML = html
        },

        destroy() { }
    }

    const closedEsc = e => {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                m.close()
            }
        }


    }

    const listener = e => {
        if (e.target.dataset.close) {
            m.close()
        }
    }
    modal.addEventListener('mousedown', listener)
    document.body.addEventListener('keydown', closedEsc)

    return m
}


