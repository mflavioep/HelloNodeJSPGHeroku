require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');

const { Client } = require('pg');

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});


client.connect();

app.get('/', function(req, res) {


	client.query(`SELECT * FROM teste`, (err, res) => {
	    console.log("QUERY");
	    if (err) {
		console.error(err);
		return;
	    }
	    for (let row of res.rows) {
		console.log(row);
	    }
	});

	res.sendFile(path.join(__dirname, '/static/index.html'));
});

app.listen(process.env.PORT || 8080, function(){
    console.log('Your node js server is running PGHOST => ', process.env.PGHOST);
});
