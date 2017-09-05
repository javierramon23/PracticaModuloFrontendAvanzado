window.$ = window.jQuery = require("jquery");

import UIManager from "./uiManager";

import CommentsService from "./commentsService";
import ArticlesService from "./articlesService";

import ArticlesListManager from "./articlesListManager";
import CommentsListManager from "./commentsListManager";

import CommentsFormManager from "./commentsFormManager";

import PubSub from "pubsub-js";
import FooterManager from "./footerManager";


const commentsUIManager = new UIManager(".comments_list");

const commentsService = new CommentsService("/comments/");
const articlesService = new ArticlesService();

const articlesListManager = new ArticlesListManager(".articles_list", articlesService);
const commentsListManager = new CommentsListManager(commentsService, commentsUIManager, PubSub);
const commentsFormManager = new CommentsFormManager(".comments_form", commentsService, PubSub);

const footerManager = new FooterManager(".return_link");

footerManager.init();
articlesListManager.init();
// Inicializa la carga de comentarios.
commentsListManager.init();
commentsFormManager.init();

// Fecha de publicacion del articulo.
// Cargar Comentarios al pulsar enlace en index.