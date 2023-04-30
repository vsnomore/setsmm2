document.addEventListener('DOMContentLoaded', () => {
    const socials = [
        {
            name: 'Instagram',
            icon: './icons/social-transparent/instagram64.svg',
            services: [
                {serviceName: 'Лайки дешевые без гарантии - insta', priceForHundred: 3.22, minOrder: 10, maxOrder: 250_000},
                {serviceName: 'Лайки высокого качества - insta', priceForHundred: 4, minOrder: 10, maxOrder: 250_000},
                {serviceName: 'Подписчики с гарантией - insta', priceForHundred: 5.55, minOrder: 10, maxOrder: 50_000},
                {serviceName: 'Подписчики высокого качества СНГ', priceForHundred: 7.32, minOrder: 10, maxOrder: 30_000},
                {serviceName: 'Просмотры дешевые', priceForHundred: 0.72, minOrder: 10, maxOrder: 250_000},
                {serviceName: 'Комментарии позитивные с гарантией', priceForHundred: 25, minOrder: 10, maxOrder: 3_000}
                
            ]
        },
        {
            name: 'Telegram',
            icon: './icons/social-transparent/telegram64.svg',
            services: [
                {serviceName: 'Лайки дешевые без гарантии - telegram', priceForHundred: 4.22, minOrder: 10, maxOrder: 150_000},
                {serviceName: 'Лайки высокого качества - teleg', priceForHundred: 4, minOrder: 100, maxOrder: 250_000},
                {serviceName: 'Подписчики с гарантией - teleg', priceForHundred: 15.55, minOrder: 440, maxOrder: 50_000},
                {serviceName: 'Подписчики высокого качества СНГ', priceForHundred: 7.32, minOrder: 10, maxOrder: 30_000},
                {serviceName: 'Комментарии позитивные с гарантией', priceForHundred: 25, minOrder: 10, maxOrder: 3_000}
            ]
        },
        {
            name: 'TikTok',
            icon: './icons/social-transparent/tiktok64.svg',
            services: [
                {serviceName: 'Лайки дешевые без гарантии - tik', priceForHundred: 4.22, minOrder: 10, maxOrder: 150_000},
                {serviceName: 'Лайки высокого качества - tik', priceForHundred: 4, minOrder: 10, maxOrder: 250_000},
                {serviceName: 'Подписчики с гарантией - tik', priceForHundred: 15.55, minOrder: 10, maxOrder: 50_000},
                {serviceName: 'Подписчики высокого качества СНГ', priceForHundred: 7.32, minOrder: 10, maxOrder: 30_000}
            ]
        },
        {
            name: 'YouTube',
            icon: './icons/social-transparent/youtube64.svg',
            services: [
                {serviceName: 'Лайки дешевые без гарантии - YouTube', priceForHundred: 4.22, minOrder: 10, maxOrder: 150_000},
                {serviceName: 'Лайки высокого качества - YouTube', priceForHundred: 4, minOrder: 10, maxOrder: 250_000},
                {serviceName: 'Подписчики высокого качества СНГ', priceForHundred: 7.32, minOrder: 10, maxOrder: 30_000},
                {serviceName: 'Комментарии позитивные с гарантией - YouTube', priceForHundred: 25, minOrder: 10, maxOrder: 3_000}
            ]
        },
        {
            name: 'Twitch',
            icon: './icons/social-transparent/twitch64.svg',
            services: [
                {serviceName: 'Лайки дешевые без гарантии - Twitch', priceForHundred: 4.22, minOrder: 10, maxOrder: 150_000},
                {serviceName: 'Лайки высокого качества - Twitch', priceForHundred: 4, minOrder: 10, maxOrder: 250_000},
                {serviceName: 'Подписчики с гарантией - Twitch', priceForHundred: 15.55, minOrder: 10, maxOrder: 50_000},
                {serviceName: 'Подписчики высокого качества СНГ', priceForHundred: 7.32, minOrder: 10, maxOrder: 30_000},
                {serviceName: 'Комментарии позитивные с гарантией', priceForHundred: 25, minOrder: 10, maxOrder: 3_000}
            ]
        }
        ,{
            name: 'Vk',
            icon: './icons/social-transparent/vk64.svg',
            services: [
                {serviceName: 'Лайки дешевые без гарантии - VK', priceForHundred: 4.22, minOrder: 10, maxOrder: 150_000},
                {serviceName: 'Лайки высокого качества - VK', priceForHundred: 4, minOrder: 10, maxOrder: 250_000},
                {serviceName: 'Подписчики с гарантией - VK', priceForHundred: 15.55, minOrder: 10, maxOrder: 50_000},
                {serviceName: 'Подписчики высокого качества СНГ', priceForHundred: 7.32, minOrder: 10, maxOrder: 30_000},
                {serviceName: 'Комментарии позитивные с гарантией', priceForHundred: 25, minOrder: 10, maxOrder: 3_000}
            ]
        }
    ];
    const socialList = document.querySelector('#select-category .order__form-select-body');
    const servicesList = document.querySelector('#select-services .order__form-select-body');
    const quantityInput = document.querySelector('#quantity.order__form-quantity');
    const orderSum = document.querySelector('[data-order="sum"].order__form-sum');
    const orderQuantity = document.querySelector('[data-order="quantity"].order__form-sum');


    let currentSocial = 'instagram';
    let price;
    // let quantity;

    renderSocialsList();
    renderServicesList();
    initCurrentSocial();

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

    // SELECT FORMS
    const selectHeader = document.querySelectorAll('.order__form-select-header');
    const selectItem = document.querySelectorAll('.order__form-select-item');
    const selectCategoryBody = document.getElementById('select-category');
    const selectServicesBody = document.getElementById('select-services');

    quantityInput.addEventListener('input', calculate);

    selectHeader.forEach(item => {
        item.addEventListener('click', selectToggle);
    });

    // selectItem.forEach(item => {
    //     item.addEventListener('click', selectChoose);
    // });

    function selectToggle() {
        this.parentElement.classList.toggle('is-active')
    }

    function selectChoose(e) {
        let item = this.innerHTML,
            currentHTML = this.closest('.order__form-select').querySelector('.order__form-select-current');
        currentHTML.innerHTML = item;

        //new code
        if(e.target.dataset.social) {
            currentSocial = e.target.dataset.social;
            renderServicesList();
            fillingInfo(0);
            calculate();
        } else {
            fillingInfo(e.target.dataset.index);
            calculate();
        }

        this.parentElement.parentElement.classList.remove('is-active');
    }


    document.addEventListener('click', outsideEventListener);
    document.addEventListener('click', outsideEventListenerServices);

    function outsideEventListenerServices(event) {
        if (event.target === selectServicesBody || selectServicesBody.contains(event.target)) return;
        selectServicesBody.classList.remove('is-active');
    }

    function outsideEventListener(event) {
        if (event.target === selectCategoryBody || selectCategoryBody.contains(event.target)) return;
        selectCategoryBody.classList.remove('is-active');
    }



    // MODALS
    const overlay = document.querySelector('.overlay');
    const closeButtons = document.querySelectorAll('.modal__close-icon');
    const buttons = document.querySelectorAll('.button');
    // const closeButton = document.querySelector('.modal__close-icon');

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

    //калькулятор
    function renderSocialsList() {
        socials.forEach(el => {
            const socialItem = document.createElement('div');
            socialItem.classList.add('order__form-select-item');
            socialItem.dataset.social = el.name.toLocaleLowerCase();
            socialItem.innerHTML = `
            <img src="${el.icon}" alt="${el.name}" class="order__form-select-icon">
            <span>${el.name}</span>`;

            socialItem.addEventListener('click', selectChoose);
            socialList.append(socialItem);
        });
    }

    function renderServicesList() {
        document.querySelectorAll('#select-services .order__form-select-item').forEach(el => el.remove());

        socials.forEach(el => {
            if (el.name.toLocaleLowerCase() != currentSocial) {
                return;
            }

            el.services.forEach( (el,ind) => {
                const listItem = document.createElement('div');
                listItem.classList.add('order__form-select-item');
    
                const price = el.priceForHundred < 1 ? el.priceForHundred : Math.floor(el.priceForHundred);
                listItem.dataset.index = ind;

                listItem.innerHTML = `${el.serviceName} <span class="select-services-info">(${price}₽ за 100шт)</span>`;

                listItem.addEventListener('click', selectChoose);
                servicesList.append(listItem);
            });

            const headerService = document.querySelector('[data-header="for-services"].order__form-select-current');
            headerService.innerHTML = `${el.services[0].serviceName} <span class="select-services-info">(${el.services[0].priceForHundred < 1 ? el.services[0].priceForHundred : Math.floor(el.services[0].priceForHundred)}₽ за 100шт)</span>`;

            price = el.services[0].priceForHundred;
        });
    }

    function fillingInfo(ind) {
        socials.forEach(el => {
            if (el.name.toLocaleLowerCase() != currentSocial) {
                return;
            }
            price = el.services[ind].priceForHundred;

            document.querySelector('.order__info-item-descr[data-info="price"]').innerHTML = `${price}₽`;
            document.querySelector('.order__info-item-descr[data-info="min"]').innerHTML = `${el.services[ind].minOrder} шт`;
            document.querySelector('.order__info-item-descr[data-info="max"]').innerHTML = `${el.services[ind].maxOrder} шт`;
        });
    }

    function initCurrentSocial() {
        socials.forEach(el => {
            if (el.name.toLocaleLowerCase() != currentSocial) {
                return;
            }

            const headerSocial = document.querySelector('[data-header="for-social"].order__form-select-current');
            headerSocial.innerHTML = `
            <img src="${el.icon}" alt="${el.name}" class="order__form-select-icon">
            <span>${el.name}</span>`;
        });
    }

    function calculate() {
        quantityInput.value ? quantity = quantityInput.value : quantity = 0;
        const finalCost = Math.round(quantity * price) / 100;

        orderQuantity.innerHTML = `${quantity} шт`;
        orderSum.innerHTML = `${finalCost}₽`;
    }

    //валідація форми
    const validateEmail = (email) => {
        return String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    
    let statusForSendingData = true;

    validation('#consultation');
    validation('#sign-in');
    validation('#sign-up');
    validation('.order .order__form');

    function validation(parentForm) {
        const form = document.querySelector(parentForm),
              formButton = form.querySelector('.button'),
              formInputs = form.querySelectorAll('input'),
              formClose = form.querySelector('.modal__close-icon');


        formButton.addEventListener('click', e => {
            e.preventDefault();
            statusForSendingData = true;

            formInputs.forEach(el => {
                if (el.name == 'email' && !validateEmail(el.value)) {
                    el.labels[0].classList.add('incorrect');
                    statusForSendingData = false;
                }

                if (el.name == 'phone' && !el.value) {
                    el.labels[0].classList.add('incorrect');
                    statusForSendingData = false;
                }

                if (el.name == 'link' && !el.value) {
                    el.labels[0].classList.add('incorrect');
                    statusForSendingData = false;
                }

                if (el.name == 'quantity' && (el.value < +document.querySelector('.order__info-item-descr[data-info="min"]').textContent.slice(0,-3)) || el.value > +document.querySelector('.order__info-item-descr[data-info="max"]').textContent.slice(0,-3)) {
                    el.labels[0].classList.add('incorrect');
                    statusForSendingData = false;
                }

                if (el.name == 'password') {
                    if (!el.value) {
                        el.labels[0].classList.add('incorrect');
                        el.value = '';
                        statusForSendingData = false;
                    }
                }

                if (el.name == 'password2' && el.value != form.querySelector('input[name="password"]').value) {
                    el.labels[0].classList.add('incorrect');
                    statusForSendingData = false;
                }
            });  
        });

        formInputs.forEach( el => el.addEventListener('input', () => {
            el.labels[0].classList.remove('incorrect');
        }));

        if (form.contains(formClose)) {
            formClose.addEventListener('click', () => {
                formInputs.forEach(el => {
                    el.value = '';
                    el.labels[0].classList.remove('incorrect');
                });
            });
        }
    }
});