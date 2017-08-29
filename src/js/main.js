window.$ = window.jQuery = require("jquery");

import CommentsService from "./commentsService";
import UIManager from "./uiManager";

const commentsService = new CommentsService("/comments/");
const uiManager = new UIManager(".comments_list");

commentsService.load(comments =>{
    if(comments.length == 0){
        uiManager.setEmpty();
    } else {
        let html = "";
        
        for(let comment of comments) {
            html +=`<article class="comment">
                    <div>Usuario: ${comment.name} ${comment.surname}</div>
                    <div>Email:${comment.email}</div>
                    <p>Mensaje:${comment.text}</p>    
                    </article><br>`;
        }
        
        // Sustituimos el HTML actual por el que hems generado.
        $(".comments_list .ui_status.ideal").html(html);
        
        // Eliminados el estado loading y mostramos el ideal
        uiManager.setIdeal();
    }
}, error =>{
    uiManager.setError();
    console.log("Error al cargar los comentarios", error);
});