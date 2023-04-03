let indexSlide = 1;
let slides = document.getElementsByClassName("slide");
showSlides(indexSlide);

function changeSlideIndex(n) {
  indexSlide += n;
  showSlides(indexSlide);
}

function showSlides(n) {
  let i;
  if (n > slides.length) {
    indexSlide = 1;
  }
  if (n < 1) {
    indexSlide = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[indexSlide - 1].style.display = "block";
}

function sendInfo() {
  let tempVar = indexSlide;
  localStorage.setItem("chosenPet", tempVar);
  localStorage.setItem("petName", document.getElementById("petName").value);
  localStorage.setItem("level", 1);
  localStorage.setItem("day", 0);
  localStorage.setItem("hour", 0);
  localStorage.setItem("minute", 0);
  // localStorage.setItem("hunger", 50)
  // localStorage.setItem("energy", 50)
  // localStorage.setItem("boredom", 50)
  // localStorage.setItem("health", 50)
}
