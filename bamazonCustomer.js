var mysql = require("mysql");
var inquirer =  require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3308,
    user: "root",
    password: "Carrie78",
    database: "bamazon_db"
});

display();

function display() {
    connection.query("SELECT * FROM products", function(err, data) {
        if (err) throw err;
        for (var i = 0; i < data.length; i++){
          console.log(JSON.stringify(data[i]),"\n");
        };
        prompt(data);
        //connection.end();
    });
};

function prompt (data) {
    inquirer.prompt([
        {
            name: 'id',
            type:'input',
            message:'Enter the ID of the item you wish to purchase: '
        },
        {
            name: 'quant',
            type: 'input',
            message: 'Enter the quantity: '
        }
    ])
    .then(function(answer){
        var purchId = parseInt(answer.id);
        var purchQuant = parseInt(answer.quant);
        var totalCost = 0;
        data.forEach(function(item){
            var price = parseInt(item.price);
            if(parseInt(item.item_id) === purchId){
                if(purchQuant > item.stock_quantity){
                    console.log("There is only ",item.stock_quantity," in stock.");
                } else {
                    connection.query("UPDATE PRODUCTS SET STOCK_QUANTITY = STOCK_QUANTITY - ? WHERE ITEM_ID = ?",
                        [purchQuant,purchId]);
                    totalCost = price*purchQuant;
                    console.log("Purchase quantity: ",purchQuant);
                    console.log("Total cost: ",totalCost);
                };
            };
        });
    display();
    });
};

//prompt();

// The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.