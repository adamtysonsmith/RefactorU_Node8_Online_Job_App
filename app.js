var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var Applicant   = require('./models/applicant.js');

// Connect to the DB
mongoose.connect('mongodb://localhost/omega3');

// Initialize Express
var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

// Routes
app.get('/', function(req, res) {
	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res) {
    Applicant.find({}, function(err, docs){
	   res.render('applicants', {applicants: docs})
    });
});

app.get('/success', function(req, res) {
    res.send('Success ya bastard!');
});

// creates and applicant
app.post('/applicant', function(req, res) {
	// Here is where you need to get the data
	// from the post body and store it in the database
    var data = req.body;
    
    var newApplicant = new Applicant({
        name: data.name,
        bio: data.bio,
        skills: data.skills.replace(/ /g,'').split(','),
        years: data.years,
        why: data.why
    });
    
    newApplicant.save(function(){
        res.redirect('/success');   
    });
});

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
