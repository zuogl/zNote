// 当扩展程序第一次安装/更新时触发
chrome.runtime.onInstalled.addListener(() => {
    // 设置插件状态徽章文本为"OFF"
    chrome.action.setBadgeText({
        text: "OFF",
    });
});


// 定义谷歌浏览器的插件和商店说明文档页面网址
const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore';

// 监听插件图标的单击事件
chrome.action.onClicked.addListener(async (tab) => {
    // 判断当前活动页是不是谷歌浏览器的插件或商店文档页面
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
        // 根据tabid获取当前插件徽章状态
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        // 设置插件的下一个状态的文字
        const nextState = prevState === 'ON' ? 'OFF' : 'ON';
        // 设置插件的下一个状态
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState
        });

        if (nextState === 'ON') {
            // 当当前页签的插件处于聚焦模式时，插入focus-mode.css文件
            await chrome.scripting.insertCSS({
                files: ['focus-mode.css'],
                target: { tabId: tab.id }
            });
        } else if (nextState === 'OFF') {
            // 当当前页签的插件处于非聚焦模式时，移除focus-mode.css文件
            await chrome.scripting.removeCSS({
                files: ['focus-mode.css'],
                target: { tabId: tab.id }
            });
        }
    }
});

