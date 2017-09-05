const $ = require("jquery");

export default class ArticlesService {

    constructor () {

    }

    initStorage() {
        //localStorage.clear();
        const likeVotes = localStorage.votesArray;
        
        if(likeVotes == undefined){
            const votesArray = {}; 
            for(let i = 0; i < 10; i++) {
                votesArray[i] = 0; 
            }
            localStorage.setItem("votesArray", JSON.stringify(votesArray));
        }
    }

    addVote(articleId) {
        let iLikeItArray 
        iLikeItArray = JSON.parse(localStorage.getItem("votesArray"));
        iLikeItArray[articleId] = iLikeItArray[articleId] + 1;
        localStorage.setItem("votesArray", JSON.stringify(iLikeItArray));
        console.log(localStorage.votesArray);
    }
}