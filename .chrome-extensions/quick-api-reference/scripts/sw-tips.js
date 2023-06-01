// 获取最新的提示并更新本地存储
const updateTip = async () => {
    const response = await fetch('https://extension-tips.glitch.me/tips.json');
    const tips = await response.json();
    const randomIndex = Math.floor(Math.random() * tips.length);
    return chrome.storage.local.set({ tip: tips[randomIndex] });
};

// 异步创建或获取提示
const ALARM_NAME = 'tip';
async function createAlarm() {
    const alarm = await chrome.alarms.get(ALARM_NAME);
    if (typeof alarm === 'undefined') {
        // 创建一个每天触发一次的提示
        chrome.alarms.create(ALARM_NAME, {
            delayInMinutes: 1,
            periodInMinutes: 1440
        });
        updateTip();
    }
}
// 创建一个提示
createAlarm();
// 监听提示的触发
chrome.alarms.onAlarm.addListener(updateTip);

// 向内容脚本发送消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.greeting === 'tip') {
        chrome.storage.local.get('tip').then(sendResponse);
        return true;
    }
});