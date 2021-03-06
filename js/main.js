window.addEventListener('DOMContentLoaded', () => {
    /**** TABS ****/

    let tabsContent = document.querySelectorAll('.tabcontent');
    let tabsParent = document.querySelector('.tabheader__items');
    let tabs = document.querySelectorAll('.tabheader__item');


    const tabContentHide = () => {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };

    const tabContentShow = (i = 0) => {
        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    };

    tabContentHide();
    tabContentShow();

    tabsParent.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (e.target === item) {
                    tabContentHide();
                    tabContentShow(i);
                    tabsContent[i].classList.add('fade');
                }
            });
        }
    });


    /**** MODAL ****/

    let btnOpen = document.querySelectorAll('[data-modal]');
    let modal = document.querySelector('.modal');


    function openModal() {
        modal.classList.remove('hide');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = 'auto';
        clearInterval(timerModal);
    }

    btnOpen.forEach((item) => {
        item.addEventListener('click', () => {
            openModal();
        });
    });

    

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    let timerModal = setTimeout(openModal, 5000);

    document.addEventListener('scroll', (e) => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
        }
    });


    /**** TIMER ****/

    const deadline = '2021-03-30';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            hours = Math.floor( (t/(1000*60*60) % 24) ),
            minutes = Math.floor( (t/(1000*60)) % 60 ),
            seconds = Math.floor( (t/1000) % 60 );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num <= 9) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock (selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


    /* MENU-CARD */

    class Card {
        constructor (src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAN();
        }

        changeToUAN () {
            this.price = this.price * this.transfer;
        }
        
        render () {
            let menuItem = document.createElement('div');

            if(this.classes.length === 0) {
                menuItem.classList.add('menu__item');
            } else {
                this.classes.forEach(classItem => menuItem.classList.add(`${classItem}`));
            }
            
            menuItem.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">????????:</div>
                    <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
                </div>
            `;

            this.parentSelector.append(menuItem);
        }
    }


    // new Card(
    //     'img/tabs/vegy.jpg',
    //     'vegy',
    //     '???????? "????????????',
    //     '???????? "????????????" - ?????? ?????????? ???????????? ?? ?????????????????????????? ????????: ???????????? ???????????? ???????????? ?? ??????????????. ?????????????? ???????????????? ?? ???????????????? ??????????. ?????? ?????????????????? ?????????? ?????????????? ?? ?????????????????????? ?????????? ?? ?????????????? ??????????????????!',
    //     5,
    //     '.menu .container'
    // ).render();

    // new Card(
    //     'img/tabs/elite.jpg',
    //     'elite',
    //     '???????? "??????????????"',
    //     '?? ???????? "??????????????" ???? ???????????????????? ???? ???????????? ???????????????? ???????????? ????????????????, ???? ?? ???????????????????????? ???????????????????? ????????. ?????????????? ????????, ????????????????????????, ???????????? - ?????????????????????? ???????? ?????? ???????????? ?? ????????????????!',
    //     5,
    //     '.menu .container'
    // ).render();
    // new Card(
    //     'img/tabs/post.jpg',
    //     'post',
    //     '???????? "??????????????"',
    //     '???????? "??????????????" - ?????? ???????????????????? ???????????? ????????????????????????: ???????????? ???????????????????? ?????????????????? ?????????????????? ??????????????????????????, ???????????? ???? ??????????????, ????????, ???????????? ?????? ????????????, ???????????????????? ???????????????????? ???????????? ???? ???????? ???????? ?? ?????????????????? ???????????????????????????? ??????????????.',
    //     5,
    //     '.menu .container'
    // ).render();

    /* FORMS */

    let forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: '??????????????! ?????????? ???? ?? ???????? ????????????????',
        failure: '??????-???? ?????????? ???? ??????...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    // async function getData(url) {
    //     const res = await fetch(url)
    //     return await res.json();
    // }

    // getData('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new Card(img, altimg, title, descr, price, '.menu .container').render();
    //         })
    //     })

    axios.get('http://localhost:3000/menu')
        .then(response => {
            response.data.forEach(({img, altimg, title, descr, price}) => {
                new Card(img, altimg, title, descr, price, '.menu .container').render();
            });
        })

    async function postData(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const obj = (Object.fromEntries((formData.entries())));

            postData('http://localhost:3000/requests', JSON.stringify(obj))
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });

        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close">??</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 1500);
    }

    /**** SLIDER ****/

    let sliderBtnPrev = document.querySelector('.offer__slider-prev'),
        sliderBtnNext = document.querySelector('.offer__slider-next'),
        slides = document.querySelectorAll('.offer__slide'),
        currentSlide = document.querySelector('#current'),
        totalSlide = document.querySelector('#total'),
        slideWrapper = document.querySelector('.offer__slider-wrapper'),
        slideTrack = document.querySelector('.offer__slider-track'),
        btnsParent = document.querySelector('.offer__slider-btns'),
        btns = [],
        slideOffset = 0,
        slideIndex = 0;

    currentSlide.textContent = getZero(slideIndex + 1);
    totalSlide.textContent = getZero(slides.length);
    slideWrapper.style.overflow = 'hidden';
    slideTrack.style.cssText = `display: flex; width: ${slides[0].clientWidth * slides.length}px; transition: transform .4s linear`;

    sliderBtnPrev.addEventListener('click', () => {
        if(slideOffset == 0) {
            slideOffset = slides[0].clientWidth * (slides.length - 1);
        } else {
            slideOffset -= slides[0].clientWidth;
        }

        slideTrack.style.transform = `translateX(${-slideOffset}px)`;

        if(slideIndex <= 0) {
            slideIndex = slides.length - 1;

            btns.forEach(btn => btn.classList.remove('offer__slider-btn_active'));
            btns[slideIndex].classList.add('offer__slider-btn_active');
        } else {
            slideIndex--;

            btns.forEach(btn => btn.classList.remove('offer__slider-btn_active'));
            btns[slideIndex].classList.add('offer__slider-btn_active');
        }

        currentSlide.textContent = getZero(slideIndex + 1);
    });

    sliderBtnNext.addEventListener('click', () => {
        if(slideOffset == slides[0].clientWidth * (slides.length - 1)) {
            slideOffset = 0;
        } else {
            slideOffset += slides[0].clientWidth;
        }

        slideTrack.style.transform = `translateX(${-slideOffset}px)`;

        if(slideIndex >= slides.length - 1) {
            slideIndex = 0;

            btns.forEach(btn => btn.classList.remove('offer__slider-btn_active'));
            btns[slideIndex].classList.add('offer__slider-btn_active');
        } else {
            slideIndex++;

            btns.forEach(btn => btn.classList.remove('offer__slider-btn_active'));
            btns[slideIndex].classList.add('offer__slider-btn_active');
        }

        currentSlide.textContent = getZero(slideIndex + 1);
    });


    for (let i = 0; i < slides.length; i++) {
        let btn = document.createElement('div');
        btn.className = 'offer__slider-btn';
        btnsParent.append(btn);
        btns.push(btn);

        if(i == 0) {
            btn.classList.add('offer__slider-btn_active');
        }
    }

    btns.forEach((btn, i) => {
        btn.addEventListener('click', (e) => {
            btns.forEach(btn => btn.classList.remove('offer__slider-btn_active'));
            e.target.classList.add('offer__slider-btn_active');
            slideOffset = slides[0].clientWidth * i;
            slideIndex = i;
            currentSlide.textContent = getZero(i + 1);

            slideTrack.style.transform = `translateX(${-slideOffset}px)`;
        });
    });

    /**** RELOADING THE PAGE ****/

    window.addEventListener('unload', () => {
        document.documentElement.scrollTop = 0;
    });
});

/**** CALCULATOR ****/

let calcGenderParent = document.querySelector('#gender'),
    calcGenderItems = document.querySelectorAll('#gender .calculating__choose-item'),
    calcActivityParent = document.querySelector('#activity'),
    calcActivityItems = document.querySelectorAll('#activity .calculating__choose-item'),
    calcInputs = document.querySelectorAll('.calculating__choose input'),
    result = document.querySelector('.calculating__result span'),
    height,
    weight,
    age,
    sex = localStorage.getItem('sex') || 'famale',
    coeffActivity = localStorage.getItem('coeffActivity') || '1.2';


function showActiveItem(localStorageValue, items) {
    items.forEach(item => item.classList.remove('calculating__choose-item_active'));
    
    items.forEach(item => {
        if(item.id === localStorageValue) {
            item.classList.add('calculating__choose-item_active');
        }
        if(item.dataset.activity === localStorageValue) {
            item.classList.add('calculating__choose-item_active');
        }
    });
}

showActiveItem(sex, calcGenderItems);
showActiveItem(coeffActivity, calcActivityItems);

function getStaticInfo(parent, items) {
    parent.addEventListener('click', (e) => {
        if(e.target.classList.contains('calculating__choose-item')) {
            if(e.target.dataset.activity) {
                coeffActivity = +e.target.dataset.activity;
                localStorage.setItem('coeffActivity', coeffActivity);
            } else {
                sex = e.target.id;
                localStorage.setItem('sex', sex);
            }

            items.forEach(item => item.classList.remove('calculating__choose-item_active'));
            e.target.classList.add('calculating__choose-item_active');
        }

        calcTotal();
    });
}

getStaticInfo(calcGenderParent, calcGenderItems);
getStaticInfo(calcActivityParent, calcActivityItems);

function getDynamicInfo(inputs) {
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid #ff0000';
            } else {
                input.style.border = 'none';
            }

            switch (input.id) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    });
}

getDynamicInfo(calcInputs);

function calcTotal() {
    if(!sex || !height || !weight || !age || !coeffActivity) {
        result.textContent = 0;
        return;
    }

    if(sex == 'famale') {
        result.textContent = Math.round((447.593 + (3.098 * height) + (9.247 * weight) - (4.330 * age)) * coeffActivity);
    } else {
        result.textContent = Math.round((88.362 + (4.799 * height) + (13.397 * weight) - (5.677 * age)) * coeffActivity);
    }
}

calcTotal();