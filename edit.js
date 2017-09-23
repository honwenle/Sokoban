var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
cvs.width = 0;
cvs.height = 0;
var SIZE;

var rows, cols;
$('#size_ok').click(function () {
    rows = $('#rows').val();
    cols = $('#cols').val();
    
    SIZE = ~~(screen.availWidth / cols);
    cvs.width = SIZE * cols;
    cvs.height = SIZE * rows;
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

function drawBack () {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            ctx.drawImage(imgList[1], j*SIZE, i*SIZE, SIZE, SIZE);
        }
    }
}

var toolid = null;
$('.tools img').click(function () {
    $('.tools img').removeClass('on');
    $(this).addClass('on');
    toolid = $(this).index();
})

cvs.addEventListener('click',function (e) {
    if (toolid === null) {
        return false;
    }
    var x = (e.clientX - cvs.offsetLeft) / SIZE | 0;
    var y = (e.clientY - cvs.offsetTop) / SIZE | 0;
    ctx.drawImage(imgList[toolid], x*SIZE, y*SIZE, SIZE, SIZE);
}, false);