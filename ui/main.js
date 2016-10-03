// Counter Code
 window.onload = function() { 
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
};