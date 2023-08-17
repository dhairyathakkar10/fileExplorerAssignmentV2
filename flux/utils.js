// In this file we will be having the refrence of pure function.
function checkFileName(event){
    if(typeof event === "string"){
        fileName = event
    }else{
        fileName = event.target.value;
    }
    let regex = /^([a-zA-Z]){1,10}$/;
    let regex1 = /^([a-zA-Z]){0}$/;
    if(fileName.match(regex)){
        let a = document.getElementsByClassName("createFolderBtn")
        for(let i=0 ; i<a.length; i++){
            a[i].style.display = "inline-block"
        }
        let b = document.getElementsByClassName("createFileBtn")
        for(let i=0 ; i<b.length; i++){
            b[i].style.display = "inline-block"
        }
        document.getElementById("fileName").style.boxShadow="0 0 5px rgba(81, 203, 238, 1)"
        document.getElementById("fileName").style.outline="1px solid rgba(81, 203, 238, 1)"
        document.getElementById("error").innerHTML = "";
        return true;
    }else if(fileName.match(regex1)){
        let a = document.getElementsByClassName("createFolderBtn")
        for(let i=0 ; i<a.length; i++){
            a[i].style.display = "none"
        }
        let b = document.getElementsByClassName("createFileBtn")
        for(let i=0 ; i<b.length; i++){
            b[i].style.display = "none"
        }
        return false;
    }
    else{
        let a = document.getElementsByClassName("createFolderBtn")
        for(let i=0 ; i<a.length; i++){
            a[i].style.display = "none"
        }
        let b = document.getElementsByClassName("createFileBtn")
        for(let i=0 ; i<b.length; i++){
            b[i].style.display = "none"
        }
        document.getElementById("fileName").style.boxShadow="0 0 5px rgba(255, 0, 0, 1)"
        document.getElementById("fileName").style.outline="1px solid rgba(255, 0, 0, 1)"
        document.getElementById("fileName").style.border="none"
        document.getElementById("error").innerHTML = "The file/folder name cannot be greater than 10 characters and should not contain a number";
        return false
    }
}
function createFolderElem(obj){
    let name = obj.name;
    let id = obj.id;
    let div = document.createElement("div")
    div.id = id;
    div.className="folder"
    let arrow = document.createElement("span")
    arrow.className="rotate"
    arrow.innerHTML="&#10148;"
    arrow.setAttribute("onclick",  "toggleButton(this)")
    div.style.paddingLeft = "20px"
    fodlerName = document.createElement("span")
    fodlerName.innerHTML = name;
    let folderIcon = document.createElement("span");
    folderIcon.innerHTML = "&#128193";
    folderIcon.className = "createFolderBtn"
    folderIcon.setAttribute("onclick",  "createFolderEventListener(this)")
    let fileIcon = document.createElement("span");
    fileIcon.innerHTML = "&#128196;";
    fileIcon.className="createFileBtn"
    fileIcon.setAttribute("onclick",  "createFileEventListener(this)")
    let deleteIcon = document.createElement("span");
    deleteIcon.innerHTML = "&#x2715;";
    deleteIcon.className = "deleteBtn"
    deleteIcon.setAttribute("onclick", "deleteFEventListener(this)")
    let renameIcon = document.createElement("span")
    renameIcon.className = "rename"
    renameIcon.id="rename"
    renameIcon.setAttribute("onclick", "rename(this)")
    renameIcon.innerHTML = "&#9998;"
    div.appendChild(arrow);
    div.appendChild(fodlerName)
    div.appendChild(folderIcon)
    div.appendChild(fileIcon)
    div.appendChild(renameIcon);
    div.appendChild(deleteIcon)    
    div.appendChild(document.createElement("div"));
    console.log(div);
    return div;
}
function createFileElem(obj){
    let name = obj.name;
    let id = obj.id;
    let div = document.createElement("div")
    div.id = id;
    div.style.paddingLeft = "20px"
    let fileName = document.createElement("span")
    fileName.innerHTML = name;
    let deleteIcon = document.createElement("span");
    deleteIcon.innerHTML = "&#x2715;";
    deleteIcon.setAttribute("onclick", "deleteFEventListener(this)")
    deleteIcon.className = "deleteBtn"
    let renameIcon = document.createElement("span")
    renameIcon.className = "rename"
    renameIcon.id="rename"
    renameIcon.setAttribute("onclick", "rename(this)")
    renameIcon.innerHTML = "&#9998;"
    div.appendChild(fileName)
    div.appendChild(renameIcon)
    div.appendChild(deleteIcon)
    return div;
}
function findItem (folderList, index){
    let ans;
    for (let item of folderList) {
        if (item.id == index) {
            console.log(item)
            return item;
        }
        if (item.type == "folder") {
            ans = findItem(item.children, index);
            if(ans){
                return ans;
            }
            
        }
    }
    return null;
}
function push_item(folderList, index, obj){
    console.log(obj);
    for (let item of folderList) {
        if (item.id == index) {
            item.children.push(obj)
            break;
        }
        if (item.type == "folder") {
            push_item(item.children, index, obj)
        }
    }
}
function updateChildren(folderList, index, obj){
    for (let item of folderList) {
        if (item.id == index) {
            item.children = obj
            break;
        }
        if (item.type == "folder") {
            push_item(item.children, index, obj)
        }
    }
}