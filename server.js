const express = require("express")
const mongoose = require("mongoose");
const Expert = require("./models/Expert.js");
const app = express();


app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/apiDB", { useNewUrlParser: true })


app.route('/expert')
    .get((req, res) => {
        Expert.find((err, expertList) => {
            if (err) { res.send(err) }
            else { res.send(expertList) }
        })
    })
    .post((req, res) => {
        const expert = new Expert({
            expert_name: req.body.name
        })
        expert.save((err) => {
            if (err) { res.send(err) }
            else res.send('Successfully added a new expert!')
        }
        )
    })
    .delete((req, res) => {
        Expert.deleteMany((err) => {
            if (err) { res.send(err) }
            else { res.send('Successfully deleted all experts!') }
        })
    })

app.route('/expert/:ename')
    .get((req, res) => {
        Expert.findOne({ expert_name: req.params.ename }, (err, foundExpert) => {
            if (foundExpert) (res.send(foundExpert))
            else res.send("No Matched Expert Found!")
        })
    })
    .put((req, res) => {
        Expert.update(
            { expert_name: req.params.ename },
            { expert_name: req.body.ename },
            { overwrite: true },
            (err) => {
                if (err) { res.send(err) }
                else { res.send('Successfully updated!') }
            }
        )
    })
    .patch((req, res) => {
        Expert.update(
            { task_name: req.params.ename },
            { $set: req.body },
            (err) => {
                if (!err) { res.send('Successfully updated! ') }
                else res.send(err)
            }
        )
    })

app.listen(process.env.PORT || 8000, () => {
    console.log('Server started on port 8000');
})