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
    var findById = await client.query('SELECT * FROM example WHERE id=($1)', [
        req.params.id
    ]);
    res.json(findById.rows[0]);
    client.release();
});

// ###################################### POST ######################################

app.post('/getall/', async (req, res) => {
    const client = await pool.connect();
    // console.log("hey hey laaaaaaaa");
    // console.log(req)
    client.query('INSERT INTO example VALUES(default,($1), ($2)) RETURNING *',
    [req.body.name, req.body.grade],
        function (err, result) {
            if (err) {
                res.status(500).send('sERver Unavailable💔')
                console.log("error - server is unavailble", err)
            }
            else {
                // console.log("you did it you did it")
                // console.log(result.rows[0]);
                res.status(201).json(result.rows[0]);
            }
        client.release();
    });
    // console.log(req.body)
    // res.json([req.body])
})


// ###################################### PUT ######################################
app.put('/getall/:id', async (req, res) => {
    const client = await pool.connect();
    // var updateInfo = client.query(function (infoFunc) {
    //     return req.params.id == infoFunc.id;
    // });

    // updateInfo.name = req.params.name;
    // updateInfo.grade = req.params.city;
    // res.json(oldInfo);

    // var found = await client.query('SELECT * FROM example WHERE id=($1)', [
    //     req.params.id
    // ]);
    let result = await client.query('UPDATE example SET name = ($1),grade = ($2) WHERE id = ($3) RETURNING *', [req.body.name, req.body.grade, req.params.id]);
    res.json(result.rows[0])
    client.release();
});

// ###################################### DELETE ######################################
app.delete('/getall/:id', async (req, res) => {
    const client = await pool.connect();
    const delOne= await client.query('DELETE FROM example WHERE id=($1)', [req.params.id]);
    await client.release();
    res.json(delOne.rows);
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
      res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  }
