var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleOne = {
    title: 'Article One | Vaibhav Sanil',
    heading: 'Article One',
    date: 'Sep 5 2016',
    content:`<p>
                This is the content for my first article,This is the content for my first article,This is the content for my first article,
                This is the content for my first article,This is the content for my first article,This is the content for my first article,
                This is the content for my first article,This is the content for my first article,This is the content for my first article,
            </p>
            
            <p>
                This is the content for my first article,This is the content for my first article,This is the content for my first article,
                This is the content for my first article,This is the content for my first article,This is the content for my first article,
                This is the content for my first article,This is the content for my first article,This is the content for my first article,
            </p>
            
            <p>
                This is the content for my first article,This is the content for my first article,This is the content for my first article,
                This is the content for my first article,This is the content for my first article,This is the content for my first article,
                This is the content for my first article,This is the content for my first article,This is the content for my first article,
            </p>`
}



function createTemplate(data){
            var title = data.title ;
            var date =  data.date ;
            var heading = data.heading ;
            var content = data.content ;
            var htmlTemplate = `
                <html>
                    <head>
                      <title>${title}</title>
                    <link href="/ui/style.css" rel="stylesheet" />
                         
                    </head>
            
                    <body>
                       <div>
                           <a href="/">Home</a>
                           <meta name="viewport" content="width=device-width,initial-scale=1" />
                       </div> 
                       <hr/>
             
                    
                    <div class="container">
                        <h3>${heading}</h3>
                        <br></br>
                        <h4>${date}</h4>
                        ${content}
                    </div>
                    </html>
                    `;

    return htmlTemplate;
    
}            
            app.get('/article-one',function(req, res){
                res.send(createTemplate(articleOne));
            });


app.get('/article-two',function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'articel-two.html'));
});

app.get('/article-three',function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
