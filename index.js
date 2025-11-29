import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { list: null, selected: null });
});

app.post("/list", async (req, res) => {
    const recipe = req.body.recipe;
    const meal = req.body.meal;

    try {
        const listResult = await axios.get(API_URL, { 
            params: { f: recipe }
        });
        let list = listResult.data;

        let selected = null;

        if (meal) {
            const selectedResult = await axios.get(API_URL, {
                params: { s: meal }
            });
            selected = selectedResult.data;
        }

        res.render("index.ejs", { 
            list: list,
            selected: selected
        });
    } catch (error) {
        console.error("Error message:", error.message);
        res.render("index.ejs", { list: null, selected: null });
    };
});

app.get("/reset", (req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening at port ${port}.`);
});

