const $ = require("jquery");

import UIManager from "./UIManager";

export default class CommentsFormManager extends UIManager {

    constructor(elementSelector, commentsService, pubSub) {
        super(elementSelector);
        this.commentsService = commentsService;
        this.pubSub = pubSub;
    }

    init() {
        // Manejador de eventos para "escuchar" cuando se manda el formulario.
        this.setupSubmitEventHandler();
    }

    setupSubmitEventHandler() {
        this.element.on("submit", () => {
            return this.validateAndSendData();
        });
    }

    validateAndSendData() {
        if(this.isValid()){
            this.sendForm()
        }
        return false;
    }
    
    isValid() {
        const inputs = this.element.find("input");

        for(let input of inputs) {
            if(input.checkValidity() == false) {
                const errorMessage = input.validationMessage;
                input.focus();
                this.setError();
                return false;
            }
        }
        // Falta validar el TEXTAREA
        this.setIdeal();
        return true;
    }

    sendForm() {
        this.setLoading();
        const comment = {
            name: this.element.find("#name").val(),
            surname: this.element.find("#surname").val(),
            email: this.element.find("#email").val(),
            text: this.element.find("#comment").val()
        }

        this.commentsService.save(comment, success => {
            this.pubSub.publish("new_comment", comment);
            this.resetForm();
            this.setIdeal();
        }, error => {
            this.setError();
        });
    }

    resetForm() {
        this.element[0].reset();
    }

    disableForm() {
        this.element.find("input, button, textarea").attr("disabled",true);

    }

    enableForm() {
        this.element.find("input, button, textarea").attr("disabled",false);
    }

    // Reescribimos los métodos:
    // Ademas de hacer lo que hacían se añade enableForm()
    // o disableForm() en funcion de lo que se quiera hacer.
    setLoading() {
        super.setLoading();
        this.disableForm();
    }

    setError() {
        super.setError();
        this.enableForm();
    }

    setIdeal() {
        super.setIdeal();
        this.enableForm();
    }
}