//Day of the week code below
var dt = new Date().toLocaleString('default',{weekday:'long'});
document.getElementById('weekday').innerHTML=dt;

//Main code below (ie. new entries,delete, done)
function addToDo() {
  if(document.querySelector('#newtask input').value.length == 0 && document.querySelector('#newtask input') ==document.activeElement){
    alert("Enter a Task");
    if(p<=0){p=0} //to make sure that var p (for tracking max entries) doesn't increase on invalid entry
    else{p--}    
  }

  else{
    var Input = document.getElementById("enter").value // gets input from input box
    var list = document.getElementById('todos'); // gets the list div from html doc
    var entry = document.createElement('li'); // creats a new list element 
    entry.setAttribute('id', 'ToDo') // adds id to list element 

    //var Input = document.createElement("input");//for the edit function..test test test

    var doneTodo = document.createElement("button");
    var deleteTodo = document.createElement("button"); // creates a button
    var editinp = document.createElement("button");

    deleteTodo.setAttribute('class', 'ripple')
    doneTodo.setAttribute('class', 'ripple')
    editinp.setAttribute('class', 'ripple')
    //list.setAttribute('class','xx')
    
   
    deleteTodo.setAttribute('id', 'deletetodobtn')
    doneTodo.setAttribute('id', 'deletetodobtn')
    editinp.setAttribute('id', 'editbtn')

    deleteTodo.innerHTML = "🗑️" // button text  
    doneTodo.innerHTML = "Done"
    editinp.innerHTML = "✏️"
  
    doneTodo.onclick = function doneTodo() { // function to delete list element (todo) 
      entry.classList.toggle('strike'); // or just classList.add
    }
  
    deleteTodo.onclick = function deleteTodo() { // function to delete list element (todo) 
      entry.remove();
      p--                             //this portion related to maximum entries code (see further below)
      if(p!==10){
        document.querySelector("#add").disabled=false;
        document.querySelector("#add").style.background=""; 
      }
      if(p==0){
        document.querySelector("#clear").style.background="grey"
      }
    }

    
    //edit button function
    const paragraph = document.getElementById("todos");
 
    var clickCount = 0;
    editinp.onclick=function checkClick(){
      if ( clickCount % 2 == 0 ) {
        editinp.style.background="red"
        entry.contentEditable = true;
        editinp.contentEditable = false;
        doneTodo.contentEditable = false;
        deleteTodo.contentEditable = false;
        paragraph.style.backgroundColor = "#dddbdb";
        document.addEventListener("keypress", function onEvent(event) { // if enter is clicked todo is added
          if (event.key === "Enter"){
            
            editinp.style.background=""
            entry.contentEditable = false;
            paragraph.style.backgroundColor = "#63b5f8";
          }
        })
      } 
      else {
        editinp.style.background=""
        entry.contentEditable = false;
        paragraph.style.backgroundColor = "#63b5f8";
      }
      clickCount++
    }

    
  }
  
  entry.textContent = Input // adds  input text to list element 
  list.appendChild(entry); // adds element to list 
  entry.appendChild(editinp);
  entry.appendChild(doneTodo);
  entry.appendChild(deleteTodo); // appends the button 
  document.getElementById("enter").value = ""; // reinitialises text field with ""   
    

}

//for the maximum entries allowed in the list
var p=0
document.addEventListener("keypress", function onEvent(event) { // if enter is clicked todo is added
  if (event.key === "Enter" && p!==10 && document.querySelector('#newtask input') ==document.activeElement){
    addToDo();counter();
  }
})

function counter(){//can any of this code be replaced with a 'for' statement to be more efficent?
  p++;
  if (p>=1){
    document.querySelector("#clear").style.background="";//To reset clear button to appear clickable
  }

  if(p>=10){
    alert("Maximum of 10 entries permitted")
    document.querySelector("#add").style.background="grey";  
    document.querySelector("#add").disabled=true;
    document.removeEventListener("keypress", function onEvent(event){ 
      if (event.key === "Enter"){
      }
    })
  }
  else{
    document.querySelector("#add").disabled=false;
    document.querySelector("#add").style.background="";    
  }
}

//To detect the maximum input characters allowed
document.addEventListener("keypress", function onEvent(event) { // if enter is clicked todo is added
  charactermax();
})
function charactermax(){
  if(document.querySelector('#newtask input').value.length+1>=100){
    alert("Maximum characters reached")
  }
}
//Clear button:functionality
function clears(){
  if(p>0){
    var c=confirm("Confirm deletion of all existing entries");
    if(c==true){
      let todos=document.getElementById("todos");
      [...todos.children].forEach(c=>todos.removeChild(c));p=0;
      document.querySelector("#clear").style.background="grey" //to reset clear button to grey after execution of clear function
      document.querySelector("#add").disabled=false;//to reset the add button to function in case it was disabled at max entries
      document.querySelector("#add").style.background=""; //consider making these two lines a function since this code is already used above    
    }
  }
  else{
    alert("Opps. No entries found to clear")
  }
}
//Clear button:set button to grey on load
window.onload=function testtest(){
  if(p==0){document.querySelector("#clear").style.background="grey";
  }
}
