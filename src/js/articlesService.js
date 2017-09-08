const $ = require("jquery");

export default class ArticlesService {

    constructor () {

    }

    initStorage() {
        const likeVotes = localStorage.votesArray;
        if(likeVotes == undefined){
            const votesArray = {}; 
            for(let i = 0; i < 10; i++) {
                votesArray[i] = 0; 
            }
            localStorage.setItem("votesArray", JSON.stringify(votesArray));
        }
    }

    add(articleId) {
        let iLikeItArray = JSON.parse(localStorage.getItem("votesArray"));
        iLikeItArray[articleId] = iLikeItArray[articleId] + 1;
        localStorage.setItem("votesArray", JSON.stringify(iLikeItArray));
    }

    read(articleId) {
        let iLikeItArray = JSON.parse(localStorage.getItem("votesArray"));
        return iLikeItArray[articleId];
    }
}