function templateImage(image) {
  const {
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    downloads,
    comments,
  } = image;
  return `<a href="${largeImageURL}" class="card">
      <li>
        <img src="${webformatURL}" alt="${tags}" />
        <p><b>Views: </b>${views}</p>
        <p><b>Likes: </b>${likes}</p>
        <p><b>Comments: </b>${comments}</p>
        <p><b>Downloads: </b>${downloads}</p>
      </li>
    </a>`;
}

export function showImages(images) {
  return images.map(templateImage).join('');
}
