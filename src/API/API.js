

require("node-fetch");

let apiRoot = 'https://fake-ai-news-backend.herokuapp.com/api/articles';

const test = () => {    
    console.log("TESTING")
};

function getAllArticles(callback){
    fetch(apiRoot)
    .then( (response) => (
        response.json().then(data =>(
            callback(data)
        ))
    ))
}
function createArticle(data, callback){
    fetch(apiRoot, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then( (response) => (
        response.json().then(data =>(
            callback(data)
        ))
    ))
}
function deleteArticle(id, callback){
    fetch(apiRoot+"/"+id, {
        method: 'DELETE',
      }).then( (response) => (
        response.json().then(data =>(
            callback(data)
        ))
    ))
}

export default {
    createArticle,
    deleteArticle,
    getAllArticles,
    test
}