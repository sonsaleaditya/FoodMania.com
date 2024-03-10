// Require necessary modules
const port = 4000;
const con = require('./connection1');
const express = require('express');
const bodyParser = require('body-parser'); // Require body-parser
const app = express();
// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));
// Establish MySQL connection
con.connect((error) => {
    if (error) throw error;

    // Define route for homepage
    app.get('/', (req, res) => {
        res.render('login.ejs');
    });
    app.get('/tips', (req, res) => {
        res.render('tips.ejs');
    })
    app.get('/admin', (req, res) => {
        res.render('admin.ejs');
    })
    app.get('/aboutus', (req, res) => {
        res.render('aboutus.ejs');
    })
    app.get('/contact', (req, res) => {
        res.render('contact.ejs');
    });
    app.get('/feedback', (req, res) => {
        res.render('feedback.ejs');
    });
    app.get('/contribute', (req, res) => {
        res.render('contribute.ejs');
    });



    app.get('/index', (req, res) => {
        res.render('index.ejs');
    });

    // Dynamic search route based on category
    app.get('/search/:category', (req, res) => {
        const category = req.params.category.toLowerCase();

        let tableName = "";
        switch (category) {
            case 'veg':
                tableName = "veg"; // Assuming table name for veg recipes is "veg"
                break;
            case 'egg':
                tableName = "eggetarian"; // Assuming table name for egg recipes is "eggetarian"
                break;
            case 'nonveg':
            default:
                tableName = "nonvegetarian"; // Default to nonveg if category not specified or unknown
                break;
        }

        const name = req.query.srch;
        const sql = `SELECT RecipeName, Ingredients, PrepTimeInMins, CookTimeInMins, TotalTimeInMins, Servings, Instructions FROM ${tableName} WHERE RecipeName LIKE '%${name}%'`;

        con.query(sql, (error, result) => {
            if (error) throw error;
            res.render(`${category}.ejs`, { [category]: result.rows });
        });
    });

    app.get('/nonveg', (req, res) => {
        const q = "SELECT RecipeName, Ingredients, PrepTimeInMins, CookTimeInMins, TotalTimeInMins, Servings, Instructions FROM nonvegetarian";
        con.query(q, (error, result) => {
            if (error) throw error;
            res.render('nonveg.ejs', { nonveg: result.rows });
        });
    });



    app.get('/egg', (req, res) => {
        const q = "SELECT RecipeName, Ingredients, PrepTimeInMins, CookTimeInMins, TotalTimeInMins, Servings, Instructions FROM eggetarian";
        con.query(q, (error, result) => {
            if (error) throw error;
            res.render('egg.ejs', { egg: result.rows });
        });
    });

    app.get('/veg', (req, res) => {
        const q = "SELECT RecipeName, Ingredients, PrepTimeInMins, CookTimeInMins, TotalTimeInMins, Servings, Instructions FROM veg";
        con.query(q, (error, results) => {
            if (error) {
                console.error("Error fetching veg recipes:", error);
                return res.status(500).send("Internal Server Error");
            }
            
            // Check if any recipes were found
            if (results.length === 0) {
                return res.render('veg.ejs', { veg: [] }); // Render with an empty array
            }
            console.log(results.rows[0].recipename)
            // Render the template with the retrieved recipes
            res.render('veg.ejs', { veg : results.rows });
        });
    });
    


    // start of special search 

    app.get('/specialsearch', (req, res) => {
        res.render('specialsearch.ejs', { results: null }); // Render the specialsearch.ejs initially with null results
        //   console.log("hii")
    });
    app.get('/specialsearch/:category', (req, res) => {
        const category = req.params.category.toLowerCase();

        const ingredients = req.query.ingredients; //

        //   console.log(ingredients)
        let tableName = "";
        switch (category) {
            case 'veg':
                tableName = "veg"; // Assuming table name for veg recipes is "veg"
                break;
            case 'egg':
                tableName = "eggetarian"; // Assuming table name for egg recipes is "eggetarian"
                break;
            case 'nonveg':
            default:
                tableName = "nonvegetarian"; // Default to nonveg if category not specified or unknown
                break;
        }

        // Creating SQL condition for each ingredient
        const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());
        const conditionArray = ingredientsArray.map(ingredient => `Ingredients LIKE '%${ingredient}%'`);
        const conditions = conditionArray.join(' OR ');

        const sql = `SELECT RecipeName, Ingredients, PrepTimeInMins, CookTimeInMins, TotalTimeInMins, Servings, Instructions FROM ${tableName} WHERE ${conditions}`;

        con.query(sql, (error, result) => {
            if (error) throw error;
            res.render('specialsearch.ejs', { results: result });
        });
    });


    app.get('/success', (req, res) => {
        res.render('success.ejs');
    })
    // end of special search

    app.get('/reg', (req, res) => {
        res.render('register.ejs');
    });

    app.post('/reg', (req, res) => {
        const q = "insert into users (name, username, mail, mob, password, gender) values($1,$2,$3,$4,$5,$6)";
        const { fullName, username, email, phonenumber, password, gender } = req.body;
          const values =  [fullName, username, email, phonenumber, password, gender];
          console.log(values);
        con.query(q,values,(err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error registering user');
                } else {
                    console.log('User registered successfully');
                    res.redirect('/'); // Redirect to a success page or any other route
                }
            }
        );

    });

    app.post('/login', (req, res) => {
        const { email, password } = req.body;

        // Query the database for the user with the provided email and password
        con.query(
            "SELECT mail, password FROM users WHERE mail = $1 AND password = $2",
            [email, password],
            (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error while logging in');
                } else {
                    // Check if the result has any rows
                    if (result.length === 0) {
                        // No matching user found
                        res.send('Invalid username or password');
                    } else {
                        // Valid user, redirect to index.html
                        res.redirect('/index');
                    }
                }
            }
        );
    });




    app.post('/contribute', (req, res) => {
        const {
            fullName,
            email,
            Receipename,
            Ingredients,
            PrepTime,
            CookTime,
            TotalTime,
            Servings,
            Instructions
        } = req.body;

        // SQL INSERT query
        const sql = `
        INSERT INTO contributed_recipes (name, mail, recipe_name, ingredients, prep_time, cook_time, total_time, servings, instructions)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        con.query(
            sql, [fullName, email, Receipename, Ingredients, PrepTime, CookTime, TotalTime, Servings, Instructions],
            (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error inserting data into the database');
                } else {
                    console.log('Data inserted successfully');
                    res.redirect('/success'); // Redirect to a success page or any other route
                }
            }
        );
    });


    app.post('/submit_contact', (req, res) => {
        const { name, email, message } = req.body;

        // Insert data into contact_us table
        const sql = 'INSERT INTO contact_us (name, mail, message) VALUES (?, ?, ?)';
        con.query(sql, [name, email, message], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                res.status(500).send('Error submitting form');
            } else {
                console.log('Data inserted successfully');
                res.redirect('/success');
            }
        });
    });

    app.get('/admin', (req, res) => {
        res.render('admin.ejs');
    })


    app.get('/adminsign', (req, res) => {
        res.render('adminsign.ejs');
    })

    app.post('/adminsign', (req, res) => {
        const { email, password } = req.body;

        // Check admin credentials in the database
        const query = `SELECT * FROM admin WHERE mail = ? AND password = ?`;
        con.query(query, [email, password], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send('Server error');
                return;
            }

            if (results.length > 0) {
                // Admin authentication successful
                // res.status(200).send('Admin login successful');
                res.redirect('/admin_page');
            } else {
                // Admin authentication failed
                res.status(401).send('Invalid credentials');
            }
        });
    });


    app.get('/users', (req, res) => {
        con.query('SELECT name, username, mail, mob, password, gender FROM users', (error, results) => {
            if (error) throw error;
            res.render('users.ejs', { users: results }); // Pass the fetched data to the EJS template
        });
    });

    // Update the /delete route to insert data into deleted_users before deleting from users
    app.post('/delete', (req, res) => {
        const username = req.body.username;

        // Retrieve the user entry to be deleted
        const selectQuery = 'SELECT * FROM users WHERE username = ?';

        con.query(selectQuery, [username], (error, results) => {
            if (error) {
                console.error('Error retrieving user for deletion:', error.sqlMessage);
                res.status(500).send('Error retrieving user for deletion');
                return;
            }

            if (results.length === 0) {
                console.error('User not found for deletion:', username);
                res.status(404).send('User not found for deletion');
                return;
            }

            const userToDelete = results[0];

            // Insert the user entry into deleted_users table
            const insertQuery = 'INSERT INTO deleted_users (name, username, mail, mob, password, gender) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [userToDelete.name, userToDelete.username, userToDelete.mail, userToDelete.mob, userToDelete.password, userToDelete.gender];

            con.query(insertQuery, values, (error, results) => {
                if (error) {
                    console.error('Error inserting into deleted_users:', error.sqlMessage);
                    res.status(500).send('Error inserting into deleted_users');
                    return;
                }

                // Delete the user entry from users table
                const deleteQuery = 'DELETE FROM users WHERE username = ?';

                con.query(deleteQuery, [username], (error, results) => {
                    if (error) {
                        console.error('Error deleting user:', error.sqlMessage);
                        res.status(500).send('Error deleting user');
                        return;
                    }


                    res.redirect('/users')
                });
            });
        });
    });

    // Express route to handle the Undo action
    // Express route to handle the Undo action
    // Assuming you have an Express app initialized as 'app' and a MySQL connection as 'con'

    // Handle the Undo action
    app.post('/undo', (req, res) => {
        // Retrieve the deleted user data from the deleted_users table
        const selectQuery = 'SELECT * FROM deleted_users ORDER BY id DESC LIMIT 1'; // Assuming the latest deleted user should be restored

        con.query(selectQuery, (error, results) => {
            if (error) {
                console.error('Error retrieving deleted user:', error.sqlMessage);
                res.status(500).send('Error retrieving deleted user');
                return;
            }

            if (results.length === 0) {
                console.error('No deleted user found');
                res.status(404).send('No deleted user found');
                return;
            }

            const deletedUser = results[0];

            // Insert the deleted user data back into the users table
            const insertQuery = 'INSERT INTO users (name, username, mail, mob, password, gender) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [deletedUser.name, deletedUser.username, deletedUser.mail, deletedUser.mob, deletedUser.password, deletedUser.gender];

            con.query(insertQuery, values, (error, results) => {
                if (error) {
                    console.error('Error restoring deleted user:', error.sqlMessage);
                    res.status(500).send('Error restoring deleted user');
                    return;
                }

                // Delete the restored user data from the deleted_users table
                const deleteQuery = 'DELETE FROM deleted_users WHERE id = ?';
                const deletedUserId = deletedUser.id;

                con.query(deleteQuery, [deletedUserId], (error, results) => {
                    if (error) {
                        console.error('Error deleting entry from deleted_users:', error.sqlMessage);
                        res.status(500).send('Error deleting entry from deleted_users');
                        return;
                    }

                    res.redirect('/users');
                });
            });
        });
    });


    // Route to render contributed_recipes.ejs with data fetched directly from the database
    app.get('/contributed-recipes', (req, res) => {
        const query = 'SELECT * FROM contributed_recipes'; // Replace with your table name

        // Execute the SQL query to fetch data from your database
        con.query(query, (error, contributedRecipes) => {
            if (error) {
                console.error('Error fetching contributed recipes:', error);
                res.status(500).send('Error fetching contributed recipes');
                return;
            }

            res.render('contributed_recipes.ejs', { contributedRecipes });
        });
    });



    app.post('/delete-recipe', (req, res) => {
        const recipeName = req.body.recipeName; // Match the input name attribute

        const deleteQuery = 'DELETE FROM contributed_recipes WHERE recipe_name = ?';

        con.query(deleteQuery, [recipeName], (error, results) => {
            if (error) {
                console.error('Error deleting recipe:', error);
                res.status(500).send('Error deleting recipe');
                return;
            }

            if (results.affectedRows > 0) {
                console.log('Recipe deleted successfully');
                res.redirect('/contributed-recipes');
            } else {
                console.log('Recipe not found or not deleted');
                res.status(404).send('Recipe not found or not deleted');
            }
        });
    });




app.get('/admin_page',(req,res)=>{
    res.render('admin_page.ejs');
})


    // Start the server once the connection is established
    app.listen(port,()=>{
        console.log(`server is listening to port ${port}`)
    });
});
