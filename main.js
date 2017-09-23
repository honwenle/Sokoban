var list = [
    [0,0,1,1,1,1],
    [1,1,1,2,3,1],
    [1,2,2,2,3,1],
    [1,2,2,2,2,1],
    [1,1,2,2,1,1],
    [0,1,1,1,1,0]
]
var boxList = [
    getID(2,2), getID(3,3)
];
var hero = [4,2];
var rows = list.length,
    cols = list[0].length;

var back = document.getElementById('back');
var bctx = back.getContext('2d');
SIZE = ~~(screen.availWidth / cols);
SCALE = SIZE / 35;
back.width = SIZE * cols;
back.height = SIZE * rows;
var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
cvs.width = SIZE * cols;
cvs.height = SIZE * rows;

srcList = ['hero.png','wall.jpg','floor.jpg','target.jpg','box0.jpg','box1.jpg'];
imgList = [];

srcList.forEach(function (item) {
    var img = new Image();
    img.onload = function () {
        srcList.shift();
        loading();
    };
    img.src = './images/' + item;
    imgList.push(img);
})
function loading () {
    if (srcList.length == 0) {
        drawBack();
        drawBox();
    }
}

function drawBack () {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (list[i][j] > 0) {
                bctx.drawImage(imgList[list[i][j]], j*SIZE, i*SIZE, SIZE, SIZE);
            }
        }
    }
}

function drawBox () {
    ctx.clearRect(0, 0, SIZE*cols, SIZE*rows);
    boxList.forEach(function (box) {
        var xy = getXY(box);
        ctx.drawImage(imgList[4+(list[xy[1]][xy[0]] == 3)], xy[1]*SIZE, xy[0]*SIZE, SIZE, SIZE);
    })
    ctx.drawImage(imgList[0], hero[1]*SIZE, hero[0]*SIZE, SIZE, SIZE);
}
function getXY(id) {
    return [
        ~~(id / 10),
        id % 10
    ]
}
function getID(row, col) {
    return row*10 + col
}

function userPlay () {
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37:
                moveHero(1, -1);
                break;
            case 38:
                moveHero(0, -1);
                break;
            case 39:
                moveHero(1, 1);
                break;
            case 40:
                moveHero(0, 1);
                break;
            default:
                break;
        }
    }
}
userPlay();
function moveHero (dir, dis) {
    var next = [hero[0], hero[1]];
    next[dir] += dis;
    if (boxList.indexOf(getID(next[0],next[1])) > -1) {
        console.log('box')
    } else if (list[next[0]][next[1]] > 1) {
        hero = next;
        drawBox();
    }
}