const PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();
var arr = [], box, ei, ej;

app.use('/public', express.static('public'));

function swap(arr, i1, j1, i2, j2) {
    t = arr[i1][j1];
    arr[i1][j1] = arr[i2][j2];
    arr[i2][j2] = t;
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/Game', (req, res) => {
    for (i = 0; i < 4; ++i) {
        arr[i] = []
        for (j = 0; j < 4; ++j) {
            if (i + j != 6)
                arr[i][j] = i * 4 + j + 1;
            else
                arr[i][j] = "";
        }
    }

    ei = 3;
    ej = 3;
    for (i = 0; i < 20; ++i)
        switch (Math.round(3 * Math.random())) {
            case 0: if (ei != 0) swap(arr, ei, ej, --ei, ej); break;            // замена с верхнеей
            case 1: if (ej != 3) swap(arr, ei, ej, ei, ++ej); break;           // замена с правой
            case 2: if (ei != 3) swap(arr, ei, ej, ++ei, ej); break;            // Замена с нижней
            case 3: if (ej != 0) swap(arr, ei, ej, ei, --ej);                   // замена с левой
        }
    res.send(JSON.stringify({ arr: arr, ei: ei, ej: ej }));
});


app.listen(5000);