const connection= require("./../config/db.connection")

exports.getAllProduct = (req, res) => {
    connection.query("SELECT * FROM Product", (err, rows) => {
        if (err) {
          res.json({
            success: false,
            err,
          });
        } else {
          res.json({
            success: true,
            product:rows,
          });
        }
      });    
  };
  

  
exports.createProduct = (req, res) => {
 const { productName, price,stock } = req.body;
  if (!productName || !price || !stock ) {
    return res.status(400).json({ error: 'productName, price and stock are required' });
  }

  const sql = 'INSERT INTO Product (productName, price,stock) VALUES (?, ?,?)';
  connection.query(sql, [productName, price,stock, ], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
  })  };


  exports.updateProduct = (req, res) => {

    const { productId, productName,price, stock } = req.body;
   
     if (!productId || !price || !stock || !productName) {
       return res.status(400).json({ error: 'productId, productName, price and stock are required' });
     }

     const sql = `update Product set productName = '${productName}', price =${price}, stock=${stock} where id=${productId};`
     console.log("sql",sql)
     connection.query(sql, (err, result) => {
       if (err) {
         console.error('Error inserting user:', err);
         return res.status(500).json({ error: 'Database error' });
       }
       res.status(201).json({ message: 'Product update successfully', productId: result.insertId });
     })  };