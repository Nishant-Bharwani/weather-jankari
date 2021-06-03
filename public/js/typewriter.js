const TypeWriter = function(textElement, words, wait = 1500) {
    this.textElement = textElement;
    this.words = words;
    this.textElement = textElement;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;

};


TypeWriter.prototype.type = function() {
    const currentIndex = this.wordIndex % this.words.length;
    let fullText = this.words[currentIndex];

    if (this.isDeleting) {
        // Remove chars
        this.txt = this.words[currentIndex].substring(0, this.txt.length - 1);
    } else {
        // Add chars
        this.txt = this.words[currentIndex].substring(0, this.txt.length + 1);
    }

    // insert txt to element
    this.textElement.innerHTML = `<span class="txt">${this.txt}</span>`
    let typeSpeed = 250;
    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    if (!this.isDeleting && (this.txt === fullText)) {
        typeSpeed = this.wait;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
    }
    setTimeout(() => this.type(), typeSpeed);
}

document.addEventListener('DOMContentLoaded', init);


function init() {
    const textElement = document.querySelector('.typewriter');
    let words = textElement.getAttribute('data-words');
    words = JSON.parse(words);
    console.log(words);

    const wait = textElement.getAttribute('data-wait');

    new TypeWriter(textElement, words, wait);
}