const myform = document.getElementById('myform')
const title = document.getElementById('title')
const body = document.getElementById('description')


// Adding event listeners

myform.addEventListener('submit', (e) => {
    e.preventDefault()

    const newData = {
        title: title.value,
        body: body.value
    }
    
    insertData(newData)

})



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
    .then((data) => {
        console.log(data)
    })
    .catch(error => console.log(error))
}