// 监听插件安装，并在安装时将默认API建议存入本地缓存。如果是首次安装，会将'tabs', 'storage', 'scripting'关键词存入本地。
chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
        chrome.storage.local.set({
            apiSuggestions: ['tabs', 'storage', 'scripting']
        });
    }
})
// 定义要跳转的地址
const URL_CHROME_EXTENSIONS_DOC = 'https://developer.chrome.com/docs/extensions/reference/';
// 定义常量：保留的最近搜索条数
const NUMBER_OF_PREVIOUS_SEARCHES = 4;

// 监听omnibox的输入变化，并设置omnibox的默认建议。
chrome.omnibox.onInputChanged.addListener(async (input, suggest) => {
    await chrome.omnibox.setDefaultSuggestion({
        description: 'Enter a Chrome API or choose from past searches'
    });
    // 获取本地存储中的api建议
    const { apiSuggestions } = await chrome.storage.local.get('apiSuggestions');
    // 将api建议格式化为omnibox建议的内容和描述。
    const suggestions = apiSuggestions.map((api) => {
        return { content: api, description: `Open chrome.${api} API` };
    });
    // 将格式化后的建议提供给omnibox
    suggest(suggestions);
});

// 当omnibox中输入的值被确认时，打开选择的对应的网页，并跟新搜索历史
chrome.omnibox.onInputEntered.addListener((input) => {
    chrome.tabs.create({ url: URL_CHROME_EXTENSIONS_DOC + input });
    updateHistory(input);

});

// 将最新搜索的值插入到数组的首位，并删除超过保留的最近搜索条数的值。最后更新本地存储api的建议。
async function updateHistory(input) {
    const { apiSuggestions } = await chrome.storage.local.get('apiSuggestions');
    apiSuggestions.unshift(input);
    apiSuggestions.splice(NUMBER_OF_PREVIOUS_SEARCHES);
    return chrome.storage.local.set({ apiSuggestions });
}
