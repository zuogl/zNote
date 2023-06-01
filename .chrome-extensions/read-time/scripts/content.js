// 查找article元素
const article = document.querySelector('article');

// 如果article元素存在
if (article) {

    // 获取article元素的文本内容
    const text = article.textContent;

    // 定义正则表达式匹配单词
    const wordMatchRegExp = /[^\s]+/g;

    // 使用regex全局匹配文本中的所有单词
    const words = text.matchAll(wordMatchRegExp);

    // 转换为数组并获取单词数量
    const wordCount = [...words].length;

    // 计算阅读时间,每200单词算1分钟
    const readingTime = Math.round(wordCount / 200);

    // 创建一个段落元素作为徽章
    const badge = document.createElement('p');

    // 添加类名
    badge.classList.add('color-secondary-text', 'type--caption');

    // 设置徽章内容
    badge.textContent = `本文共有${wordCount}字,阅读大约需要: ${readingTime}分钟`;

    // 查找h1标题元素或time元素的父元素
    const heading = article.querySelector('h1');
    const date = article.querySelector('time')?.parentNode;

    // 将徽章元素插入到标题元素后面
    (date ?? heading).insertAdjacentElement('afterend', badge);
}



