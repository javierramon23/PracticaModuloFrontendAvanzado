const $ = require("jquery");

export default class UIManager {

    constructor(selector) {
        this.uiStateClasses = "empy loading error ideal";
        this.element = $(selector);
    }

    setEmpty() {
        this.element.removeClass(this.uiStateClasses).addClass("empty");
    }

    setLoading() {
        this.element.removeClass(this.uiStateClasses).addClass("loading");
    }

    setError() {
        this.element.removeClass(this.uiStateClasses).addClass("error");
    }

    setIdeal() {
        this.element.removeClass(this.uiStateClasses).addClass("ideal");
    }

    // Añade código HTML al DIV del estado Ideal del elemeto que recibe como parámetro.
    setIdealHtml(html){
        this.element.find(".ui_status.ideal").html(html);
    }
}