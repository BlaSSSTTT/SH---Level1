const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
let counter = 0;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const aValue = req.query.a;
    const bValue = req.query.b; 
    
    console.log('Значення параметра "a":', aValue);
    console.log('Значення параметра "b":', bValue);
    
    if (aValue !== undefined && bValue !== undefined) {
        const result = parseFloat(aValue) + parseFloat(bValue);
        res.send(`Результат додавання: ${result}`);
    } else {
        res.status(400).send('Параметри "a" та "b" повинні бути визначені.');
    }
});
app.get('/hello', (req, res) => {
    res.send(`Входів на цей сайт: ${++counter}`);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
