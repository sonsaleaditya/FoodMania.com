//let webjs=require('./public/javascripts/index')
const express=require('express')
const con = require('./connection1');
// function searchRecipes() {
//     let mysql = require('mysql');
//     const con = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'recipes'
//     });

//     let ibt = document.querySelector(".ibt");
//     //let itext = ibt.value;
//     let itext= 'Hariyali Egg Curry Recipe In Coriander and Mint Gravy';

//     ibt.value = "";
//     console.log(itext);

//     let tablename = 'eggetarian';
//     con.connect((error) => {
//         if (error) throw error;
//         console.log("connected");
//         con.query(`SELECT TranslatedInstructions FROM ${tablename} where RecipeName = '${webjs.inputtext}'`, (error, result) => {
//             if (error) throw error;
//             console.log(result);
//         });
//     });
// }
//console.log(webjs.inputtext)



let mysql = require('mysql');

let database_connection_status='';

let itext= 'Hariyali Egg Curry Recipe In Coriander and Mint Gravy';

    let tablename = 'eggetarian';

    con.connect((error) => {
        if (error) throw error;
        console.log("connected");
        con.query(`SELECT TranslatedInstructions FROM ${tablename} where RecipeName = '${itext}'`, (error, result) => {
            if (error) throw error;

            console.log(result);
        });
    });
