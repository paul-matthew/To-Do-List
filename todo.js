//MAIN CODE (ie. new entries,delete, done)
function addToDo() {
  if(document.querySelector('#newtask input').value.length == 0){
    alert("Enter a Task");
    if(p<=0){p=0} //to make sure that var p (for tracking max entries) doesn't increase on invalid entry
    else{p--}    
  }

  else{
    var Input = document.getElementById("enter").value // gets input from input box
    var list = document.getElementById('todos'); // gets the list div from html doc
    var entry = document.createElement('li'); // creates a new list element 
    entry.setAttribute('id', 'ToDo') // adds id to list element
    entry.setAttribute('class', 'todoitem')

    var doneTodo = document.createElement("button");
    var deleteTodo = document.createElement("button"); // creates a button
    var editinp = document.createElement("button");

    deleteTodo.setAttribute('class', 'ripple')
    doneTodo.setAttribute('class', 'ripple')
    editinp.setAttribute('class', 'ripple')
   
    deleteTodo.setAttribute('id', 'deletetodobtn')
    doneTodo.setAttribute('id', 'donetodobtn')
    editinp.setAttribute('id', 'editbtn')

    deleteTodo.innerHTML = "🗑️" // button text  
    doneTodo.innerHTML = "⬜"
    editinp.innerHTML = "✏️"
  
    //check mark function
    var doneclick = 0;
    doneTodo.onclick=function done(){
      entry.classList.toggle('strike'); 
      if ( doneclick % 2 == 0 ) {
        doneTodo.innerHTML="✅";
      } 
      else {
        doneTodo.innerHTML="⬜";
      }
      doneclick++
    }
  
    //delete button function
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
      clickCount++
      console.log(clickCount)
      if (clickCount % 2 != 0 ) {
        editinp.style.background="red"
        entry.contentEditable = true;
        editinp.contentEditable = false;
        doneTodo.contentEditable = false;
        deleteTodo.contentEditable = false;
        paragraph.style.backgroundColor = "#dddbdb";
        document.addEventListener("keypress", function onEvent(event) { // if enter is clicked todo is added
          if (event.key === "Enter" && clickCount%2!=0){
            clickCount++
            console.log(clickCount) 
            editinp.style.background=""
            entry.contentEditable = false;
            paragraph.style.backgroundColor = "#63b5f8";
            return;
          }
        })
        window.onclick = function(i) {
          if (!i.target.matches('.todoitem') && !i.target.matches('#editbtn') && clickCount%2!=0) {
            clickCount++;
            console.log(clickCount);
            editinp.style.background=""
            entry.contentEditable = false;
            paragraph.style.backgroundColor = "#63b5f8";
          }
        }
      } 
      else {
        editinp.style.background=""
        entry.contentEditable = false;
        paragraph.style.backgroundColor = "#63b5f8";
      }
    }
   
  }
    

  

  //append li and buttons to entry 
  entry.textContent = Input // adds  input text to list element 
  list.appendChild(entry); // adds element to list 
  entry.appendChild(editinp);
  entry.appendChild(doneTodo);
  entry.appendChild(deleteTodo); // appends the button 
  document.getElementById("enter").value = ""; // reinitialises text field with ""   
    

}

//MAX ENTRIES CHECK
var p=0
document.addEventListener("keypress", function onEvent(event) { // if enter is clicked todo is added
  if (event.key === "Enter" && p!==10 && document.querySelector('#newtask input') ==document.activeElement){
    addToDo();counter();
  }
})
function counter(){
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

//MAX CHARACTERS CHECK
document.addEventListener("keypress", function onEvent(event) { // if enter is clicked todo is added
  charactermax();
})
function charactermax(){
  if(document.querySelector('#newtask input').value.length+1>=100){
    alert("Maximum characters reached")
  }
}

//CLEAR BUTTON FUNCTION
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

//MENU BUTTON FUNCTION
function dropdown(){
  document.getElementById("mydropdown").classList.toggle("showme");

}
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(e) {
  if (!e.target.matches('.menuicon') && !e.target.matches('.menubar')) {
  var myDropdownop = document.getElementById("mydropdown");
    if (myDropdownop.classList.contains('showme')) {
      myDropdownop.classList.remove('showme');
    }
  }
}

//DAY OF THE WEEK CODE
var dt = new Date().toLocaleString('default',{weekday:'long'});
document.getElementById('weekday').innerHTML=dt;
