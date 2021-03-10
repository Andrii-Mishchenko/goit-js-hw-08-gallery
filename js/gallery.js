'use strict'
import pictures from '../js/gallery-items.js';

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// console.log(createPictureCardsMarkup(pictures));

const picturesContainer = document.querySelector('.js-gallery');
const backdrop = document.querySelector('.lightbox');
const modalImage = document.querySelector('.lightbox__image')
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');


picturesContainer.addEventListener('click', onOpenModal)
closeModalBtn.addEventListener('click', onCloseModal);
overlay.addEventListener('click',  onCloseModal);

// рендеринг разметки галереи:
picturesContainer.insertAdjacentHTML('beforeend', createPictureCardsMarkup(pictures));

function createPictureCardsMarkup(pictures) {
    return pictures
        .map(({ preview, original, description }, index) => {
            return `
            <li class="gallery__item">
                <a
                    class="gallery__link"
                    href="${original}"
                >
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                data-index="${index}"
                />
                </a>
            </li>
            `;
        })
        .join('');
}

// открываем модалку:
function onOpenModal(event) {
    event.preventDefault();
    // открываем модалку исключительно по клику на картинку:
    if (event.target.nodeName === 'IMG') {
      
        let modalLink = event.target.dataset.source; //значение атрибута
        console.log(modalImage)
        backdrop.classList.add('is-open');
        window.addEventListener('keydown', onKeysPress); //- слушаем нажатие клавиш
        modalImage.src = modalLink
        modalImage.dataset.index = event.target.dataset.index; //????
        
    }
};

// Закрытие модалки
function onCloseModal() { 
    backdrop.classList.remove('is-open');
    window.removeEventListener('keydown', onKeysPress)
    modalImage.src = '';    
};

// Закрываем модалку по Esc, листаем фотки стрелками:
function onKeysPress(event) {
    console.log(event.code);
    if (event.code === 'Escape') {
        onCloseModal();
    };

    if (event.code === 'ArrowLeft') {
        arrowLeft();
    };

    if (event.code === 'ArrowRight') {
        arrowRight();
    };
}

function turnImages(step, index) {
    modalImage.dataset.index = `${index + step}`;
    modalImage.src = pictures[index + step].original;
}

function arrowLeft() {
    let index = +modalImage.dataset.index // преобразовывает в число
    if (index === 0) {
        turnImages(0, pictures.length - 1);
        return
    };
    console.log(index)
    turnImages(-1, index)
};

function arrowRight() {
    let index = +modalImage.dataset.index
    if (index === pictures.length - 1) {
        turnImages(0, 0);
        return
    };
     console.log(index)
    turnImages(1, index);
};


