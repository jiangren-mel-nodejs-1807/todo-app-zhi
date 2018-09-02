var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({
    extends: false
});

var mongoose = require('mongoose');

mongoose.connect('mongodb://ridiczhi:ridiczhi123@ds239692.mlab.com:39692/express-todo-zhi');

var todoSchema = new mongoose.Schema({
    item: String
});
var Todo = mongoose.model('Todo', todoSchema);

module.exports = function (app) {
    app.get('/', function (req, res) {
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', {
                todo: data
            });
        });
    });


    app.post('/', urlencodedParser, function (req, res) {
        var itemOne = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/:item', function (req, res) {
        Todo.find({
            item: req.params.item.replace(/-/g, " ")
        }).remove(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
}