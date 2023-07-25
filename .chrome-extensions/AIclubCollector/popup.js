window.addEventListener("DOMContentLoaded", async () => {

  
  const modeSelect = document.querySelector("#mode-select");
  const idInputWraper = document.querySelector("#id-input-wraper");
  const idInput = document.querySelector("#id-input");
  const datePicker = document.querySelector("#date-picker");
  const startDateInput = document.querySelector("#start-date");
  const endDateInput = document.querySelector("#end-date");
  const likesRange = document.querySelector("#likes-range");
  const likesValue = document.querySelector("#likes-value");
  const startButton = document.querySelector("#start-button");

  modeSelect.addEventListener("change", () => {
    if (modeSelect.value === "id") {
      idInputWraper.style.display = "block";
      likesRange.style.display = "none";
      datePicker.style.display = "none";
    } else if (modeSelect.value === "date") {
      idInputWraper.style.display = "none";
      likesRange.style.display = "none";
      datePicker.style.display = "block";
    } else if (modeSelect.value === "likes") {
      idInputWraper.style.display = "none";
      likesRange.style.display = "block";
      datePicker.style.display = "none";
      likesRange.addEventListener("input", (e) => {
        likesValue.textContent = e.target.value;
      });
    }
  });

  startButton.addEventListener("click", () => {
    let mode = modeSelect.value;
    let formData = {};
    switch (mode) {
      case "id":
        formData.id = idInput.value;
        formData.startDate = "2023-07-17 00:00:00";
        formData.endDate = "2024-01-17 23:59:59";
        formData.likes = "0";
        break;
      case "date":
        formData.id = '';
        formData.startDate = startDateInput.value ? `${startDateInput.value} 00:00:00` : "2023-07-17 00:00:00";
        formData.endDate = endDateInput.value ? `${endDateInput.value} 23:59:59` : "2024-01-17 23:59:59";
        formData.likes = "0";
        break;
      case "likes":
        formData.startDate = "2023-07-17 00:00:00";
        formData.endDate = "2024-01-17 23:59:59";
        formData.id ='';
        formData.likes = likesValue.value;
        break;

      default:
        formData.startDate = "2023-07-17 00:00:00";
        formData.endDate = "2024-01-17 23:59:59";
        formData.id = '';
        formData.likes = "0";
    }
    console.log(formData);
  });

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["contentScript.js"],
  });
  const response = await chrome.tabs.sendMessage(tab.id, {
    action: "getContentMessage",
  });
  if (response && response.contentMessage) {
    const contentMessage = response.contentMessage;
    console.log("contentMessage", contentMessage);

    // TODO: 将contentMessage 转化成一个excel文件，并在popup.html中添加一个下载按钮，当点击这个按钮时，
    // 可以实现excel文件的下载

    // download(contentMessage);
  }
});
