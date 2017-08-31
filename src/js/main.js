window.$ = window.jQuery = require("jquery");

import CommentsService from "./commentsService";
import UIManager from "./uiManager";
import CommentsListManager from "./commentsListManager";
import CommentsFormManager from "./commentsFormManager";
import PubSub from "pubsub-js";

const commentsService = new CommentsService("/comments/");
const commentsUIManager = new UIManager(".comments_list");
const commentsListManager = new CommentsListManager(commentsService, commentsUIManager, PubSub);
const commentsFormManager = new CommentsFormManager(".comments_form", commentsService, PubSub);

commentsListManager.init();
commentsFormManager.init();