
const fetch = require('node-fetch').default;

let apiRoot = 'https://fake-ai-news-backend.herokuapp.com/api/articles';

const test = () => {    
    console.log("TESTING")
};

const getAllArticles = async (callback)=>{

    await fetch(apiRoot)
    .then( (response) => (
        response.json().then(data =>(
            callback(data)
        ))
    ))
}
const createArticle = async (data, callback)=>{
    await fetch(apiRoot, {
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
const deleteArticle = async (id, callback)=>{
    await fetch(apiRoot+"/"+id, {
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