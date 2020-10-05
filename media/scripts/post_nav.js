let postChildNode = document.querySelector('.post_content').childNodes,
    postTitles = [],
    scrollerTimer = true,
    box = document.createElement('div'),
    box_a_div = document.createElement('div')

postChildNode.forEach((e) => {
    if(['H1', 'H2', 'H3'].indexOf(e.tagName) != -1) {
        postTitles.push({
            'id': e.id,
            'tagName': e.tagName
        })
    }
})

createNav(postTitles)

if('ontouchstart' in window) {
    window.onscroll=function(){
        box.classList.remove('show')
        box_a_div.style.cssText = 'pointer-events: none;'
    }
    box.onclick = function () {
        this.classList.add('show')
        box_a_div.style.cssText = ''
    }
}

function createNav(arr) {
    if(!arr || arr.length <= 1) return

    box.className = 'post-title-nav'
    box_a_div.className = 'box-a-div'
    arr.forEach((item) => {
        let box_a = document.createElement('a')
        box_a.href = `javascript:void(0)`
        box_a.textContent = item.id
        box_a.className = `post_nav_a_${item.tagName}`
        box_a.onclick = function () {
            if (scrollerTimer) {
                scrollerTimer = false
                box.classList.add('await')
                scroller(this.textContent, 300)
                box.classList.remove('show')
                setTimeout(() => {
                    scrollerTimer = true
                    box.classList.remove('await')
                }, 350)
            }
        } 
        box_a_div.appendChild(box_a)
    })
    box.appendChild(box_a_div)
    box.onmouseover = function () {
        this.classList.add('show')
        box_a_div.style.cssText = ''
    }
    box.onmouseout  = function () {
        this.classList.remove('show')
       box_a_div.style.cssText = 'pointer-events: none;'
    }
    document.querySelector('body').appendChild(box)
}

// 转换为数字 
function intval(v) 
{ 
    v = parseInt(v); 
    return isNaN(v) ? 0 : v; 
} 

// 获取元素信息 
function getPos(e) 
{ 
    var l = 0; 
    var t  = 0; 
    var w = intval(e.style.width); 
    var h = intval(e.style.height); 
    var wb = e.offsetWidth; 
    var hb = e.offsetHeight; 
    while (e.offsetParent){ 
        l += e.offsetLeft + (e.currentStyle?intval(e.currentStyle.borderLeftWidth):0); 
        t += e.offsetTop  + (e.currentStyle?intval(e.currentStyle.borderTopWidth):0); 
        e = e.offsetParent; 
    } 
    l += e.offsetLeft + (e.currentStyle?intval(e.currentStyle.borderLeftWidth):0); 
    t  += e.offsetTop  + (e.currentStyle?intval(e.currentStyle.borderTopWidth):0); 
    return {x:l, y:t - 10, w:w, h:h, wb:wb, hb:hb};
    // return {x:l, y:t, w:w, h:h, wb:wb, hb:hb}; 
} 

// 获取滚动条信息 
function getScroll()  
{ 
    var t, l, w, h; 

    if (document.documentElement && document.documentElement.scrollTop) { 
        t = document.documentElement.scrollTop; 
        l = document.documentElement.scrollLeft; 
        w = document.documentElement.scrollWidth; 
        h = document.documentElement.scrollHeight; 
    } else if (document.body) { 
        t = document.body.scrollTop; 
        l = document.body.scrollLeft; 
        w = document.body.scrollWidth; 
        h = document.body.scrollHeight; 
    } 
    return { t: t, l: l, w: w, h: h }; 
} 

// 锚点(Anchor)间平滑跳转 
function scroller(el, duration) 
{ 
    if(typeof el != 'object') { el = document.getElementById(el); } 

    if(!el) return; 

    var z = this; 
    z.el = el; 
    z.p = getPos(el); 
    z.s = getScroll(); 
    z.clear = function(){window.clearInterval(z.timer);z.timer=null}; 
    z.t=(new Date).getTime(); 

    z.step = function(){ 
        var t = (new Date).getTime(); 
        var p = (t - z.t) / duration; 
        if (t >= duration + z.t) { 
            z.clear(); 
            window.setTimeout(function(){z.scroll(z.p.y, z.p.x)},13); 
        } else { 
            st = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.y-z.s.t) + z.s.t; 
            sl = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.x-z.s.l) + z.s.l; 
            z.scroll(st, sl); 
        } 
    }; 
    z.scroll = function (t, l){window.scrollTo(l, t)}; 
    z.timer = window.setInterval(function(){z.step();},13); 
}