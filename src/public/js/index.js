const inputId = document.querySelector('#id');
const btnSubmit = document.querySelector('#btnSubmit');

btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    let id = inputId.value
    let response = await fetch('/api/products/:id', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
    })
    let data = await response.json();
    console.log(data);
    
})