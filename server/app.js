const express = require('express');
const app = express()
app.use(express.json());


const {
    Pool
} = require('pg')
var pool = new Pool({
    host: 'localhost',
    database: 'final_assessment'
})

const PORT = process.env.PORT || 3005
app.listen(PORT, console.log(`Server is deadass in port ${PORT}👾`))

// ###################################### GET ######################################
app.get('/', async (req, res) => {
    res.send("Hey Kelly Girl. You made an API")
});


app.get('/getall/', async (req, res) => {
    const client = await pool.connect();
    var example = await client.query('SELECT * FROM example');
    client.release()
    res.json(example.rows);
});


app.get('/getall/:id', async (req, res) => {
    const client = await pool.connect();
    var findById = await client.query('SELECT * FROM example WHERE id=$1', [
        req.params.id
    ]);
    res.json(findById.rows[0]);
    client.release();
});

// ###################################### POST ######################################

app.post('/getall', async (req, res) => {
    const client = await pool.connect();
    console.log("hey", req, "hey hey");
    await client.query('INSERT INTO example(name,grade) VALUES($1, $2, ) RETURNING *', [req.body.name, req.body.grade]);

    await client.release();
    res.json([req.body])
})


// // ###################################### PUT ######################################
// app.put('/getall/:id', async (req, res) => {
//     // res.send("Put TEST from /example/")
//     const client = await pool.connect();
//     var oldEvent = client.query(function (eventsFunc) {
//         return req.params.id == eventsFunc.id;
//     });

//     oldExample.name = req.params.name;
//     oldExample.grade = req.params.city;
//     res.json(oldEvent);

//     var found = await client.query('SELECT * FROM example WHERE id=$1', [
//         req.params.id
//     ]);
//     await client.query('UPDATE example SET name = ($1),city = ($2),state = ($3),description = ($4) WHERE id = ($5)', [req.body.name, req.body.grade]);


// });

// // ###################################### DELETE ######################################
// app.delete('/getall/:id', async (req, res) => {
//     const client = await pool.connect();
//     const delOne= await client.query('DELETE FROM example WHERE id=($1)', [req.params.id]);
//     await client.release();
//     res.json(delOne.rows);
// });

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../client/build")));
//       res.sendFile(path.join(__dirname, "../client/build", "index.html"));
//     });
//   }
