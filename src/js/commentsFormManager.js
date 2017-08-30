const $ = require("jquery");

import UIManager from "./UIManager";

export default class CommentsFormManager extends UIManager {

    constructor(elementSelector, commentsService) {
        super(elementSelector);
        this.commentsService = commentsService;
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
        const comment = {
            name: this.element.find("#name").val(),
            surname: this.element.find("#surname").val(),
            email: this.element.find("#email").val(),
            text: this.element.find("#text").val()
        }
        this.setLoading();

        this.commentsService.save(comment, success => {
            // Falta Recargar listado comentarios.
            this.resetForm();
            this.setIdeal();
        }, error => {
            this.setError();
        });
    }

    resetForm() {
        this.element[0].reset();
    }
}