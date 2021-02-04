

let apiRoot = 'http://localhost:5000/api/articles';

const test = () => {    
    console.log("TESTING")
};

function getAllArticles(callback)
{
    fetch(apiRoot)
    .then( (response) => (
        response.json().then(data =>(
            callback(data)
        ))
    ))
}

export default {
    getAllArticles,
    test
}