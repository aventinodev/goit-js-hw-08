import SimpleLightbox from '~node_modules/simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const galleryRef = document.querySelector('.gallery');

const markupGallery = createMarkupGallery(galleryItems);

function createMarkupGallery(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}"/>
</a>`
    )
    .join('');
}

galleryRef.insertAdjacentHTML('beforeend', markupGallery);

let gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

console.log(gallery);
