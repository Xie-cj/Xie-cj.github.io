// 给markdown生成的超链接设置blank属性
var aTags = Array.prototype.slice.apply(document.getElementsByTagName("a"));
aTags.forEach(function (el) {
    if (el.href.indexOf("?_blank") > -1) {
        el.target = "_blank";
        el.href = el.href.replace("?_blank", "");
    }
});

// 超过10行的代码块添加行号
NodeList.prototype.forEach = NodeList.prototype.forEach || Array.prototype.forEach; // 某浏览器NodeList不支持forrEach方法
document.querySelectorAll('pre code').forEach(function (item) {
    if (item.textContent.trim().split('\n').length >= 10) {
        item.parentNode.className += ' line-numbers'
    }
})

// 内部链接点击时显示loading
document.querySelectorAll('a').forEach(function(el){
    if(el.target == '_self' || el.target == '') {
        el.addEventListener("click", function(){
            document.querySelector('#loading').style = 'display: flex;'
        });
    }
})