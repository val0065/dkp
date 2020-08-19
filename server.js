const express = require('express');
const mongoose = require('mongoose');
const bodyParserInit = require('./middlewares');
const path = require('path');

const fs = require('fs');
const fastcsv = require('fast-csv');
const xml2js = require('xml2js');

const players = require('./routes/api/players');
const Player = require('./models/Player');
const { collection } = require('./models/Player');

const app = express();

//Bodyparser Middleware
bodyParserInit(app);

// DB Config
const db = require('./config/keys').mongoURI;
const file = {};
// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/players', players);

app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    const file = req.files.file;
    console.log('### xmlFile - ', file.name);
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        fs.readFile(`${__dirname}/client/public/uploads/${file.name}`, (err, data) =>{
            var parser = new xml2js.Parser();
            Player.collection.deleteMany({});
            parser.parseString(data, (err,res) => {
                for(var element in res) {
                    var players = res[element].PLAYER;
                    for(var player in players) {
                        var playerToSave = new Player({
                            name: players[player].$.playername,
                            classType: players[player].$.class,
                            net: players[player].$.net,
                            total: players[player].$.total,
                            spent: players[player].$.spent
                        });
                        console.log(playerToSave);
                        playerToSave.save();
                    }
                }
            })

        });
    });
});

// Static if in PROD
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port' + port));