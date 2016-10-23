var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    host: 'db.imad.hasura-app.io',
    user: 'vaibhavsanil',
    password: process.env.DB_PASSWORD,
    database: 'vaibhavsanil',
    port: '5432'
};

var app = express();
app.use(morgan('combined'));
var articles={
            'article-one': {
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
        },
            'article-two': {
            title: 'Article Two | Vaibhav Sanil',
            heading: 'Article Two',
            date: 'Sep 10 2016',
            content:`<p>
                       This is article two.
                    </p>`},
            'article-three': {
           title: 'Article Three | Vaibhav Sanil',
            heading: 'Article Three',
            date: 'Sep 12 2016',
            content:'<p> This is article three </p>'}
};

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
                        <h4>${date.toDateString()}</h4>
                        ${content}
                    </div>
                    </html>
                    `;

    return htmlTemplate;
    
}            


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
  //Make a select statement & return the query with the results
  pool.query('SELECT * FROM test',function(err,result){
      if(err){
       res.status(500).send(err.toString());
      } else {
           res.send(JSON.stringify(result.rows));  
      }
  });
  //Return a response with results
  
});

var names = [];
app.get('/submit-name', function(req,res){
    //Get the name from the request
    
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

var counter=0;
app.get('/counter',function(req,res){
          counter = counter + 1;
          res.send(counter.toString());
        });

app.get('/articles/:articleName',function(req,res){
              

             
             pool.query("SELECT * FROM article WHERE title =$1"[req.params.articleName], function(err,result){
                 if(err){
                     res.status(500).send(err.toString());
                 } else {
                     if(result.rows.length === 0){
                         res.status(404).send('Article Not Found');
                     } else {
                         var articleData = result.rows[0];
                         res.send(createTemplate(articleData)); 
                     }
                 }
             });
         
        });



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});






var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});



//app.get('/:articleName',function(req, res){
  //              var articleName= req.params.articleName; 
    //            res.send(createTemplate(articles[articleName]));
      //      });

