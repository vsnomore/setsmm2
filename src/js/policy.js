document.addEventListener('DOMContentLoaded', () => {

    //Мобільне меню
    const mobMenu = document.querySelector('.header');
    const burger = document.querySelector('.hamburger');
    const mobLinks = document.querySelectorAll('.menu__link');
    let mobMenuActive = false;

    burger.addEventListener('click', (e) => {
        if (mobMenuActive) {
            burger.classList.remove('hamburger__icon-active');
            mobMenu.style.left = "-100%";
            mobMenuActive = false;
            document.body.style.overflow = '';
        } else {
            burger.classList.add('hamburger__icon-active');
            mobMenu.style.left = 0;
            mobMenuActive = true;
            document.body.style.overflow = 'hidden';
        }
    });

    mobLinks.forEach(el => el.addEventListener('click', () => {
        if (mobMenuActive) {
            burger.classList.remove('hamburger__icon-active');
            mobMenu.style.left = "-100%";
            mobMenuActive = false;
            document.body.style.overflow = '';
        }
    }));



    // MODALS
    const overlay = document.querySelector('.overlay');
    const closeButtons = document.querySelectorAll('.modal__close-icon');
    const buttons = document.querySelectorAll('.button');
    const consultationLink = document.querySelector('.examples__consultation-link');
    const consultation = document.getElementById('consultation');

    buttons.forEach(function (item) {
        if (item.hasAttribute('data-modal')) {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const attr = this.getAttribute('data-modal'),
                    modalWindow = document.getElementById(`${attr}`);

                modalWindow.classList.add('show');
                overlay.classList.add('show');
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = '12px';
            });
        }
    });

    // consultationLink.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     consultation.classList.add('show');
    //     overlay.classList.add('show');
    //     document.body.style.overflow = 'hidden';
    //     document.body.style.paddingRight = '12px';
    // });

    closeButtons.forEach(function (item) {
        item.addEventListener('click', function () {
            const modal = this.closest('.modal');

            modal.classList.remove('show');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        });
    });

    overlay.addEventListener('click', function () {
        document.querySelector('.modal.show').classList.remove('show');
        this.classList.remove('show');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    });

    //валідація форми
    const validateEmail = (email) => {
        return String(email).toLowerCase().match(
            /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,15}$/
        );
    };

    const validateLink = (link) => {
        return String(link).match(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        );
    };

    const validateUsername = (username) => {
        return String(username).match(
            /^@?[a-z][a-z0-9_]*$/
        );
    };

    const validatePhone = (phone) => {
        return String(phone).match(
            /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.\,]?[0-9()]{2,5}[-\s\.\,]?[0-9.\s\-()\,]{4,16}$/
        );
    };

    const eye = document.querySelectorAll('.eye');
    const passwordFields = document.querySelectorAll('input[data-field="password"]');

    passwordFields.forEach(item => {
        item.addEventListener('input', () => {
            if (item.value.toString().length >= 1) {
                item.nextElementSibling.style.display = "block";
            } else {
                item.nextElementSibling.style.display = "none";
            }
        });
    });



    eye.forEach(function (item) {
        item.addEventListener('click', function () {
            const passField = this.previousElementSibling;

            const type = passField.getAttribute('type') === 'password' ? 'text' : 'password';
            passField.setAttribute('type', type);
        });
    });

    let statusForSendingData = true;

    // validation('#consultation');
    validation('#sign-in');
    validation('#sign-up');
    // validation('.order .order__form');

    function validation(parentForm) {
        const form = document.querySelector(parentForm),
            formButton = form.querySelector('.button'),
            formInputs = form.querySelectorAll('input'),
            formClose = form.querySelector('.modal__close-icon');

        formButton.addEventListener('click', e => {
            e.preventDefault();
            statusForSendingData = true;

            formInputs.forEach(el => {
                if (el.name == 'email') {
                    if (!validateEmail(el.value) || el.value.toString().length > 100) {
                        el.labels[0].classList.add('incorrect');
                        statusForSendingData = false;
                    }
                }

                if (el.name == 'phone') {
                    if (el.value.toString().length < 8 || el.value.toString().length > 30 || !validatePhone(el.value)) {
                        el.labels[0].classList.add('incorrect');
                        statusForSendingData = false;
                    }
                }

                if (el.name == 'username') {
                    if (!validateUsername(el.value) || el.value.toString().length > 50) {
                        el.labels[0].classList.add('incorrect');
                        statusForSendingData = false;
                    }
                }

                if (el.name == 'link') {
                    if (!validateLink(el.value) || el.value.toString().length > 100) {
                        el.labels[0].classList.add('incorrect');
                        statusForSendingData = false;
                    }
                }

                if (el.name == 'quantity') {
                    if (el.value < +document.querySelector('.order__info-item-descr[data-info="min"]').textContent.slice(0, -3) || el.value > +document.querySelector('.order__info-item-descr[data-info="max"]').textContent.slice(0, -3)) {
                        el.labels[0].classList.add('incorrect');
                        statusForSendingData = false;
                    }
                }

                if (el.name == 'password') {
                    if (el.value.toString().length <= 6 || !el.value.toString().match(/^[\S]*$/)) {
                        el.labels[0].classList.add('incorrect');
                        statusForSendingData = false;
                    }
                }

                if (el.name == 'password2' && el.value != form.querySelector('input[name="password"]').value) {
                    el.labels[0].classList.add('incorrect');
                    statusForSendingData = false;
                }
            });
        });

        formInputs.forEach(el => el.addEventListener('input', () => {
            el.labels[0].classList.remove('incorrect');
        }));

        if (form.contains(formClose)) {
            formClose.addEventListener('click', () => {
                formInputs.forEach(el => {
                    el.value = '';
                    el.labels[0].classList.remove('incorrect');
                });
                passwordFields.forEach(item => {
                    item.nextElementSibling.style.display = "none";
                });
            });

            overlay.addEventListener('click', () => {
                formInputs.forEach(el => {
                    el.value = '';
                    el.labels[0].classList.remove('incorrect');
                });
                passwordFields.forEach(item => {
                    item.nextElementSibling.style.display = "none";
                });
            });
        }
    }

    const loginButton = document.querySelector('button[data-login="sign-in"]');
    const logoutBtn = document.querySelector('.header__exit');
    const headerBtns = document.querySelector('.header__buttons');
    const headerLogout = document.querySelector('.header__logout');
    const hederQuickOrder = document.querySelector('body > header > div > div > nav > ul > li:nth-child(1)');
    const sectionQuickOrder = document.getElementById('quick-order');
    const promoBtn = document.querySelector('body > section.main-promo > div > div > div.main-promo__block > a');

    loginButton.addEventListener('click', function () {
        validation('#sign-in');

        if (statusForSendingData === true) {
            const modal = this.closest('.modal');

            modal.classList.remove('show');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';

            headerBtns.style.display = 'none';
            headerLogout.style.display = 'flex';
            hederQuickOrder.style.display = 'none';
        }
    });

    logoutBtn.addEventListener('click', () => {
        headerBtns.style.display = 'flex';
        headerLogout.style.display = 'none';
        hederQuickOrder.style.display = 'block';
    });
});