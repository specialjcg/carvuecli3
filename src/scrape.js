var nombre = 0;
const mysql = require ('mysql');
const con = mysql.createConnection ({
  host: '127.0.0.1',
  port: '3306',
  user: 'phpmyadmin',
  password: 'septembre2018',
  database: 'citation',
});

var fs = require ('fs');

var request = require ('request'), iconv = require ('iconv-lite');
var cheerio = require ('cheerio');
var app = require ('express') ();
var server = require ('http').Server (app);
var io = require ('socket.io') (server);
process.setMaxListeners (1000);

con.connect (err => {
  if (err) {
    console.log ('Error connecting to Db');
    return;
  }
  console.log ('Connection established');
});
io.on ('connection', socket => {
  socket.on ('resultat', () => {
    console.log ('Connection resultat');
    socket.emit ('messagetext', citation);
  });
  socket.on ('fermer', () => {
    console.log ('Connection fermer');
    con.end (err => {
      // The connection is terminated gracefully
      // Ensures all previously enqueued queries are still
      // before sending a COM_QUIT packet to the MySQL server.
    });
  });
  socket.on ('lancerecherche2', () => {
    citation = [];

    con.query ('SELECT * FROM mes_citations', (err, rows) => {
      if (err) throw err;

      for (i = 0; i < 6; i++) {
        const generatehazard = () => Math.floor (Math.random () * 10) + 1;

        for (k = 0; k < generatehazard (); k++) {
          j = Math.floor (Math.random () * 80);
        }
        console.log (j);
        var test = true;
        citation.forEach (title => {
          title === rows[j].title ? (test = false) : test;
        });
        test ? citation.push (rows[j]) : i--;
      }
    });
  });
});

server.listen (3000);

//for (i = 7; i < 9; i++) {
// scrape ('https://citation-celebre.leparisien.fr/citation/reussite?page=' + i);
//}

function scrape (url) {
  request ({url, encoding: null}, function (error, response, body) {
    var text = [];
    var author = [];
    if (!error) {
      var bodyWithCorrectEncoding = iconv.decode (body, 'iso-8859-1');

      var $ = cheerio.load (bodyWithCorrectEncoding);

      $ ('q').each (function (i, e) {
        var text1 = $ (this).text ();

        text.push (text1.replace (/[\n\r\s\t]+/g, ' '));
      });
      $ ('cite').each (function (i, e) {
        var text1 = $ (this).text ();

        author.push (text1.replace (/[\n\r\s\t]+/g, ' '));
      });

      var value = [];
      if (text.length !== 0) {
        for (i = 0; i < text.length; i++) {
          value.push ([text[i], author[i]]);
        }
        var sql = 'INSERT INTO mes_citations (title, author) VALUES ?';
        con.connect (err => {
          if (err) {
            console.log ('Error connecting to Db');
            return;
          }
          console.log ('Connection established');
        });

        con.query (sql, [value], (err, res) => {
          if (err) throw err;
          console.log ('1 record inserted');
          con.end (err => {
            // The connection is terminated gracefully
            // Ensures all previously enqueued queries are still
            // before sending a COM_QUIT packet to the MySQL server.
          });
        });

        emettre ();
      }

      io.emit ('loadingencour', nombre);
      io.emit ('browserfermer', true);
    } else {
      console.log ('We’ve encountered an error: ' + error);
      io.emit ('browserfermer', true);
    }
  });

  return;
}
