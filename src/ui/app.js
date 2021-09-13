const myform = document.getElementById('myform')
const title = document.getElementById('title')
const body = document.getElementById('description')

const articles = document.getElementById('articles')

let articleId = 0;

// Connecting with backend

const insertData = (newData) => {
    fetch('http://127.0.0.1:5000/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(newData)
    })
    .then(resp => resp.json())
    // .then((data) => {
    //     console.log(data)
    // })
    .then(() => {
        getAllData()  //////////////////////// To GET ALL DATA AFTER INSERTING
    })
    .catch(error => console.log(error))
}

const getAllData = () => {
    fetch('http://127.0.0.1:5000/get', {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    .then(resp => resp.json())
    // .then(data => console.log(data))
    .then(data => renderArticles(data))
    .catch(error => console.log(error))
}

const deleteData = (id) => {
    fetch(`http://127.0.0.1:5000/delete/${id}/`, {
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        }
        
    })
    getAllData() // to reload the data
}

// the update process ===> SOmething interesting

const getDataById = (id) => {
    fetch(`http://127.0.0.1:5000/get/${id}/`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
        
    })
    .then(resp => resp.json())
    .then(data => {
        // console.log(data['title']);
        renderOneItem(data)
    })
    getAllData() // to reload the data
}

const renderOneItem = (mydata) => {
    title.value = mydata.title
    body.value = mydata.body

    articleId = mydata.id
}

const updateData = (articleId, mydata) => {
    fetch(`http://127.0.0.1:5000/update/${articleId}/`, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(mydata)
        
    })
    .then(resp => resp.json())
    .then(() => {
        getAllData() 
    })
}
 


// Rendering articles to the UI
function renderArticles(mydata) {
    articles.innerHTML = '';

    mydata.forEach(data => {
        articles.innerHTML += `
        <div class = "card card-body my-2">
        <h2>${data.title}</h2>
        <p>${data.body}</p>
        <h5>${data.date}</h5>

        <p>
        <button class="btn btn-danger" onclick="deleteData('${data.id}')">Delete</button>
        <button class="btn btn-success" onclick="getDataById('${data.id}')")>Update</button>
        </p>

        </div>
        `
    })

}



// Adding event listeners

myform.addEventListener('submit', (e) => {
    e.preventDefault()

    const newData = {
        title: title.value,
        body: body.value
    }

    // to check wheteher an id is available
    if(articleId != 0){
        updateData(articleId, newData)
        articleId = 0
    }
    // else we simply insert data
    else {
        insertData(newData)
    }
    
    myform.reset() // to reset, otherwise it will not show data in the UI after added

})

// Classes, functions like variables declared with const and let, cannot be referenced before the line that initializes
// them runs. For example, the following is forbidden:
// console.log(foo);
// const foo = 'foo';
getAllData()   // calling the get method
