var input=document.getElementById("input")
var btn=document.getElementById("btn")
var parent=document.getElementById("parent")
btn.addEventListener("click",function(event)
{
    if(input.value)
    {

        var request=new XMLHttpRequest();
        request.open("post","/save")
        request.setRequestHeader("content-type","application/json")
        request.send(JSON.stringify({todo:input.value,todo:"Delete"}));
        request.addEventListener("load",function(){
        var todobox=document.createElement("div")
        todobox.setAttribute("id","todobox")
        parent.appendChild(todobox)
         var list=document.createElement("li")
         list.setAttribute("id","todo1")
         list.innerHTML=input.value;
         todobox.appendChild(list)
         var delbutton=document.createElement("button")
         delbutton.innerHTML="Delete";
         todobox.appendChild(delbutton)
         input.value=""

      })

         
    }
 })

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
         var delbutton=document.createElement("button")
         delbutton.innerHTML="Delete";
         todobox.appendChild(delbutton)
         input.value=""
    })

})
