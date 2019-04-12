const express = require('express');
const app = express()
app.use(express.json());


const {
    Pool
} = require('pg')
var pool = new Pool({
    host: 'localhost',
    database: 'final'
})

const PORT = process.env.PORT || 3005
app.listen(PORT, console.log(`Server is in port ${PORT}👾`))

// ###################################### GET ######################################
app.get('/getall', async (req, res) => {
    const client = await pool.connect();
    var showAll = await client.query('SELECT * FROM apprentices, cohorts');
    client.release()
    res.json(showAll.rows);
});


app.get('/getallapprentices/', async (req, res) => {
    const client = await pool.connect();
    var showAllApprentices = await client.query('SELECT * FROM apprentices');
    client.release()
    res.json(showAllApprentices.rows);
});

app.get('/getallcohorts/', async (req, res) => {
    const client = await pool.connect();
    var showAllCohorts= await client.query('SELECT * FROM cohorts');
    client.release()
    res.json(showAllCohorts.rows);
});


app.get('/getallapprentices/:id', async (req, res) => {
    const client = await pool.connect();
    var findById = await client.query('SELECT * FROM apprentices WHERE apprentice_id=($1)', [
        req.params.id
    ]);
    res.json(findById.rows[0]);
    client.release();
});

app.get('/getallcohorts/:id', async (req, res) => {
    const client = await pool.connect();
    var findById = await client.query('SELECT * FROM cohorts WHERE cohort_id=($1)', [
        req.params.id
    ]);
    res.json(findById.rows[0]);
    client.release();
});

// ###################################### POST ######################################

app.post('/getallapprentices/', async (req, res) => {
    const client = await pool.connect();
    // console.log("⚠️");
    // console.log(req)
    client.query('INSERT INTO apprentices VALUES(default,($1), ($2), ($3), ($4)) RETURNING *',
    [req.body.id, req.body.first, req.body.last, req.body.cohort_id],
        function (err, result) {
            if (err) {
                res.status(500).send('sERver Unavailable💔')
                console.log("error - server is unavailble", err)
            }
            else {
                // console.log("⚜️")
                // console.log(result.rows[0]);
                res.status(201).json(result.rows[0]);
            }
        client.release();
    });
    // console.log(req.body)
    // res.json([req.body])
})

app.post('/getallcohorts/', async (req, res) => {
    const client = await pool.connect();
    // console.log("🚸");
    // console.log(req)
    client.query('INSERT INTO cohorts VALUES(default,($1), ($3), ($4)) RETURNING *',
    [req.body.cohort_id, req.body.city, req.body.startdate, req.body.enddate],
        function (err, result) {
            if (err) {
                res.status(500).send('sERver Unavailable💔')
                console.log("error - server is unavailble", err)
            }
            else {
                // console.log("🔱")
                // console.log(result.rows[0]);
                res.status(201).json(result.rows[0]);
            }
        client.release();
    });
})


// ###################################### PUT ######################################
app.put('/getallapprentices/:id', async (req, res) => {
    const client = await pool.connect();
    let result = await client.query('UPDATE apprentices SET first = ($1),last = ($2) cohort_id = ($3) WHERE apprentice_id = ($4) RETURNING *', [req.body.first, req.body.last, req.params.cohort_id, req.params.apprentice_id]);
    res.json(result.rows[0])
    client.release();
});

app.put('/getallcohorts/:id', async (req, res) => {
    const client = await pool.connect();
    let result = await client.query('UPDATE cohorts SET city = ($1),startdate = ($2), enddate = ($3) WHERE cohort_id = ($4) RETURNING *', [req.body.city, req.body.startdate, req.params.enddate, req.params.cohort_id]);
    res.json(result.rows[0])
    client.release();
});

// ###################################### DELETE ######################################
app.delete('/getallapprentices/:id', async (req, res) => {
    const client = await pool.connect();
    const delOne= await client.query('DELETE FROM apprentices WHERE apprentice_id=($1)', [req.params.id]);
    await client.release();
    res.json(delOne.rows);
});

app.delete('/getallcohorts/:id', async (req, res) => {
    const client = await pool.connect();
    const delOne= await client.query('DELETE FROM cohorts WHERE cohort_id=($1)', [req.params.id]);
    await client.release();
    res.json(delOne.rows);
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
      res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  }
