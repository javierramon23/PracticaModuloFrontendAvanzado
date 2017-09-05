const $ = require("jquery");

export default class ArticlesListManager {

    constructor(elementSelector, articlesService) {
        this.element = $(elementSelector);
        this.articlesService = articlesService;
    }

    init() {
        this.articlesService.initStorage();
        //
        let self = this;

        this.element.on("click", ".like_button",function() {
            //
            let articleId = this.dataset.id
            //
            self.articlesService.addVote(articleId);
        });

        this.element.on("click",".article_img_div", () => {
            //
            location = "./article_details.html";
        });

        // Mostramos los votos de cada articulo.
        this.element.find(".article").find(".like_button").append("()");
    }
}