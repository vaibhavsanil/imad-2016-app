// Counter Code

var button = document.getElementById('counter');
button.onclick = function(){
    
    // get value from counter endpoint
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        
        if(request.readyState === XMLHttpRequest.DONE){
            //Take Some Action
          if(request.status === 200){
              var counter = request.responseText;
              var span = document.getElementById('count');
              span.innerHTML=counter.toString();
    
          }    
            
     }
  };

     //Make the request
     
     request.open('GET','http://vaibhavsanil.imad.hasura-app.io/counter',true);
     request.send(null);
    
    
};



    //Submit Name           
         var nameInput = document.getElementById('name');
         var name = nameInput.value;
         var submit = document.getElementById('submit-btn');
         
         submit.onclick = function(){
             
             // Should make a request to the server and send the name
             
              var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        
        if(request.readyState === XMLHttpRequest.DONE){
            //Take Some Action
          if(request.status === 200){
              //capture  a list of names & render it as a list
             var names = request.responseText;
             names = JSON.parse(names);
             var list = '';
             for(var i=0; i<names.length ; i++){
                 list += '<li>'+ names[i] + '</li>';
             }
             var ul = document.getElementById('namelist');
             ul.innerHTML = list;
          }    
            
     }
  };

     //Make the request
     
     request.open('GET','http://vaibhavsanil.imad.hasura-app.io/submit-name?name=' + name,true);
     request.send(null);
             
}; 
