


document.getElementById("top-left").innerText = "Change me"



buttons = document.getElementsByClassName('btn')

buttons =[...buttons] 
buttons.forEach(button => {
   
    button.addEventListener('click', function(event){


        console.log(button.value)




















    })    
});
