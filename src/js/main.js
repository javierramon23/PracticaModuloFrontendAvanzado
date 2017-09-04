window.$ = window.jQuery = require("jquery");

import CommentsService from "./commentsService";
import UIManager from "./uiManager";
import CommentsListManager from "./commentsListManager";
import CommentsFormManager from "./commentsFormManager";
import PubSub from "pubsub-js";
import FooterManager from "./footerManager";

const commentsService = new CommentsService("/comments/");
const commentsUIManager = new UIManager(".comments_list");
const commentsListManager = new CommentsListManager(commentsService, commentsUIManager, PubSub);
const commentsFormManager = new CommentsFormManager(".comments_form", commentsService, PubSub);
const footerManager = new FooterManager();

footerManager.init();
commentsListManager.init();
commentsFormManager.init();


// Vuelve al inicio de la página al pulsar el enlace.
$(".return_link").on("click", function(){
    $("body").animate({
        scrollTop: '0px'
    }, 300);
    
    //$("body").scrollTop(0);
});

// Al pulsar sobre un articulo carga la página de detalle.
$(".article").on("click", () => {
    window.location = "./article_details.html";
});

// Accion "Me Gusta"
$(".like_button").on("click", () => {
    // En que like de todos se ha pulsado.
    // Gestiona los "me gusta" de los articulos.
    let iLikeItArray;
    if(localStorage.iLikeItArray === undefined){
        // Crear objeto de 10 elementos de forma automatica.
        iLikeItArray = {
            "1":0,
            "2":0,
            "3":0
        }
        localStorage.setItem("iLikeItArray", JSON.stringify(iLikeItArray));
    }else{
        iLikeItArray = JSON.parse(localStorage.getItem("iLikeItArray"));
        iLikeItArray[1] = iLikeItArray[1] + 1;
        localStorage.setItem("iLikeItArray", JSON.stringify(iLikeItArray));
    }
    console.log(localStorage.iLikeItArray);
});

// Fecha de publicacion del articulo.
// Cargar Comentarios al pulsar enlace en index.