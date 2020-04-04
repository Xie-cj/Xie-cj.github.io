// 给markdown生成的超链接设置blank属性
var aTags = Array.prototype.slice.apply(document.getElementsByTagName("a"));
aTags.forEach(function (el) {
    if (el.href.indexOf("?_blank") > -1) {
        el.target = "_blank";
        el.href = el.href.replace("?_blank", "");
    }
});

(function (){
    NodeList.prototype.forEach = NodeList.prototype.forEach || Array.prototype.forEach;

    document.querySelectorAll('pre code').forEach((item) => {
        if(item.textContent.trim().split('\n').length >= 10) {
            item.parentNode.className += ' line-numbers'
        }
    })
})()