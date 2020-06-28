//数据备份
let state = {};
let timer = null;  //图片加载用用到

//窗口大小变化
window.onresize = function(){
    if (!state.dom) return;

    state.dom.style.visibility = 'hidden';
    state.maxHeight =  document.querySelector('.view-com').offsetHeight;
    state.maxWidth =  document.querySelector('.view-com').offsetWidth;

    let top = (state.maxHeight - state.nowHeight) / 2;
    let left = (state.maxWidth - state.nowWidth) / 2;

    handleImgSize('sizeStyle',{width: state.nowWidth,height: state.nowHeight});
    handleImgSize('positionStyle',{top:top,left:left});

    state.dom.style.visibility = 'visible';
}

document.onmousedown= getDrag;
document.onmouseup= () => {
    state.drag.isdrag = false;
    console.log('鼠标松开')
}

function imageLargeInit(url,dom) {
    state = {
        size: 0, //宽高比例
        multiple: 0, //缩放的尺寸:原始图片的宽 * 0.1
        rotate: 0,  //旋转的度数
        loadingType: 'loading', //loading：加载中，error：加载错误， success： 加载成功
        drag: {
            ie: document.all,
            nn6: document.getElementById &&!document.all,
            isdrag: false,
            y: 0,
            x: 0,
            nTY: 0,
            nTX: 0
        },  //拖拉的数据
        dom: dom,  //图片的dom
        maxWidth: document.querySelector('.view-com').offsetWidth,  //最小高度
        maxHeight: document.querySelector('.view-com').offsetHeight, //最大高度
        width: 0,      //原始图片的宽度
        nowWidth: 0,   //图片现在的宽度
        nowHeight: 0,  //图片现在的高度
    };
    state.dom.style.display = 'none';
    document.querySelector('.img-msg .view-com .loading').style.display = 'block';
    document.querySelector('.img-msg .view-com .loading-error').style.display = 'none';
    initImg(url);
}
//初始化图片
function initImg(url) {
    //初始化图片的尺寸
    let img = new Image();
    img.onload = () => {
        if (state.loadingType == 'error') return;

        state.loadingType = 'success';
        //隐藏加载
        document.querySelector('.img-msg .view-com .loading').style.display = 'none';
        document.querySelector('.img-msg .view-com .loading-error').style.display = 'none';
        //显示图片
        state.dom.style.display = 'block';
        state.dom.setAttribute('src', url);

        state.size = img.height / img.width;
        state.multiple = img.width * 0.1;
        state.width = img.width;
        let width = 0,
            height = 0;
        //宽度大于maxWidth
        if (img.width < (state.maxWidth - 30)) {
            width = img.width;
        } else {
            width = state.maxWidth - 30
        }
        //高度大于maxHeight
        if ( width * state.size >= (state.maxHeight - 30)) {
            height = state.maxHeight;
            width = state.maxHeight * (img.width / img.height);
        } else {
            height = width * state.size;
        }
        state.rotate = 0;
        let top = (state.maxHeight - height) / 2;
        let left = (state.maxWidth - width) / 2;
        handleImgSize('sizeStyle',{width: width,height: height});
        handleImgSize('positionStyle',{top:top,left:left});
        state.dom.onmousewheel = getMouseWheel;
    };

    //图片加载错误
    img.onerror = () => {
        handleImgLoadingError();
    };
    //图片加载时间处理
    handleImgLoadingTimer();

    img.src = url;
}
//图片加载时间处理
function handleImgLoadingTimer() {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    //6秒后加载不出来
    timer = setTimeout( () => {
    //6秒后图片还处于加载中
        if (state.loadingType == 'loading') {
            handleImgLoadingError();
        }
    },6000);
}
//图片加载错误处理
function handleImgLoadingError() {
    //隐藏加载
    state.loadingType = 'error';
    document.querySelector('.img-msg .view-com .loading').style.display = 'none';
    state.dom.style.display = 'none';
    //显示加载错误
    document.querySelector('.img-msg .view-com .loading-error').style.display = 'block';
}
//捕获滚轮行为
function getMouseWheel(ev) {
    let oEvent = ev || window.event;
    let down = true;

    if (oEvent.detail) {
        down = oEvent.detail > 0 ? true : false;
    } else {
        down = oEvent.wheelDelta < 0 ? true : false;
    }

    fnWheel(down);
    return false;
}
//滚动计算
function fnWheel(down) {
    let height = 0,
        width = 0;

    if (down) {
        width = state.dom.offsetWidth - state.multiple;
    } else {
        width = state.dom.offsetWidth +  state.multiple;
    }

    height = width * state.size;
    let top = (state.maxHeight - height) / 2;
    let left = (state.maxWidth - width) / 2;

    if (width > 10) {
        handleImgSize('sizeStyle',{width: width,height: height});
        handleImgSize('positionStyle',{top:top,left:left});
    }
}
//处理图片尺寸，位置信息
function handleImgSize(type,size) {
    state.dom.style.transform = 'rotate(' +  state.rotate + 'deg)';
    if (type == 'positionStyle') {
        state.dom.style.top = size.top + 'px';
        state.dom.style.left = size.left+ 'px';
        state.top =  size.top;
        state.left = size.left;
    } else if (type == 'sizeStyle') {
        state.dom.style.width = size.width +'px';
        state.dom.style.height = size.height +'px';
        state.nowWidth =  size.width;
        state.nowHeight = size.height;
    }
}
//鼠标拖动
function getDrag(e) {
    state.drag.isdrag = true;
    state.drag.nTY = parseInt(state.top + 0);
    state.drag.y = state.drag.nn6 ? e.clientY : event.clientY;
    state.drag.nTX = parseInt( state.left+ 0);
    state.drag.x = state.drag.nn6 ? e.clientX : event.clientX;
    document.onmousemove=moveMouse;
    return false;
}
//鼠标移动
function moveMouse(e) {
    if (state.drag.isdrag) {
        console.log('鼠标移动')
        let top =  state.drag.nTY + e.clientY - state.drag.y,
            left = state.drag.nTX + e.clientX - state.drag.x;
        //高度计算
        top = handleSize(top,state.top, state.maxHeight - state.nowHeight);
        left = handleSize(left, state.left, state.maxWidth -state.nowWidth);
        handleImgSize('positionStyle',{top: top,left: left});
        return false;
    }
}
//拖拉算法
function handleSize(distance,nowDistance,size) {
    //size大于零时，不能拖拉
    if (size >= 0) return nowDistance;
    //拖拉的距离不能大于零
    if (distance >= 0)  return 0;
    //拖拉的距离不能小于size
    if (distance <= size)  return size;

    return distance;
}
//旋转
function handleRotating() {
    state.rotate -= 90;
    state.dom.style.transform = 'rotate(' +  state.rotate + 'deg)';
}
//原图1:1
function handelOriginal() {
    handleImgSize('sizeStyle',{width: state.width,height: state.width * state.size});
    handleImgSize('positionStyle',{top: (state.maxHeight - state.width * state.size) / 2,left: (state.maxWidth -state.width) / 2});
}
