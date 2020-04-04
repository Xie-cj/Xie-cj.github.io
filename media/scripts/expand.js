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
document.querySelectorAll('pre code').forEach((item) => {
    if (item.textContent.trim().split('\n').length >= 10) {
        item.parentNode.className += ' line-numbers'
    }
})

// 代码高亮插件
if (document.querySelector('pre code')) {
    document.write(`
          <link rel="stylesheet" href="https://cdn.staticfile.org/highlight.js/9.18.1/styles/vs2015.min.css">
          <script language=javascript src='https://cdn.staticfile.org/highlight.js/9.18.1/highlight.min.js'><\/script>
          <script>hljs.initHighlightingOnLoad();<\/script>
    
          <script src="/media/scripts/prism.js"><\/script>
        `);
}