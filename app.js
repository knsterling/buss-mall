'use strict';

// AND ARRAY FOR ALL OF THE OBJECTS
Products.prototype.allProducts = [];

// GETTING ELEMENTS BY ID?
const productsSection = document.getElementById("imagesDiv");
const firstProductImage = document.getElementById("firstImage");
const secondProductImage = document.getElementById("secondImage");
const thirdProductImage = document.getElementById("thirdImage");

const showResults = document.getElementById('resultsList');
const showResultsButton = document.getElementById('showResults');

// DECLARING AND ASSIGNING VARIABLES
const firstImageIndex;
const secondImageIndex;
const thirdImageIndex;

const maxAttempts = 25;
const userAttempts = 0;

const imagesNames = [];
const chartVotes = [];
const chartViews = [];

// THE CONSTRUCTOR
function Products(name, imgFilePath) {
    this.name = name;
    this.imgFilePath = imgFilePath;
    this.votes = 0;
    this.shown = 0;

    Products.prototype.allProducts.push(this);
    imagesNames.push(name);
}

// MAKING NEW OBJECTS
new Products("bag", "img/bag.jpg");
new Products("banana", "img/banana.jpg");
new Products("bathroom", "img/bathroom.jpg");
new Products("boots", "img/boots.jpg");
new Products("breakfast", "img/breakfast.jpg");
new Products("bubblegum", "img/bubblegum.jpg");
new Products("chair", "img/chair.jpg");
new Products("cthulhu", "img/cthulhu.jpg");
new Products("dog-duck", "img/dog-duck.jpg");
new Products("dragon", "img/dragon.jpg");
new Products("pen", "img/pen.jpg");
new Products("pet-sweep", "img/pet-sweep.jpg");
new Products("scissors", "img/scissors.jpg");
new Products("shark", "img/shark.jpg");
new Products("sweep", "img/sweep.png");
new Products("tauntuan", "img/tauntaun.jpg");
new Products("unicorn", "img/unicorn.jpg");
new Products("usb", "img/usb.gif");
new Products("water-can", "img/water-can.jpg");
new Products("wine-glass", "img/wine-glass.jpg");

// ADDING AN EVENT LISTENER
imagesDiv.addEventListener('click', userClick);
showResultsButton.addEventListener('click', showResult);
form.addEventListener('submit', submitter);

renderThreeRandomImages();

// DECLARING FUNCTIONS
function userClick(event) {

    if (userAttempts < maxAttempts) {

        if (event.target.id === "firstImage") {
            userAttempts++;
            Products.prototype.allProducts[firstImageIndex].votes++;
            renderThreeRandomImages();

        } else if (event.target.id === "secondImage") {
            userAttempts++;
            Products.prototype.allProducts[secondImageIndex].votes++;
            renderThreeRandomImages();

        } else if (event.target.id === "thirdImage") {
            userAttempts++;
            Products.prototype.allProducts[thirdImageIndex].votes++;
            renderThreeRandomImages();
        }

    } else {
        localStorage.setItem('productObjects', JSON.stringify(Products.prototype.allProducts));
        imagesDiv.removeEventListener('click', userClick);
        showResultsButton.disabled = false;
    }
}

function generateRandomIndex() {
    return Math.floor(Math.random() * (Products.prototype.allProducts.length));
}

var pic1;
var pic2;
var pic3;

function renderThreeRandomImages() {
    pic1 = firstImageIndex;
    pic2 = secondImageIndex;
    pic3 = thirdImageIndex;

    firstImageIndex = generateRandomIndex();
}

do {
    secondImageIndex = generateRandomIndex();
    thirdImageIndex = generateRandomIndex();

} while (firstImageIndex === secondImageIndex || firstImageIndex === thirdImageIndex || secondImageIndex === thirdImageIndex)

do {
    firstImageIndex = generateRandomIndex();
    secondImageIndex = generateRandomIndex();
    thirdImageIndex = generateRandomIndex();

} while (firstImageIndex === secondImageIndex || firstImageIndex === thirdImageIndex || secondImageIndex === thirdImageIndex ||
firstImageIndex === pic1 || firstImageIndex === pic2 || firstImageIndex === pic3 || secondImageIndex === pic1 || secondImageIndex === pic2 ||
secondImageIndex === pic3 || thirdImageIndex === pic1 || thirdImageIndex === pic2 || thirdImageIndex === pic3)

firstProductImage.src = Products.prototype.allProducts[firstProductImage].imgFilePath;
secondImageIndex.src = Products.prototype.allProducts[secondProductImage].imgFilePath;
thirdImageIndex.src = Products.prototype.allProducts[thirdProductImage].imgFilePath;

// CHOOSING ROUND NUMBER
function submitter(event) {
    event.preventDefault();
    maxAttempts = event.target.roundsNum.value;
}

// SHOWING RESULTS
function showResult() {
    showResult.innerHTML = '';

    for (i = 0; i < Products.prototype.allProducts.length; i++) {
        chartVotes.push(Products.prototype.allProducts[i].votes);
        chartViews.push(Products.prototype.allProducts[i].shown);
    }

    const productsResult;
    for (i = 0; i < Products.prototype.allProducts.length; i++) {
        productsResult = document.createElement('li');
        productsResult.textContent = Products.prototype.allProducts[i].name + ' has ' + Products.prototype.allProducts[i].votes +
            ' votes, and was seen ' + Products.prototype.allProducts[i].shown + ' times. And the percentage is: ' +
            (Products.prototype.allProducts[i].votes * 100 / Products.prototype.allProducts[i].shown + '%');
        showResults.appendChild(productsResult);
    }

    makeChart();
}

// CHART
function makeChart() {
    const chart = new Chart(ctx,
        {
            type: 'bar',
            data:
            {
                labels: imagesNames,
                datasets:
                    [
                        {
                            label: 'Votes',
                            backgroungColor: 'rgb (255, 99, 132)',
                            borderColor: 'rgb (255, 99, 132)',
                            data: chartVotes,
                        },
                        {
                            label: 'Shown',
                            backgroungColor: 'rgb (248, 220, 129)',
                            borderColor: 'rgb (248, 220, 129)',
                            data: chartViews,
                        }
                    ]
            },
            options:
            {

            }
        });
}

//  Making sure if there is anything in the local storage, then get it and parse it
if (localStorage.getItem('productObjects')) {

    Products.prototype.allProducts = JSON.parse(localStorage.getItem('productObjects'));

}
