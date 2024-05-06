const form = document.querySelector('form')
const input = document.querySelector('input')
const errorMsg = document.querySelector('.error-msg')
const resultsDisplay = document.querySelector('.results-display')


form.addEventListener('submit', getInput)

function getInput(event) {
    event.preventDefault()
    const InputValue = input.value
    if (InputValue === "") {
        errorMsg.textContent = 'Oups votre champs est vide'
    } else {
        resultsDisplay.innerHTML = ""

        callEndPoint(InputValue)
        input.value = ""
    }
}


async function callEndPoint(searchInput) {
   
    let EndPoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

    const response = await fetch(EndPoint);
    const data = await response.json();



    data.query.search.forEach(element => {
        
        console.log(element.title)
        const titleElm = element.title
        const titleElmFormated = titleElm.replace(/ /g, '_')
        const linkElm = document.createElement('div')
        linkElm.innerHTML=`<a href ="https://fr.wikipedia.org/wiki/${titleElmFormated}">${element.title}</a>`
        resultsDisplay.appendChild(linkElm)

    });
}






