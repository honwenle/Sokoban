var LIST = [
    [
        [0,0,1,1,1,1],
        [1,1,1,2,3,1],
        [1,2,2,2,3,1],
        [1,2,2,2,2,1],
        [1,1,2,2,1,1],
        [0,1,1,1,1,0]
    ],
    [
        [1,1,1,1,1],
        [1,2,2,2,1],
        [1,2,2,2,1],
        [1,2,2,1,1],
        [1,3,2,1],
        [1,3,2,1],
        [1,1,1,1]
    ]
];
var BOXLIST = [
    [22,33],
    [22,42]
];
var HERO = [
    [4,2],
    [2,3]
];

function getString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null) return unescape(r[2]);
    return null;
}