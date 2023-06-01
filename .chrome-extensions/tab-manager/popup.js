// 获取谷歌浏览器插件和商店开发者手册下的页面
const tabs = await chrome.tabs.query({
    url: [
        "https://developer.chrome.com/docs/webstore/*",

        "https://developer.chrome.com/docs/extensions/*",
    ]
});
// 使用Collator来对tabs进行排序
const collator = new Intl.Collator();
tabs.sort((a, b) => collator.compare(a.title, b.title));

// 获取li模版
const template = document.getElementById("li_template");
// 创建一个Set，用于存储模版
const elements = new Set();

// 遍历所有的tabs，获取其title和url地址，并分别给模版中准备好的元素，然后给a标签添加
// 点击事件=》激活对应的tab页签。
// 最后将这个每个tab加入Set中
for (const tab of tabs) {
    const element = template.content.firstElementChild.cloneNode(true);
    const title = tab.title.split("-")[0].trim();
    const pathname = new URL(tab.url).pathname.slice("/docs".length);
    element.querySelector(".title").textContent = title;
    element.querySelector(".pathname").textContent = pathname;
    element.querySelector("a").addEventListener("click", async () => {
        await chrome.tabs.update(tab.id, { active: true });
        await chrome.windows.update(tab.windowId, { focused: true });
    });
    elements.add(element);
}
// 将创建好的Set插入ul中。
document.querySelector("ul").append(...elements);

// tabs分组
const button = document.querySelector("button");

button.addEventListener("click", async () => {
    const tabIds = tabs.map(({ id }) => id);
    const group = await chrome.tabs.group({ tabIds });
    await chrome.tabGroups.update(group, { title: "DOCS" });
})
