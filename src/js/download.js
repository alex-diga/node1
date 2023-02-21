import FileSaver from 'file-saver';

function download(blob, fileName) {
  // download 属性存在兼容性问题，IE 11 及以下的版本不支持该属性
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

async function saveFile(blob, fileName) {
  // showSaveFilePicker API 是 Window 接口中定义的方法，调用该方法后会显示允许用户选择保存路径的文件选择器
  // 该 API 目前的兼容性还不是很好
  try {
    const handle = await window.showSaveFilePicker({
      suggestedName: fileName,
      type: [],
    })
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    return handle;
  } catch (err) {}
}

function saveFileByFS(blob, fileName) {
  FileSaver.saveAs(blob, fileName)
}