chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getContentMessage") {
    // 获取内容
    const contentMessage = Array.from(document.querySelectorAll(".checkin-main .topic-container")).map((node) => {
      let arrItem = [];
      let likeMembers = "";
      let name = node.querySelector(".header-container .author .member").innerText;
      let data = node.querySelector(".header-container .author .date").innerText;
      let content = node.querySelector(".talk-content-container .content").innerText;
      let like = node.querySelector(".like-container");
      if (like) {
        likeMembers = Array.from(like.querySelectorAll(".like-user .eachLike"))
          .map((item) => item.innerText)
          .join("");
      }
      arrItem.push(name, data, content, likeMembers);
      return arrItem;
    });
    sendResponse({ contentMessage });
  }
});
