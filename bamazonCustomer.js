var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Riossss1",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  inventory();
  
});

function itemSelection (product_name, department_name, price, stock_quantity) {
    this.product_name = product_name,
    this.department_name = department_name,
    this.price = price,
    this.stock_quantity = stock_quantity
    
};

function inventory() {
    connection.query('SELECT * FROM bamazon_db.products',
      function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " || Name: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Quantity Remaining: " + res[i].stock_quantity);

        }     
        
      }
    )
  }

  purchase();

  
function purchase() {
inquirer.prompt([
    {
      name: "id",
      message: "What product would you like to see? (id #)"
    }, {
      name: "quantity",
      message: "How many units would you like to purchase?"
    }
  ]).then(function(answers) {
    // var item = new itemSelection(answers.id, answers.product_name, answers.department_name, answers.price, answers.stock_quantity);
    var item = answers.id;
    var quantity = answers.quantity
    var query = 'SELECT * FROM bamazon_db.products WHERE ?';

    console.log(quantity);
    

    connection.query(query, {id: item}, function(err,res){
        if (err) throw err;

        // console.log(res[0].stock_quantity);


        if (item < 1 || item > 10) {
            console.log("INVALID ID.  Please select a valid item id");
            inventory();
            purchase();
        }
        else {
            
            // console.log(productInfo);
            
            if(quantity > res[0].stock_quantity ) {
                console.log("Sorry!  Look's like we'd be out of stock before then!")
            inventory();
            purchase();
            } 
            
            else {
                console.log("Placing Order Now");
                var updateQuery = "Update bamazon_db.products SET stock_quantity = " + (res[0].stock_quantity - quantity) + " WHERE ?";
                
                connection.query(updateQuery, {id: item}, function (err,data) {
                    if (err) throw err;

                    console.log("Your Order Has Been Placed!");
                    console.log("Your total is $" + res[0].price * quantity);
                    console.log("If you'd like to place another order, please input 'node bamazonCustomer.js' into your command line");
                })


            }

            
        }









        // if(answers.quantity > itemSelection.stock_quantity) {
        //     console.log("Insufficient Quantity!");
    
       
        
    
    })
    
    
})
};

































  