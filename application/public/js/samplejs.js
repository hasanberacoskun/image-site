function fadeOut(event) {
  // If a child has been clicked, I make sure the div fades out rather than the child.
  if (event.srcElement.localName == "img" || event.srcElement.localName == "p") {
    // Fading out is done in conjunction to css to make things simpler.
    event.srcElement.parentElement.className = event.srcElement.parentElement.className + " fading_out";
    event.srcElement.parentElement.style.opacity = '0';
    setTimeout(function () {
      // Remove element.
      event.srcElement.parentElement.remove();
      // Update count.
      let count = document.getElementsByClassName("image_container").length;
      document.getElementById('items_count').innerHTML = `There are ${count} photo(s) being shown`;
    }, 500);
  } else {
    // Fading out is done in conjunction to css to make things simpler.
    event.srcElement.className = event.srcElement.className + " fading_out";
    event.srcElement.style.opacity = '0';
    setTimeout(function () {
      // Remove element.
      event.srcElement.remove();
      // Update count.
      let count = document.getElementsByClassName("image_container").length;
      document.getElementById('items_count').innerHTML = `There are ${count} photo(s) being shown`;
    }, 500);
  }
}

function createPhotoCard(data, containerDiv) {
  // Create the div to contain the image and title.
  let divItem = document.createElement('div');
  divItem.className = "image_container";
  containerDiv.appendChild(divItem);
  // Create the image.
  let imageItem = document.createElement('img');
  imageItem.src = data.thumbnailUrl;
  divItem.appendChild(imageItem);
  // Create the title.
  let titleItem = document.createElement('p');
  titleItem.innerHTML = data.title;
  divItem.appendChild(titleItem);
  // Event listener created to fade out when clicked.
  divItem.addEventListener('click', function (event) {
    fadeOut(event);
  })
}

// The following is provided by Anthony Souza in the example video.
let mainDiv = document.getElementById("items_container");

if(mainDiv) {
  let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos";
  fetch(fetchURL)
  .then((data) => data.json())
  .then((photos) => {
    let innerHTML = "";
    photos.forEach((photo) => {
      createPhotoCard(photo, mainDiv);
    });
    document.getElementById('items_count').innerHTML = `There are ${photos.length} photo(s) being shown`;
  });
}
