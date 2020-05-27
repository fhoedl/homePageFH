const appFH = {};

// NavBar Hamburger ANIMATION
appFH.navBar = () => {
    $(`label.navToggle`).on(`click`, function(){
        $(this).toggleClass('animatedNav')
    })
}

// jQuery Smooth Scroll
appFH.scroll = () => {
    $('a').on('click', function(e) {
        if(this.hash !== '') {
            e.preventDefault();

            const hash = this.hash;

            $('html, body').animate({
               scrollTop: $(hash).offset().top 
            }, 800);
        }
        
        ;
    })
}

// appFH.arrow = () => {
//     $('.svgArrows').on('click', function () {
//         $(this).
//     })
// }

// TYPING ANIMATION...
appFH.typing = () => {
    const txtElement = $('.txt-type');
    const words = JSON.parse(txtElement.attr('data-words'));
    const wait = txtElement.attr('data-wait');
    // Init Typewriter
    new Typewriter(txtElement, words, wait);
}

// const Typewriter = function (txtElement, words, wait = 3000) { ... }
// ....INSTEAD using ES6 Class
class Typewriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    // ( Typewriter.prototype.type = function() ... not needed inside class )
    type() {
        const current = this.wordIndex % this.words.length; // current Index of Word
        const fullTxt = this.words[current]; // get full text of current word

        // CHECK IF DELETING
        if (this.isDeleting) {          
            this.txt = fullTxt.substring(0, this.txt.length - 1);  // remove characters
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);  // add characters
        }

        // INSERT TEXT INTO ELEMENT
        this.txtElement.html(`<span class="txt">${this.txt}</span>`);
        let typeSpeed = "325"; // SET Typing Speed

        if (this.isDeleting) {
            typeSpeed = typeSpeed / 3; // SET Deleting Speed
        }

        // ON WORD COMPLETION
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;  // makes pause at end
            this.isDeleting = true; // set delete to true
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // move to next word...
            this.wordIndex++;
            // Pause before restart typing 
            typeSpeed = 500;
        }
        setTimeout(() => this.type(), typeSpeed);
    } 
}

// init FUNCTION Calls
appFH.init = () => {
    appFH.navBar();
    appFH.typing();
    appFH.scroll();
}

// DOCUMENT READY... with init FUNCTION CALL
$(() => {
    appFH.init();
})

// Option2 -  jQuery Smooth scroll
// $('a').on('click', function(e) {
//     console.log(this.hash);
// })