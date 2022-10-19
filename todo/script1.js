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
        request.send(JSON.stringify({todo:input.value},{todo:delbutton}));

        request.addEventListener("load",function(){
          
         var list=document.createElement("li")
         list.innerHTML=input.value;
         parent.appendChild(list)
         var delbutton=document.createElement("button")
         delbutton.innerHTML=Delete;
         list.appendChild(delbutton)
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
      var list=document.createElement("li")
      list.innerHTML=task.todo;
      parent.appendChild(list)
      var delbutton=document.createElement("button")
      delbutton.innerHTML=Delete;
      parent.appendChild(delbutton)
      input.value=""
    })

})
