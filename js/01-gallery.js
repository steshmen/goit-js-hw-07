import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryRef = document.querySelector('.gallery');

const markup = galleryItems.map(({ preview, original, description }) => {
	return `
	<div class="gallery__item">
  		<a class="gallery__link" href="${original}">
    		<img
      			class="gallery__image"
      			src="${preview}"
      			data-source="${original}"
      			alt="${description}"
    		/>
  		</a>
	</div>
	`
}).join('');

galleryRef.innerHTML = markup;

galleryRef.addEventListener('click', onClick);

function onClick(evt) {
	evt.preventDefault();
	if (evt.target.className !== 'gallery__image') {
		return
	}
	const originUrl = evt.target.dataset.source;
	
	const instance = basicLightbox.create(`
	<img
      class="gallery__image"
      src="${originUrl}"
      alt="${evt.target.alt}"
    >
	`, {
		onShow: () => {
			window.addEventListener('keydown', onClose);
		},
		onClose: () => {
			window.removeEventListener('keydown', onClose);
		}
	});
	instance.show();

	function onClose(evt) {
		if (evt.code === "Escape") {
			instance.close();
		}
	} 
}
