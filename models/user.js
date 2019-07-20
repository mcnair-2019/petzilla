const mysql = require('mysql'); //for mysql queries
const db = require('./models/dbconfig.json'); //database information
const md5 = require('md5'); //password

/*This will take the action of what needs to be done to the database
Data will need to be a json file will fields being associated with the
collums in the users database*/
module.exports = function(action, data){        

    //Holds all the information needed to connect to the database
    var con = mysql.createConnection({

        host: db["host"],
        user: db["user"],
        password: db["password"],
        database: db["database"]

    });

    //Breaking up the variables from the data json
    var id = data['id'];
    var fname = data['fname'];
    var lname = data['lname'];
    var gender = data['gender'];
    var birdate = data['birthdate'];
    var profile_picture = data['profile_picture'];
    var uname = data['uname'];
    var pword = md5(data['pword']);
    var account_type = data['account_type']

    /*This will be used to select from the database
    and will return a json will all the collumns for a specific user
    */
    if(action == 'select'){

        con.connect(function(err){

            if(err){throw err;}
            con.query("SELECT * FROM McNair2019_Users WHERE uname=" + uname), function(err, result, fields){
                if(err) throw err;
                return result;
            }

        });

    }
    /*This will be used upon a new account registered*/
    else if(action == 'insert'){

        con.connect(function(err){

            if(err) throw err;
            var sql = `INSERT INTO McNair2019_Users (fname, lname, gender, birthdate, profile_picture, uname, pword, account_type) VALUES (${fname}, ${lname}, ${gender}, ${birthdate}, ${profile_picture}, ${uname}, ${pword}, ${account_type})`;
            con.query(sql, function(err, result){

                if(err) throw err;
                console.log(`${uname} has registered for an account!`)
                

            });

        });
        
    }else{

        console.log('No valid action specified');

    }

}
