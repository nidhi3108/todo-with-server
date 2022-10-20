var input=document.getElementById("input")
var btn=document.getElementById("btn")
var parent=document.getElementById("parent")

btn.addEventListener("click",function(event)
{
    if(input.value)
    {
        var request=new XMLHttpRequest();
        request.open("post","/save")
        request.setRequestHeader("Content-Type","application/json")
        request.send(JSON.stringify({todo:input.value}));
        request.addEventListener("load",function(){
        var todobox=document.createElement("div")
        todobox.setAttribute("id","todobox")
        parent.appendChild(todobox)
         var list=document.createElement("li")
         list.setAttribute("id","todo1")
         list.innerHTML=input.value;
         todobox.appendChild(list)
         var editButton=document.createElement("button")
         editButton.setAttribute("id","edit")
         editButton.innerHTML="Edit"
         todobox.appendChild(editButton)
         var delbutton=document.createElement("button")
         delbutton.innerHTML="Delete";
         todobox.appendChild(delbutton)
         input.value=""
         delbutton.addEventListener("click",deletetodo)
         editButton.addEventListener("click",edittodo)
      }) 
    }
 })

function edittodo(event){
  var todobox=event.target.parentNode;
  console.log(todobox);
    var edittargetvalue=event.target.innerHTML;
    console.log(edittargetvalue);           //edit or save innertext
    var currenttodovalue=event.target.parentNode.children[0];
    console.log(currenttodovalue);       //li item todo value whole li box
    var aftertodovalue=event.target.parentNode.children[0].innerHTML;
    console.log(aftertodovalue);
    if(edittargetvalue=='Edit')
    {
      var inputedittodo=document.createElement("input")
      currenttodovalue.innerHTML='';
      currenttodovalue.appendChild(inputedittodo);
      event.target.innerHTML="Save";
      console.log(inputedittodo.value);
    }
    else{
      var newvalue=event.target.parentNode.children[0].innerHTML;
      console.log(newvalue);
      currenttodovalue.innerHTML='';
      console.log(currenttodovalue);
      todobox.prepend(currenttodovalue)
      currenttodovalue.innerHTML="Sad";
      event.target.innerHTML="Edit"
      
    }
}
  
function deletetodo(event){
    var todo=event.target.parentNode.children[0].innerHTML;
    var targetParent = event.target.parentNode;
    var request=new XMLHttpRequest();
    request.open("post","/delete")
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify({key:todo}));
    request.addEventListener("load",function(){
      //yha p server se jo res aata h vo likha jata h
      console.log(request.responseText);
      console.log(request.status);
      if(request.status==200)
      {
        targetParent.remove();
      }
    })
}
  



 var request=new XMLHttpRequest();
 request.open("post","/todo")
 request.send();

 request.addEventListener("load",function(todo){
   var todos=JSON.parse(request.responseText)
    todos.forEach(function(task){
      var todobox=document.createElement("div")
      todobox.setAttribute("id","todobox")
        parent.appendChild(todobox)
         var list=document.createElement("li")
         list.setAttribute("id","todo1")
         list.innerHTML=task.todo;
         todobox.appendChild(list)
         var editButton=document.createElement("button")
         editButton.setAttribute("id","edit")
         editButton.innerHTML="Edit"
         todobox.appendChild(editButton)
         var delbutton=document.createElement("button")
         delbutton.innerHTML="Delete";
         todobox.appendChild(delbutton)
         input.value=""
         delbutton.addEventListener("click",deletetodo)
         editButton.addEventListener("click",edittodo)
    })
})
