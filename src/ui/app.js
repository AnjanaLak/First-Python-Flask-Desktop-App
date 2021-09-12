const myform = document.getElementById('myform')
const title = document.getElementById('title')
const body = document.getElementById('description')

const articles = document.getElementById('articles')

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
        <button class="btn btn-danger">Delete</button>
        <button class="btn btn-success">Update</button>
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
    
    insertData(newData)
    myform.reset() // to reset, otherwise it will not show data in the UI after added

})

// Classes, functions like variables declared with const and let, cannot be referenced before the line that initializes
// them runs. For example, the following is forbidden:
// console.log(foo);
// const foo = 'foo';
getAllData()   // calling the get method
