
const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

const port = process.env.PORT || 3000;

// .env config
dotenv.config();

// Cross-origin resource sharing (CORS) config
app.use(cors({ optionsSuccessStatus: 200 }));

// add static assets 
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date", (req, res) => {
    try {
        const date = new Date(Number(req.params.date) ? Number(req.params.date) : req.params.date);
        if (date != "Invalid Date")
            res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
        else
            res.send({ error: "Invalid Date" })
    }
    catch (error) {
        res.send({ error: "Invalid Date" })
    }
})


app.listen(port, () => {
    console.log(`app listening on port : ${port}`);
});












