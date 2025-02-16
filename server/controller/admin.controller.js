const connection= require("./../config/db.connection")

exports.getAllAdmin = (req, res) => {
    connection.query("SELECT * FROM GroceryAdmin", (err, rows) => {
        if (err) {
          res.json({
            success: false,
            err,
          });
        } else {
          res.json({
            success: true,
            admin:rows,
          });
        }
      });    
  };
  
exports.getAdminById = (req, res) => {
    res.json({ message: `Get user with ID: ${req.params.id}` });
  };
  
exports.createAdmin = (req, res) => {
 const { name, email,mobile, password } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ error: 'Name, Email, password and mobile are required' });
  }

  const sql = 'INSERT INTO GroceryAdmin (name, email,mobile,password) VALUES (?, ?,?,?)';
  connection.query(sql, [name, email,mobile, password], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Admin added successfully', adminId: result.insertId });
  })  };


exports.loginAdmin = (req, res) => {
    const { email, password } = req.body;
   
     if ( !email || !password) {
       return res.status(400).json({ error: 'Email and password  are required' });
     }
   
     const sql = `select * from GroceryAdmin where email= '${email}' and password = '${password}'`;
     const sql2 = `select * from Customer where email= '${email}' and password = '${password}'`;

     connection.query(sql, async(err, result) => {
       if (err) {
         console.error('Error inserting user:', err);
         return res.status(500).json({ error: 'Database error' });
       }else{

        if(result?.length===0){

      let resultUser=  await connection.promise().query(sql2);
      console.log("resultUser",resultUser[0])
      if(resultUser[0].length){
        res.status(201).json({success:true, message: 'User login successfully', user:{...result[0],isAdmin:false} });

      }else{
        res.status(500).json({ success: false, message:"no user Found" });
      }

        }else{
            res.status(201).json({success:true, message: 'Admin login successfully', user:{...result[0],isAdmin:true} });

        }


       }
     })  };