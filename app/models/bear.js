var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
    name: String
  , color: String
  ,	link: String
});

module.exports = mongoose.model('Bear', BearSchema);


