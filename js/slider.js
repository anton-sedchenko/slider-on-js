'use strict';

class Slider {
  direction = -1;
  slidesDataArr = [];

  constructor (sliderCards) {
    this.sliderCards = sliderCards;
    this.sliderWindowWidth = 560;
    this.slidesNum = sliderCards.length;
    this.shift = this.sliderWindowWidth / (this.sliderWindowWidth * this.slidesNum) * 100 + '%';
  }

  init() {
    let slideItem = document.querySelectorAll('.testimonials__slider-item');
    const leftBtnEl = document.querySelector('.arrow-left-container');
    const rightBtnEl = document.querySelector('.arrow-right-container');
    let slideLine = document.querySelector('.testimonials__slide-line');
    
    this.slidesDataArr = sliderCards.concat();

    leftBtnEl.addEventListener('click', this.left.bind(this), false);
    rightBtnEl.addEventListener('click', this.right.bind(this), false);
    slideLine.addEventListener('transitionend', this.slideTransfer.bind(this), false);

    for (let i = 0; i < this.slidesDataArr.length; i++) {
      let text = slideItem[i].querySelector('.testimonials__slide-text');
      let author = slideItem[i].querySelector('.testimonials__author');
      let authorOccupation = slideItem[i].querySelector('.testimonials__author-occupation');
      let img = slideItem[i].querySelector('.testimonials__slide-user-photo');

      text.textContent = this.slidesDataArr[i].slideText;
      author.textContent = this.slidesDataArr[i].author;
      authorOccupation.textContent = this.slidesDataArr[i].authorOccupation;
      img.src = this.slidesDataArr[i].authorPhoto;
    }

    this.infinite();
  }

  slideTransfer() {
    let slideLine = document.querySelector('.testimonials__slide-line');

    if (this.direction === -1) {

      slideLine.appendChild(slideLine.firstElementChild);
    } else if (this.direction === 1) {

      slideLine.prepend(slideLine.lastElementChild);
    }

    slideLine.style.transition = 'none';
    slideLine.style.transform = 'translate(0)';
    setTimeout(function() {
      slideLine.style.transition = 'all 0.5s';
    });
  }

  infinite() {
    const leftArrowEl = document.querySelector('.arrow-left-container');
    const righttArrowEl = document.querySelector('.arrow-right-container');
    const sliderWindowEl = document.querySelector('.testimonials__slider-window');
    let self = this;
    let intervalID = (setInterval(function() {
        self.right();
      }, 5000));

    leftArrowEl.addEventListener('mouseleave', function(event) {
      intervalID = (setInterval(function() {
        self.right();
      }, 5000));
    });

    leftArrowEl.addEventListener('mouseenter', function(event) {
      clearInterval(intervalID);
    });

    righttArrowEl.addEventListener('mouseleave', function(event) {
      intervalID = (setInterval(function() {
        self.right();
      }, 5000));
    });

    righttArrowEl.addEventListener('mouseenter', function(event) {
      clearInterval(intervalID);
    });

    sliderWindowEl.addEventListener('mouseleave', function(event) {
      intervalID = (setInterval(function() {
        self.right();
      }, 5000));
    });

    sliderWindowEl.addEventListener('mouseenter', function(event) {
      clearInterval(intervalID);
    });
  }

  left() {
    let slideLine = document.querySelector('.testimonials__slide-line');
    let slideWindow = document.querySelector('.testimonials__slider-window');

    if (this.direction === -1) {

      slideLine.appendChild(slideLine.firstElementChild); 
      this.direction = 1;
    }

    this.direction = 1;
    slideWindow.style.justifyContent = 'flex-end';
    slideLine.style.transform = `translate(${this.shift})`;  
  }

  right() {
    let slideLine = document.querySelector('.testimonials__slide-line');
    let slideWindow = document.querySelector('.testimonials__slider-window');

    if (this.direction === 1) {

      slideLine.prepend(slideLine.lastElementChild);
      this.direction = -1;
    }

    this.direction = -1;
    slideWindow.style.justifyContent = 'flex-start';
    slideLine.style.transform = `translate(-${this.shift})`;  
  }
}

let slider = new Slider(sliderCards);

window.onload = function() {
  slider.init();
};
