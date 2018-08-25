var mysql = require("mysql");
var inquirer =  require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3308,
  user: "root",
  password: "Carrie78",
  database: "bamazon_DB"
});
connection.connect(function(error){
    if (error) throw error;
    //console.log("connected as id " + connection.threadId + "\n");
    prompt();
});

function prompt(){
    inquirer.prompt([
        {
            name: "list",
            type: "list",
            choices:["View products for sale.","View low inventory.","Add to inventory.","Add new"+     " product."]
        }
    ])
    .then(function(answers){
        var a = answers.list;
        if (a === "View products for sale."){
            display();
        } else if (a === "View low inventory."){
            viewLow();
        } else if (a === "Add to inventory."){
            addInv(); 
        } else if (a === "Add new product."){
            addNewItem();
        };
    });
};

function display(){
    connection.query("SELECT * FROM products", function(error, data){
        if (error) throw error;
        for (var i = 0; i < data.length; i++){
            console.log(JSON.stringify(data[i]),"\n");
        };   
    });
};

function viewLow(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 5",function(error, data){
        for (var i = 0; i < data.length; i++){
            console.log(JSON.stringify(data[i]),"\n");
        };
    });
};

function addInv(){
    inquirer.prompt([
        {
            name: "stockUp",
            type: "input",
            message: "Select Item ID to add quantity: "
        }
    ])
    .then(function(answer){
        connection.query("SELECT * FROM products WHERE item_id = ?",[answer.stockUp],
            function(error,data){
                if (error) throw error;
                console.log(data);
                inquirer.prompt([
                    {
                        name: "howMuch",
                        type: "input",
                        message: "How many do you want to add: "
                    }
                ])
                .then(function(answer){
                    var newQuant = data[0].stock_quantity + parseInt(answer.howMuch);
                    console.log("This is the new quantity: ",newQuant);
                    
                    connection.query("UPDATE PRODUCTS SET STOCK_QUANTITY = ?",[newQuant]);
                    display();
                    connection.end();
                })
            });
        
    });
};

function addNewItem(){
    inquirer.prompt([
        {
            name: "newName",
            type: "input",
            message: "Enter product: "
        },
        {
            name: "newDepartment",
            type: "input",
            message: "Enter department: "
        },
        {
            name: "newPrice",
            type: "input",
            message: "Enter the price: "
        },
        {
            name: "newQuantity",
            type: "input",
            message: "Enter the quantity: "
        }
    ])
    .then(function(answer){
        connection.query("INSERT INTO products SET ?",
            {
                product_name: answer.newName,
                department_name: answer.newDepartment,
                price: answer.newPrice,
                stock_quantity: answer.newQuantity
            },
            function(err, res) {
                display();
                connection.end();
            }
        );  
    });
};