const img = chrome.runtime.getURL('images/name.png')
let textArray = [
    chrome.i18n.getMessage("textArray0"),
    chrome.i18n.getMessage("textArray1"),
    chrome.i18n.getMessage("textArray2"),
    chrome.i18n.getMessage("textArray3"),
]

let middleBoxObj = {
    detectLanguage: {
        title: {
            type: 'h5',
            text: chrome.i18n.getMessage("middleBoxObj_detectLanguage_title_text"),
        },
        btn1: {
            type: 'button',
            text: chrome.i18n.getMessage("middleBoxObj_detectLanguage_btn1_text")
        },
        p1: {
            type: 'p',
            text: chrome.i18n.getMessage("middleBoxObj_detectLanguage_p1_text")
        },
        btn2: {
            type: 'button',
            text: chrome.i18n.getMessage("middleBoxObj_detectLanguage_btn2_text")
        },
        p2: {
            type: 'p',
            text: '你好，插件。Здравствуйте, плагин Hello, plugin'
        },
        btn3: {
            type: 'button',
            text: chrome.i18n.getMessage("middleBoxObj_detectLanguage_btn3_text")
        },
        p3: {
            type: 'p',
            text: chrome.i18n.getMessage("middleBoxObj_detectLanguage_p3_text")
        }
    },
    getMessage: {
        title: {
            type: 'h5',
            text: chrome.i18n.getMessage("middleBoxObj_getMessage_title_text"),
            showBigImg: true
        },
        btn1: {
            type: 'button',
            text: chrome.i18n.getMessage("middleBoxObj_getMessage_btn1_text"),
        },
        p1: {
            type: 'p',
            text: chrome.i18n.getMessage("middleBoxObj_getMessage_p1_text"),
        },
        btn2: {
            type: 'button',
            text: chrome.i18n.getMessage("middleBoxObj_getMessage_btn2_text"),
        },
        p2: {
            type: 'p',
            text: 666,
        },
        btn3: {
            type: 'button',
            text: chrome.i18n.getMessage("middleBoxObj_getMessage_btn3_text"),
        },
        p3: {
            type: 'p',
            text: chrome.i18n.getMessage("middleBoxObj_getMessage_p3_text")
        },
    }
}

let btns = document.querySelectorAll(".btn-wraper button")
let result = document.querySelector(".result")
let bigImg = document.querySelector('.bigImg')
let closeBigImg = document.querySelector(".closeBigImg");

closeBigImg.innerText = chrome.i18n.getMessage("closeBigImg"),
    closeBigImg.addEventListener('click', () => {
        bigImg.classList.remove("show")
        closeBigImg.classList.remove("show")
    })
function middleBoxRender(rmOrAdd, detOrMess = 'det', obj = {}) {
    let pNode = middleBoxShowControl(rmOrAdd)
    if (!pNode) return
    result.innerHTML = ''
    pNode.innerHTML = ''
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        let dom = document.createElement(obj[keys[i]].type)
        dom.innerHTML = obj[keys[i]].text
        if (obj[keys[i]].type === 'button') {
            dom.dataset.text = obj[keys[i + 1]].text
            dom.addEventListener('click', (e) => {
                let text = e.target.dataset.text
                detOrMess === 'det' ? detectLanguage(text) : getMessage(text)
            })
        }
        pNode.appendChild(dom)
    }
    document.querySelector(".middleBox h5").addEventListener('click', () => {
        bigImg.src = img;
        bigImg.classList.add('show')
        closeBigImg.classList.add('show')
    })
}

function middleBoxShowControl(rmOrAdd) {
    if (!rmOrAdd) {
        let middleBox = document.querySelector(".middleBox")
        middleBox && document.body.removeChild(middleBox);
        return false
    }
    if (rmOrAdd) {
        let div = document.querySelector(".middleBox") || document.createElement("div")
        div.classList.add('middleBox')
        document.body.insertBefore(div, result)
        return document.querySelector(".middleBox")
    }
}

function resultRender(res, message = null) {
    result.innerHTML = ''
    if (message) {
        let p = document.createElement('p');
        p.innerText = message;
        result.appendChild(p)
    }
    let pre = document.createElement('pre')
    let r = JSON.stringify(res, null, 2);
    pre.innerHTML = r;
    result.appendChild(pre)

}
function detectLanguage(text) {
    chrome.i18n.detectLanguage(text, res => resultRender(res))
}

function getAcceptLanguages() {
    middleBoxRender(false)
    var message = chrome.i18n.getMessage("getAcceptLanguagesMessage");
    chrome.i18n.getAcceptLanguages((res) => resultRender(res, message))
}
function getUILanguage() {
    middleBoxRender(false)
    let res = chrome.i18n.getUILanguage()
    resultRender(res)
}

function getMessage(parames) {
    var res;
    if (parames === 'test') {
        res = chrome.i18n.getMessage('test')
    } else if (parames === '666') {
        res = chrome.i18n.getMessage(666)
    } else {
        res = chrome.i18n.getMessage('name', [
            chrome.i18n.getMessage("middleBoxObj_getMessage_p3_0_text"),
            chrome.i18n.getMessage("middleBoxObj_getMessage_p3_1_text"),
            chrome.i18n.getMessage("middleBoxObj_getMessage_p3_2_text")
        ])
    }
    resultRender(res)
}
let callbackList = [
    { callback: () => middleBoxRender(true, 'det', middleBoxObj.detectLanguage) },
    { callback: () => getAcceptLanguages() },
    { callback: () => middleBoxRender(true, 'mess', middleBoxObj.getMessage) },
    { callback: () => getUILanguage() },
]

btns.forEach((btn, index) => {
    btn.innerText = textArray[index]
    btn.addEventListener('click', callbackList[index].callback)
})