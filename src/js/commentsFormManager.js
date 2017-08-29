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
        this.element.on("submit", this.validateAndSendData);
    }

    validateAndSaveData() {
        
    }
}