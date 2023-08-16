// This is a common ground, entry point of our js.  
function renderHTML (folderList){
    for (let item of folderList) {
        if(item.type === "folder"){
            let folderElem = createFolderElem(item.id, item.name);
            if(item.parentNodeid!=-1){
                document.getElementById(item.parentNodeid)?.lastElementChild.appendChild(folderElem);
            }
        }else{
            let fileElem = craeteFileElem(item.id, item.name);
            if(item.parentNodeid!=-1){
                document.getElementById(item.parentNodeid)?.lastElementChild.appendChild(fileElem);
            }
        }
        if (item.type == "folder") {
            renderHTML(item.children)
        }
    }
}