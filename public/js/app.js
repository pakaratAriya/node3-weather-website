const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    if(location.trim()===""){
        messageOne.textContent = "Error:"
        messageTwo.textContent = "Please provide an address."
        return
    }
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.err){
                messageOne.textContent = "Error:"
                messageTwo.textContent = data.err
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
    
        })
    })
})