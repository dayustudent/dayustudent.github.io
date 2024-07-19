// CSS类名  
const DIALOG_CONTAINER_CLASS = 'dialog-container';  
const DIALOG_OVERLAY_CLASS = 'dialog-overlay';  
const DIALOG_CLASS = 'dialog';  
const DIALOG_CONTENT_CLASS = 'dialog-content';  
const DIALOG_CLOSE_BTN_CLASS = 'dialog-close-btn';  
  
// 创建并显示对话框的函数  
function showDialog(message) {  
    // 清除已存在的对话框（如果有）  
    removeDialog();  
  
    // 创建对话框容器  
    const dialogContainer = document.createElement('div');  
    dialogContainer.classList.add(DIALOG_CONTAINER_CLASS, 'dialog-hidden');  
    document.body.appendChild(dialogContainer);  
  
    // 创建遮罩层  
    const dialogOverlay = document.createElement('div');  
    dialogOverlay.classList.add(DIALOG_OVERLAY_CLASS);  
    dialogContainer.appendChild(dialogOverlay);  
  
    // 创建对话框内容  
    const dialog = document.createElement('div');  
    dialog.classList.add(DIALOG_CLASS);  
    dialogOverlay.appendChild(dialog);  
  
    // 创建对话框文本内容  
    const dialogContent = document.createElement('div');  
    dialogContent.classList.add(DIALOG_CONTENT_CLASS);  
    dialog.appendChild(dialogContent);  
  
    // 创建标题  
    const title = document.createElement('h2');  
    title.textContent = '信息提示';  
    dialogContent.appendChild(title);  
  
    // 创建消息内容  
    const messageElement = document.createElement('p');  
    messageElement.textContent = message;  
    dialogContent.appendChild(messageElement);  
  
    // 创建关闭按钮  
    const closeBtn = document.createElement('button');  
    closeBtn.classList.add(DIALOG_CLOSE_BTN_CLASS);  
    closeBtn.textContent = '关闭';  
    closeBtn.addEventListener('click', removeDialog);  
    dialogContent.appendChild(closeBtn);  
  
    // 显示对话框  
    dialogContainer.classList.remove('dialog-hidden');  
}  
  
// 隐藏并移除对话框的函数  
function removeDialog() {  
    const dialogContainers = document.getElementsByClassName(DIALOG_CONTAINER_CLASS);  
    while (dialogContainers.length > 0) {  
        dialogContainers[0].remove();  
    }  
}  

  
// 假设页面上有一个按钮用于触发对话框显示  
// <button id="show-dialog-btn">显示信息提示框</button>