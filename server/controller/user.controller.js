const connection= require("./../config/db.connection")

exports.getAllUser = (req, res) => {
    connection.query("SELECT * FROM Customer", (err, rows) => {
        if (err) {
          res.json({
            success: false,
            err,
          });
        } else {
          res.json({
            success: true,
            user:rows,
          });
        }
      });    
  };
  
exports.getUserById = (req, res) => {
    res.json({ message: `Get user with ID: ${req.params.id}` });
  };
  
exports.createUser = (req, res) => {
 const { name, email,mobile, password } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ error: 'Name, Email, password and mobile are required' });
  }

  const sql = 'INSERT INTO Customer (name, email,mobile,password) VALUES (?, ?,?,?)';
  connection.query(sql, [name, email,mobile, password], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'User Create successfully', adminId: result.insertId });
  })  };

  exports.loginUser = (req, res) => {
    const { email, password } = req.body;
   
     if ( !email || !password) {
       return res.status(400).json({ error: 'Email and password  are required' });
     }
   
     const sql = `select * from Customer where email= '${email}' and password = '${password}'`;
     connection.query(sql, (err, result) => {
       if (err) {
         console.error('Error inserting user:', err);
         return res.status(500).json({ error: 'Database error' });
       }
       res.status(201).json({success:true, message: 'User login successfully', adminId: result.insertId });
     })  };