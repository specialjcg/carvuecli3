//pour installer les packages familiarise toi avec npm install:https://www.npmjs.com--->c'est un incotournable


//connexion à la base de donnée qu'il faudra créer au préalable avec apache/mysql/phpmyadmin-->google pour installation et création de ta première table
const mysql = require("mysql");
const con = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "phpmyadmin",
  password: "septembre2018",
  database: "citation"
});


//Request est conçu pour être le moyen le plus simple possible de passer des appels http. Il prend en charge HTTPS et suit les redirections par défaut.
//https://www.npmjs.com/package/request
//iconv-lite est une api permettant une conversion des charactère encoder en html
//https://www.npmjs.com/package/iconv-lite
var request = require("request"),
  iconv = require("iconv-lite");
// cheerio Fast, flexible & lean implementation of core jQuery designed specifically for the server.
var cheerio = require("cheerio");
//express :Fast, unopinionated, minimalist web framework for node.
var app = require("express")();

process.setMaxListeners(1000);
//je crée mon serveur d'application
let server = require("http").Server(app);
//je vérifie ma connextion a ma base de donnée
con.connect(err => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});
//je dis a mon server d'écouter le port 3000
server.listen(3000);
//de 1 a 9 je lance mon application scrape2 (une fonction) qui passe en parametre l'adresse du site a scraper et sa page de 1 ..à 9
for (let j = 1; j < 9; j++) {
  scrape2("http://www.1001-citations.com/mots/bonheur/?page/" + j+"/");
}

//ma fonction de scrapage
function scrape2(url) {
  //j'envoie ma requete au site il me renvoie une fonction avec 3 paramettre (error,response,body)
  request({ url, encoding: null }, function(error, response, body) {
    var text = [];
    var author = [];
    //s'il n'y a pas d'erreur
    if (!error) {
   //   j'encode le body du site dans une variable
      var bodyWithCorrectEncoding = iconv.decode(body, "utf-8");
//l'api cherrio l'interprete pour la décomposer avec les balises
      var $ = cheerio.load(bodyWithCorrectEncoding);
//pour info comment repérer les bailse dans un site:
//avec python (un autre moyen que celui que je te décris:https://zestedesavoir.com/billets/2057/scraper-des-donnees-sur-une-page-web-en-python-avec-beautifulsoup-1/)
//sinon:https://developer.mozilla.org/fr/docs/Apprendre/Découvrir_outils_développement_navigateurs
//pour chaque balise h2.title je créer un tableau de citations
      $("h2.title").each(function(i, e) {
        var text1 = $(this).text();

        text.push(text1.replace(/[\n\r\s\t]+/g, " "));
      });
      //idem pour les auteurs je créer un tableau des auteurs pour chaque balise span.author


      $("span.author").each(function(i, e) {
        var text1 = $(this).text();

        author.push(text1.replace(/[\n\r\s\t]+/g, " "));
      });

      var value = [];
      //dispose citation et auteur dans value un tableau de tableau
      if (text.length !== 0) {
        for (let i = 0; i < text.length; i++) {
          value.push([text[i], author[i]]);
        }
        //ma requete pour insérer ce tableau
        var sql = "INSERT INTO mes_citations (title, author) VALUES ?";
        //je vérifie encore ma connection
        con.connect(err => {
          if (err) {
            console.log("Error connecting to Db");
            return;
          }
          console.log("Connection established");
        });
//j'exécute ma requete sql en passant mes données
        con.query(sql, [value], (err, res) => {
          //si pas d'erreur cela enregistre en base de données
          if (err) throw err;
          console.log("1 record inserted");
          //deconnexion quand requete executer
          con.end(err => {
            // The connection is terminated gracefully
            // Ensures all previously enqueued queries are still
            // before sending a COM_QUIT packet to the MySQL server.
          });
        });
      }
    } else {
      console.log("We’ve encountered an error: " + error);
    }
  });
//fin de fonction
  return;
}
