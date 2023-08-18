// Calling function using FLUX.
let globalIdGenerator = 0;
function genetareId(){
    globalIdGenerator++;
    return globalIdGenerator
}
//Dispatcher
const Dispatcher = {
    callbacks : [],

    register(callback){
        this.callbacks.push(callback)
    },

    dispatch(action){
        this.callbacks.forEach(callback => callback(action));
    }
};

//Store
const dataStore = {
    state:[{
        id: 0,
        level: 0,
        parentNodeid:-1,
        name: "ROOT",
        type: "folder",
        children: []
    }],
    getState(){
        return this.state;
    },
    handleAction(action){
        if(action.type === 'createFile'){
            //Call function to create File
            push_item(dataStore.state, action.newObj.parentNodeid, action.newObj);
            document.getElementById('wrapper').lastElementChild.innerHTML = "";
            document.getElementById('fileName').value = "";
            CounterView.render(document.getElementById('wrapper').lastElementChild, dataStore.state)
            console.log(action)
        }else if(action.type === 'createFolder'){
            //Call function to create Folder
            push_item(dataStore.state, action.newObj.parentNodeid, action.newObj);
            document.getElementById('wrapper').lastElementChild.innerHTML = "";
            document.getElementById('fileName').value = "";
            CounterView.render(document.getElementById('wrapper').lastElementChild, dataStore.state)
        }else if(action.type === 'delete'){
            //Call function to delete File/Folder
            let elemId = action.id;
            let parentId = findItem(dataStore.getState(), elemId).parentNodeid;
            if(parentId === -1){
                alert("Cannot delete Root");
                return;
            }
            let siblings = findItem(dataStore.getState(), parentId).children;
            console.log(siblings);
            for(let i=0; i<siblings.length; i++){
                if(siblings[i].id == elemId){
                    siblings.splice(i, 1);
                    break;
                }
            }
            console.log(siblings);
            updateChildren(dataStore.state, parentId, siblings);
            console.log(this.state)
            document.getElementById('wrapper').lastElementChild.innerHTML = "";
            CounterView.render(document.getElementById('wrapper').lastElementChild, dataStore.state)
        } else if(action.type  === "toggle"){
            let idToHide = action.id;
            if(document.getElementById(idToHide).lastElementChild.style.display === ""){
                document.getElementById(idToHide).lastElementChild.style.display = "none"
                document.getElementById(idToHide).firstElementChild.className="normal"
            }else{
                document.getElementById(idToHide).lastElementChild.style.display = ""
                document.getElementById(idToHide).firstElementChild.className="rotate"
            }
        }else if(action.type === "rename"){
            renameItem(dataStore.state, action.id, action.parentId)
            document.getElementById('wrapper').lastElementChild.innerHTML = "";
            CounterView.render(document.getElementById('wrapper').lastElementChild, dataStore.state)
        }
    },
    emitChanges(){
        console.log("Something Changed");
    }
}

//View
const CounterView = {
    init(){
        document.getElementById('wrapper').lastElementChild.innerHTML = "";
        CounterView.render(document.getElementById('wrapper').lastElementChild, dataStore.state);
    },
    render(mainDiv, children){
        for(let obj of children){
            let addingdiv
            console.log(obj)
            if(obj.type === "file"){
                addingdiv = createFileElem(obj);
                console.log(addingdiv);
            }
            else{
                addingdiv = createFolderElem(obj);
                console.log(addingdiv);
            }
            mainDiv.appendChild(addingdiv);
            if(obj.children != null){
                this.render(addingdiv.lastElementChild , obj.children )
            }
        }
    }
}
CounterView.init()


Dispatcher.register(dataStore.handleAction.bind(dataStore));

function createFolder(elem){
    let parentNodeId = elem.parentNode.id;
    let parentNode = findItem(dataStore.state, parentNodeId);
    let newName = document.getElementById("fileName").value;
    for(const child of parentNode.children){
        if(child.name === newName){
            alert("Folder/File with this name already exists in this Folder!, Please try a different name!");
            return null;
        }
    }
    console.log(parentNode);
    newObj = {
        id: genetareId(),
        level: parentNode.level + 1,
        parentNodeid:parentNodeId,
        name: newName,
        type: "folder",
        children: []
    }
    console.log(newObj);
    return {
        type : "createFolder",
        newObj
    }
}
function createFile(elem){
    let parentNodeId = elem.parentNode.id;
    let parentNode = findItem(dataStore.state, parentNodeId);
    let newName = document.getElementById("fileName").value;
    for(const child of parentNode.children){
        if(child.name === newName){
            alert("Folder/File with this name already exists in this Folder!, Please try a different name!");
            return null;
        }
    }
    console.log(parentNode);
    newObj = {
        id: genetareId(),
        level: parentNode.level + 1,
        parentNodeid:parentNodeId,
        name: newName,
        type: "file",
        children: null
    }
    console.log(newObj);
    return {
        type : "createFile",
        parentNodeId,
        newObj
    }
}
function deleteF(elem){
    return{
        type :"delete",
        id:elem.parentNode.id
    }
    
}
function toggle(elem){
    console.log(elem.parentNode.id);
    return {
        type : "toggle",
        id : elem.parentNode.id
    }
}
function rename(elem){
    return{
        type:"rename",
        id:elem.parentNode.id,
        parentId:elem.parentNode.parentNode.id,
    }
}

function createFolderEventListener(elem){
    if(createFolder(elem)){
        Dispatcher.dispatch(createFolder(elem))
    }
    
}
function createFileEventListener(elem){
    if(createFile(elem)){
        Dispatcher.dispatch(createFile(elem))
    }
    
}
function deleteFEventListener(elem){
    Dispatcher.dispatch(deleteF(elem));
}
function toggleButton(elem){
    Dispatcher.dispatch(toggle(elem));
}
function renameEventListener(elem){
    Dispatcher.dispatch(rename(elem))
}
