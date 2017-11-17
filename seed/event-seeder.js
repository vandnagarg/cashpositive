var Event = require('../models/event');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;   //because error was coming 
mongoose.connect('mongodb://localhost:27017/event', { useMongoClient: true });

var events = [
new Event({
		title:'C++ Workshop',
		date:'12/09/2017',
		organiser:'Ms. varkha',
		location:'Amritsar',
		description:'C++ tech',
		ticketPrice:'100',
		comments: []

	}),
	new Event({
		title:'Web Spiral',
		date:'22/09/2017',
		organiser:'Ms. varkha',
		location:'Amritsar',
		description:'Web tech',
		ticketPrice:'30',
		comments: []

	}),
	
	new Event({
		title:'Java Seminar',
		date:'22/10/2017',
		organiser:'Ms. varkha',
		location:'Amritsar',
		description:'Java tech',
		ticketPrice:'30',
		comments: []

	}),
	new Event({
		title:'Android Development',
		date:'12/10/2017',
		organiser:'Ms. varkha',
		location:'Amritsar',
		description:'Android tech',
		ticketPrice:'30',
		comments: []

	}),
	new Event({
		title:'Python Workshop',
		date:'08/09/2017',
		organiser:'Ms. varkha',
		location:'Amritsar',
		description:'Python tech',
		ticketPrice:'30',
		comments: []

	})
];
var done = 0;

for (var i =0;i<events.length ; i++) {
	events[i].save(function(err,result)
	{
		done++;
		if(done === events.length)
		{
			exit();
		}
	})
}
function exit()
{
	mongoose.disconnect();
}

