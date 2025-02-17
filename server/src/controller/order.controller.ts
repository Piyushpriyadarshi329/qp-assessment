import connection  from "./../config/db.connection"
import  { Request,Response} from "express";

exports.getOrder = (req:Request, res:Response) => {
    const { userId } = req.body;
    connection.query(`SELECT 
    o.id AS orderId, 
    o.userId, 
    o.orderStatus, 
    i.qty, 
    i.productId,
    p.productName,
    p.price
FROM CustomerOrder o
JOIN CustomerSubOrder i ON o.id = i.orderId
JOIN Product p ON i.productId = p.id
where userId=${userId}
ORDER BY o.id;`, (err, rows) => {
        if (err) {
            res.json({
                success: false,
                err,
            });
        } else {
            res.json({
                success: true,
                order: rows,
            });
        }
    });
};

exports.getOrderById = (req:Request, res:Response) => {
    res.json({ message: `Get user with ID: ${req.params.id}` });
};

exports.createOrder = async (req:Request, res:Response) => {
    const { userId, products } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    try {
        // Insert order into CustomerOrder
        const sql1 = 'INSERT INTO CustomerOrder (userId, orderStatus) VALUES (?, ?)';
        const [orderResult] :any = await connection.promise().query(sql1, [userId, 'Pending']);
        const orderId = orderResult.insertId;

        // Insert products into CustomerSubOrder
        const sql2 = 'INSERT INTO CustomerSubOrder (orderId, productId, QTY) VALUES ?';
        const productValues = products.map((p) => [orderId, p.id, p.QTY]);
        products.map(async(p) => {
            const sql3=`UPDATE Product SET Stock = Stock - ${p.QTY} WHERE id = ${p.id};`
            await connection.promise().query(sql3);

        })

        await connection.promise().query(sql2, [productValues]);


        res.status(201).json({ message: 'Order created successfully', orderId, success: true });

    } catch (error) {
        // Rollback the transaction on error
        // connection.rollback(() => {
        //   console.error('Transaction Failed:', error);
        //   res.status(500).json({ error: 'Database error' });
        // });
        res.json({
            success: false,
            error,
        });
    }

};
