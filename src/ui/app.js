const myform = document.getElementById('myform')
const title = document.getElementById('title')
const body = document.getElementById('description')


// Adding event listeners

myform.addEventListener('submit', (e) => {
    e.preventDefault()

    console.log("Hello World")
})
