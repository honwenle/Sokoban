var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
cvs.width = 0;
cvs.height = 0;
var SIZE;
var cvsx = document.getElementById('cvsx');
var ctxx = cvs.getContext('2d');

var rows, cols;
$('#size_ok').click(function () {
    rows = $('#rows').val();
    cols = $('#cols').val();
    
    SIZE = ~~(screen.availWidth / cols);
    cvs.width = SIZE * cols;
    cvs.height = SIZE * rows;
    cvsx.width = SIZE * cols;
    cvsx.height = SIZE * rows;
    drawBack();
})

srcList = ['hero.png','wall.jpg','floor.jpg','target.jpg','box0.jpg','box1.jpg'];
imgList = [];
srcList.forEach(function (item) {
    var img = new Image();
    img.src = './images/' + item;
    imgList.push(img);
    $('.tools').append(img);
})

var list = [],
    boxList = [],
    hero;
function drawBack () {
    for (var i = 0; i < rows; i++) {
        list[i] = [];
        for (var j = 0; j < cols; j++) {
            ctx.drawImage(imgList[1], j*SIZE, i*SIZE, SIZE, SIZE);
            list[i][j] = 1;
        }
    }
}

var toolid = null;
$('.tools img').click(function () {
    $('.tools img').removeClass('on');
    $(this).addClass('on');
    toolid = $(this).index();
})

cvsx.addEventListener('click',function (e) {
    if (toolid === null) {
        return false;
    }
    var x = e.clientX / SIZE | 0;
    var y = (e.clientY - $('.cvs')[0].offsetTop) / SIZE | 0;
    if (toolid > 0 && toolid < 4) {
        ctx.drawImage(imgList[toolid], x*SIZE, y*SIZE, SIZE, SIZE);
        list[y][x] = toolid;
    }
    if (toolid > 3) {
        ctx.drawImage(imgList[toolid], x*SIZE, y*SIZE, SIZE, SIZE);
        list[y][x] = toolid - 2;
        var boxid = getID(y, x);
        if (boxList.indexOf(boxid) < 0) {
            boxList.push(boxid);
        }
    }
}, false);

function getID(row, col) {
    return row*10 + col
}