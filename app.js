const slides = [... document.querySelector(".slide")]

const sliderData = {
    direction : 0,
    slidesOutIndex : 0,
    slideInIndex : 0,
}

const directionButtons = [...document.querySelectorAll(".direction-btn")]

directionButtons.forEach(btn => btn.addEventListener('click', handleClick))

//  création de la fonction handleClick

function handleClick(e) {
getDirection(e.target)
}

// Création de la fonction getDirection

function getDirection(btn){
sliderData.direction = btn.className.includes('right') ? 1 : -1;
}