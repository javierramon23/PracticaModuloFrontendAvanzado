const $ = require("jquery");

export default class ArticlesListManager {

    constructor(elementSelector, articlesService) {
        this.element = $(elementSelector);
        this.articlesService = articlesService;
    }

    init() {
        this.articlesService.initStorage();
        this.publicationDate() 
        this.showVotes();
        this.likeButtonEventHandler();
        this.detailEventHandler();
    }

    showVotes() {
        let self = this;
        this.element.find(".article").each(function() {
            const articleId = this.getAttribute("articleId");
            const votes = self.articlesService.read(articleId);
            self.renderVotes(articleId, votes);
        })
        
    }

    renderVotes(id, votes) {
        this.element.find(`[articleId =${id}]`).find(".like_button").append(` (${votes})`);
    }

    publicationDate() {
        let self = this;
        this.element.find(".publication_date").each(function() {
            const publicationDate = this.getAttribute("datetime");
            self.timeAgo(publicationDate);
            self.renderDate();
        })
    }

    timeAgo(publicationDate) {
        Date.prototype.getElapsedTime = function() {
            // Fecha Actual
            var diffDate = new Date(new Date() - this);
            return 
            "Years: " + (diffDate.getFullYear() - 1970) + 
            ", Months: " + diffDate.getMonth() + 
            ", Days: " + (diffDate.getDate() - 1) + 
            ", Hours: " + diffDate.getHours() + 
            ", Minutes: " + diffDate.getMinutes() + 
            ", Seconds: " + diffDate.getSeconds();
          };
          
          // Fecha de publicacion
          var from = new Date("02/07/1900 04:07:00");
          //document.getElementById("result").innerHTML = from.getElapsedTime();
    }

    renderDate() {

    }

    likeButtonEventHandler() {
        let self = this;
        this.element.on("click", ".like_button",function() {
            const articleId = this.dataset.id;
            self.articlesService.add(articleId);
        });
    }

    detailEventHandler() {
        this.element.on("click",".article_img_div", () => {
            // Redireccionamos al detalle del articulo.
            location = "./article_details.html";
        });
    }
}