const $ = require("jquery");

export default class FooterManager {

    constructor(elementSelector) {
        this.element = $(elementSelector);
    }

    init() {
        this.backToTop();
    }

    backToTop() {
        // Vuelve al inicio de la página al pulsar el enlace.
        this.element.on("click", function(){
            // Funcion "animate" de jQuery para mejorar la acción.
            $("body").animate({
                scrollTop: '0px'
            }, 300);
        });
    }
}