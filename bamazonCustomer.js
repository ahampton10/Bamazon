var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "uaaAMH10",
    database: "bamazon_db"
});

connection.connect(function (err) {
	if (err) throw err;
	console.log ("You're Connected!"); 
});

function productList() {
    var querySQL = "SELECT * FROM products";

    connection.query(querySQL, function (err, resp){
        if (err) throw err;
		console.log("Please make a selection from the below inventory:");

        var newTable = new table({
            head: ["Item ID", "Product", "Department", "Price per Unit", "Quantity in Stock"],
        });
        for (var i = 0; i < resp.length; i++) {
            newTable.push([resp[i].item_id, resp[i].product_name, resp[i].department_name, resp[i].price, resp[i].stock_quantity]);
        }
        console.log(newTable.toString());
       purchaseDetails();
    });
}

function purchaseDetails() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Please enter the ID # of the item you would like to purchase: ",
        },
        {
            name: "Quantity",
            type: "input",
            message: "Please enter the quantity you would like to purchase:",
        }
    ]).then(function(answers) {
        var quantity = answers.Quantity;
        var idResponse = answers.ID;
        purchaseOrder(quantity, idResponse);
    });
}

function purchaseOrder(ID, quantitySelected) {
    connection.query("SELECT * FROM products WHERE item_id = " + ID, function(err,resp) {
        if(err) throw err;
        if(quantitySelected <= resp[0].stock_quantity) {
            var orderTotal = resp[0].price * quantitySelected;
            console.log("Your order total will be " + orderTotal + "." + "" + "Thank you for shopping!");

            var updateQuantity = resp[0].stock_quantity - quantitySelected;
            connection.query("UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: updateQuantity
                },
                {
                    item_id: quantitySelected
                }
            ]);
        } else {
			console.log("Insufficient Quantity!"); 
			connection.end(); 
		}
    });
}

productList();