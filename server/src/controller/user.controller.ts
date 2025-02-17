import connection from "./../config/db.connection"
import  { Request,Response} from "express";

exports.getAllUser = (req:Request, res:Response) => {
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
  
exports.getUserById = (req:Request, res:Response) => {
    res.json({ message: `Get user with ID: ${req.params.id}` });
  };
  
exports.createUser = (req:Request, res:Response) => {
 const { name, email,mobile, password } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ error: 'Name, Email, password and mobile are required' });
  }

  const sql = 'INSERT INTO Customer (name, email,mobile,password) VALUES (?, ?,?,?)';
  connection.query(sql, [name, email,mobile, password], (err, result:any) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'User Create successfully', adminId: result.insertId });
  })  };

  exports.loginUser = (req:Request, res:Response) => {
    const { email, password } = req.body;
   
     if ( !email || !password) {
       return res.status(400).json({ error: 'Email and password  are required' });
     }
   
     const sql = `select * from Customer where email= '${email}' and password = '${password}'`;
     connection.query(sql, (err, result:any) => {
       if (err) {
         console.error('Error inserting user:', err);
         return res.status(500).json({ error: 'Database error' });
       }
       res.status(201).json({success:true, message: 'User login successfully', adminId: result.insertId });
     })  };