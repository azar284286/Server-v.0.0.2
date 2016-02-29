var express = require('express');
var router = express.Router();
var path = require('path');
var nedb = require('nedb')
, books = new nedb({
	filename: path.join(__dirname, '../Data', 'BD.db'), autoload: true
});



router.get('/', function(req, res, next) {
var i=Object.keys(req.query);
var booksO = req.query[i[0]];
var CountT = req.query[i[1]];


if(req.query.Изменить=="Изменить")
	books.update({'_id': i[0]}, {$set: {name:booksO, Count: CountT}},true);
if(req.query.Удалить=="Удалить")
	books.remove({'_id': i[0]}, {});
if(req.query.Добавить=="Добавить")
	books.insert({name:'', Count:0});

/* GET users listing. */

 res.write('<!DOCTYPE html>\
 	<html>\
 	<head>\
 	<meta charset="utf-8">\
 	<title>База книг</title>\
 	</head>\
 	<body>\
 	<a href="/"> Go back to the main page </a>\
 	<h1>Books</h1>\
 	<p class="learning-in-progress">A list of books and their number</p>\
 	');

 books.find({}).exec(function (err, docs)
{
	res.write('<table cellpadding="3">');
	for(var i=0; i<docs.length; i++)
		res.write('<td><form><input name="'+docs[i]._id+'" size="10" value="'+docs[i].name+'"><td>\
			<input name="Count" size="10" value="'+docs[i].Count+'"<td>\
			<input type="submit" value="Изменить" name="Изменить">\
			<input type="submit" value="Удалить" name="Удалить"></form><tr>');
	res.write('<form><input type="submit" value="Добавить" name="Добавить"></form></body></html>');
		res.end('');
	});
});


module.exports = router;
