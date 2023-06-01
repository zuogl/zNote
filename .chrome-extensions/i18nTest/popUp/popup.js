let textArray = ['单击我测试detectLanguage', '点击我测试getAcceptLanguages', '点击我测试getMessage', '点击我测试getUILanguage']


let btns = document.querySelectorAll(".btn-wraper button")
let result = document.querySelector(".result")
let middleBox = document.querySelector(".middleBox")

let callbackList = [
    {
        callback: () => {

            chrome.i18n.detectLanguage('1994年任MIT亚太地区（中国）联络负责人。1995年底回国任美国ISI公司驻中国首席代表。 1996年在MIT媒体实验室主任尼葛洛庞帝教授和MIT斯隆商学院爱德华·罗伯特教授的风险投资支持下创建了爱特信公司，成为中国第一家以风险投资资金建立的互联网公司。1998年2月25日，爱特信正式推出搜狐产品，并更名为搜狐公司。2000年7月12日，在美国纳斯达克成功挂牌上市（NASDAQ:SOHU）。 2002年7月17日，搜狐打破中国互联网的僵局，实现赢利。同年10月17日，作为评委嘉宾出席2002福特环保奖颁奖。2003年，在上市公司中国科技人物财富排行榜上他次于丁磊获得亚军。在胡润制造的2003年中国IT富豪五十强中张朝阳亦名列三甲。同年3月6日，经中华全国工商业联合会第九次会员代表大会选举，当选中华全国工商业联合会第九届执行委员会委员。', (res) => {
                result.innerHTML = ''
                let r = JSON.stringify(res,null,2);
                result.innerHTML = r;
            })

        }
    },
    {
        callback: (e) => {
            console.log('e', e)
        }
    },
    {
        callback: (e) => {
            console.log('e', e)
        }
    },
    {
        callback: (e) => {
            console.log('e', e)
        }
    },
]

btns.forEach((btn, index) => {
    btn.innerText = textArray[index]
    btn.addEventListener('click', callbackList[index].callback)
})