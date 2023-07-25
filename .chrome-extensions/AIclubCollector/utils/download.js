function download(data) {
  // 创建工作簿对象
  const workbook = XLSX.utils.book_new();

  // 创建工作表对象
  const worksheet = XLSX.utils.aoa_to_sheet(data);

  // 将工作表添加到工作簿
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // 生成 Excel 文件的二进制数据
  const excelData = XLSX.write(workbook, { type: "binary", bookType: "xlsx" });

  // 将二进制数据转换为 Blob 对象
  const blob = new Blob([s2ab(excelData)], { type: "application/octet-stream" });

  // 创建下载链接
  const downloadLink = document.createElement("a");
  downloadLink.innerHTML = "点击下载";
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = "data.xlsx";

  // 添加链接到页面并触发下载
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // 辅助函数：将字符串转换为 ArrayBuffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }
};

window.download = download