const $ = require("jquery");

export default class FooterManager {

    init() {
        this.backToTop();
    }

    backToTop() {
        // Vuelve al inicio de la página al pulsar el enlace.
        $(".return_link").on("click", function(){
            // Funcion "animate" de jQuery para mejorar la acción.
            $("body").animate({
                scrollTop: '0px'
            }, 300);
        });
    }
}