export default class CommentsListManager {

    constructor(commentsService, commentsUIManager) {
        this.commentsService = commentsService;
        this.commentsUIManager = commentsUIManager;
    }

    init() {
        this.loadComments();
    }

    loadComments() {
        this.commentsService.load(comments => {
            if(comments.length == 0){
                this.commentsUIManager.setEmpty();
            } else {
                this.renderComments(comments);
            }
        }, error => {
            this.commentsUIManager.setError();
            console.log("Error al cargar los comentarios", error);
        });
    }

    renderComments(comments) {
        let html = "";
        for(let comment of comments) {
            html += this.renderComment(comment);
        }
        // Sustituimos el HTML actual por el que hems generado.
        this.commentsUIManager.setIdealHtml(html);

        // Eliminados el estado loading y mostramos el ideal
        this.commentsUIManager.setIdeal();
    }

    renderComment(comment){
      return `<article class="comment">
                <div>${comment.name} ${comment.surname} | ${comment.email}</div>
                <p>${comment.text}</p>    
              </article>
              <br>`;
    }
}