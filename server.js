var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://test:tester@novus.modulusmongo.net:27017/ivadi9Ry');
var Bear = require('./app/models/bear');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 5000; 
var router = express.Router();

router.use(function(req, res, next) {
    console.log('Request is being made');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/bears')
	.post(function(req, res){
		var bear = new Bear();
		bear.name = req.body.name;
        bear.color = req.body.color;
		bear.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Bear created!' });
        	})
        console.log('Post request successful');
		})

	.get(function(req, res){
		Bear.find(function(err, bears) {
            if (err)
                res.send(err);
            res.json(bears);
        });
        console.log('Get request successful');
    });


router.route('/bears/:bear_id')
 .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
        console.log('Get using ID successful');
    })

.put(function(req, res) {
        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info
            bear.color = req.body.color; 
            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
        console.log('Put request successful');
    })

.delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
        console.log('Delete request successful');
    });


router.get('/', function(req, res){
	res.json({ message: 'Welcome to our api!' });
});


app.use('/api', router);

var staticPath = path.resolve(__dirname, '/public');
app.use(express.static(staticPath));

app.listen(port);
console.log('Magic happens on port ' + port);