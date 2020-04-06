var aTags = Array.prototype.slice.apply(document.getElementsByTagName("a"));
aTags.forEach(function (el) {
    // 给链接带有'?_blank'参数的a标签设置_blank属性
    if (el.href.indexOf("?_blank") > -1) {
        el.target = "_blank";
        el.href = el.href.replace("?_blank", "");
    }
    // 点击当前窗口打开页面的链接时显示Loading
    if(el.target == '_self' || el.target == '') {
        el.addEventListener("click", function(){
            document.querySelector('#loading').style = 'display: block;'
        });
    }
});

// 超过10行的代码块添加行号
NodeList.prototype.forEach = NodeList.prototype.forEach || Array.prototype.forEach; // 某浏览器NodeList不支持forrEach方法
document.querySelectorAll('pre code').forEach(function (item) {
    if (item.textContent.trim().split('\n').length >= 10) {
        item.parentNode.className += ' line-numbers'
    }
})
