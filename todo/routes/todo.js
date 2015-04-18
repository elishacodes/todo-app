var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var todoSchema = mongoose.Schema({
    todo_due_date: Date,
    timestamp: {type: Date, default: Date.now},
    todo_category: String,
    todo_description: String,
    todo_priority: Number,
    todo_complete: Boolean
});

var Todo = mongoose.model('Todo', todoSchema);

/* GET todo page. */
router.get('/', function(req, res, next) {
  return Todo.find( function (err, tasks) {
    if(!err) {
      res.render('todo', {
        greeting: "Howdy",
        tasks: tasks
      });
      console.log(tasks);
    } else {
      return console.error(err);
    }
  });
});


/********** DELETE form. ***********/
router.delete('/', function(req, res){
  Todo.find({_id: req.body.todo_id})
    .remove(function (err){
      if(err){
        console.log(err);
        res.send("FAILED");
      } 
      else{
        res.send("SUCCESS");
      }

    });

});


/********** POST form. ***********/
router.post('/', function(req, res){
	new Todo({
		todo_due_date: req.body.todoDueDate,
		todo_category: req.body.todoCategory,
		todo_description: req.body.todoDescription,
		todo_priority: req.body.todoPriority,	
  }).save(function (err, task) {
    if(err) {
      return console.error(err);
    }
   console.log(task);
  });

  res.redirect('todo');
});




module.exports = router;
