// In this file we will be having the files of the impure functions.
let globalIdGenerator = 0;
function genetareId(){
    globalIdGenerator++;
    return globalIdGenerator
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
function renameItem(folderList, index){
    for (let item of folderList) {
        if (item.id == index) {
            let a = prompt("Please enter new file/folder name.");
            let elem = document.getElementById(index);
            let parentObj = findItem(store, elem.parentNode.id);
            for(const child of parentObj.children){
                if(child.name === a){
                    alert("Folder/File with this name already exists in this Folder!, Please try a different name!");
                    return;
                }
            }
            console.log(elem);
            let childCount = elem.childElementCount;
            if(a!=null && a!=""){
                console.log(checkFileName(a));
                while(!checkFileName(a)){
                    window.alert("File name should not be grater than 10 char and should not contain a numnber");
                    a = window.prompt("Please try again!");
                }
                item.name = a;
                console.log(childCount);
                let requiredElem;
                if(childCount === 3){
                    requiredElem = elem.firstElementChild
                }else{
                    requiredElem = elem.firstElementChild.nextElementSibling
                }
                console.log(requiredElem)
                requiredElem.innerHTML = a;
            }
            checkFileName("");
        }
        if (item.type == "folder") {
            ans = renameItem(item.children, index);
        }
    }
}
function createFolder(elem){
    let folderName = document.getElementById("fileName").value;
    let folderId = genetareId();
    let parentObj = findItem(store, elem.parentNode.id);
    for(const child of parentObj.children){
        if(child.name === folderName){
            alert("Folder with this name already exists!, Please try a different name!");
            return;
        }
    }
    let folderLevel = parentObj.level+1;
    let Folderobj = {
        id:folderId,
        name:folderName,
        type:"folder",
        level:folderLevel,
        parentNodeid : parentObj.id,
        children:[]
    }
    push_item(store, parentObj.id, Folderobj);
    document.getElementById(parentObj.id).lastElementChild.appendChild(createFolderElem(Folderobj.id, Folderobj.name, Folderobj.level))
    console.log(store)
    document.getElementById("fileName").value = ""
    checkFileName("")

}
function createFile(elem){
    let fileId = genetareId();
    let fileName = document.getElementById("fileName").value;
    let parentObj = findItem(store, elem.parentNode.id);
    for(const child of parentObj.children){
        if(child.name === fileName){
            alert("File with this name already exists in this folder!, Please try a different name!");
            return;
        }
    }
    let fileObj = {
        id:fileId,
        name:fileName,
        level:parentObj.level + 1, //Parent level +1
        type:"file",
        parentNodeid : parentObj.id,
        children:null
    }
    let fileElem = createFileElem(fileObj.id, fileObj.name, fileObj.level)
    push_item(store, parentObj.id, fileObj);
    document.getElementById(parentObj.id).lastElementChild.appendChild(fileElem)
    document.getElementById("fileName").value = ""
    checkFileName("")
}
function toggleButton(elem){
    let idToHide = elem.parentNode.id;
    if(document.getElementById(idToHide).lastElementChild.style.display === ""){
        console.log("Hii")
        document.getElementById(idToHide).lastElementChild.style.display = "none"
        document.getElementById(idToHide).firstElementChild.className="normal"
    }else{
        document.getElementById(idToHide).lastElementChild.style.display = ""
        document.getElementById(idToHide).firstElementChild.className="rotate"
    }
}
// function updateChildren(folderList, index, obj){
//     for (let item of folderList) {
//         if (item.id == index) {
//             item.children = obj
//             break;
//         }
//         if (item.type == "folder") {
//             push_item(item.children, index, obj)
//         }
//     }
// }
function deleteF(elem){
    let elemId = elem.parentNode.id;
    let parentId = findItem(store, elemId).parentNodeid;
    let sibling = findItem(store, parentId).children;
    for(let i=0; i<sibling.length; i++){
        if(sibling[i].id == elemId){
            sibling.splice(i, 1);
        }
    }
    document.getElementById(elemId).remove();
    console.log(store);
}
function rename(elem){
    console.log(elem.parentNode.id);
    let index = elem.parentNode.id;
    renameItem(store, index);
};