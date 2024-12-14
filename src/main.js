import { getImages } from './js/api';
import { showImages } from './js/render';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.js-form'),
  gallery: document.querySelector('.js-gallery'),
  more: document.querySelector('.js-more'),
  loader: document.querySelector('.loader'),
};
let query;
let page;
let lastPage;

refs.form.addEventListener('submit', onSubmit);
refs.more.addEventListener('click', onMore);

async function onSubmit(ev) {
  ev.preventDefault();
  showLoad();
  page = 1;

  query = ev.target.elements.query.value.trim();
  if (!query) {
    iziToast.error({
      title: 'Error!',
      message: 'No query!',
      position: 'center',
    });
    hideMore();
    return;
  }
  refs.gallery.innerHTML = '';
  const data = await getImages(query, page);

  if (data.total === 0) {
    iziToast.error({
      title: 'Sorry',
      message: 'No matches found for your search query.',
      position: 'center',
    });

    refs.form.elements.query.value = '';

    return;
  }
  renderImages(data.hits);
  lastPage = Math.ceil(data.totalHits / 13);
  checkMore();
  hideLoad();

  ev.target.reset();
}

async function onMore() {
  page += 1;
  showLoad();

  const data = await getImages(query, page);

  renderImages(data.hits);
  hideLoad();
  checkMore();

  const height = refs.gallery.firstElementChild.getClientRects().height;
  scrollBy({
    behavior: 'smooth',
    top: height * 2,
  });
}

function renderImages(images) {
  const markup = showImages(images);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function showMore() {
  refs.more.classList.remove('invisible');
}

function hideMore() {
  refs.more.classList.add('invisible');
}

function checkMore() {
  if (page >= lastPage) {
    hideMore();
  } else {
    showMore();
  }
}
function showLoad() {
  refs.loader.classList.remove('invisible');
}

function hideLoad() {
  refs.loader.classList.add('invisible');
}
