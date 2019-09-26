console.log('app js is loaded!!!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const pError = document.querySelector('#error')
const pTemp = document.querySelector('#temperature')
const pSummary = document.querySelector('#summary')

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const location = search.value

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                pError.textContent = data.error
            } else {
                pError.textContent = ''
                pTemp.textContent = data.temperature
                pSummary.textContent = data.summary
            }
        })
    })
})