window.$ = window.jQuery = require("jquery");

import CommentsService from "./commentsService";
import UIManager from "./uiManager";
import CommentsListManager from "./commentsListManager";
import CommentsFormManager from "./commentsFormManager";

const commentsService = new CommentsService("/comments/");
const commentsUIManager = new UIManager(".comments_list");
const commentsListManager = new CommentsListManager(commentsService, commentsUIManager);
const commentsFormManager = new CommentsFormManager(".comments_form", commentsService);

commentsListManager.init();
commentsFormManager.init();