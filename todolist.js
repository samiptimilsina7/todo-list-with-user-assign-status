let task=[]
let titleEL=''
let descriptionEl=''
let taskStatusEL=''
let userAssignEL=''

document.querySelector(".left-text-button-area #title").value=null;
document.querySelector(".left-text-button-area #description").value=null;
document.querySelector(".left-text-button-area #recent").checked=true;

const slidingform=()=>{
    document.querySelector(".newtaskform").classList.add("sliding-transition")
}

const addTask=()=>{
    titleEL=document.querySelector(".left-text-button-area #title").value;
    descriptionEl=document.querySelector(".left-text-button-area #description").value;
    taskStatusEL=document.querySelector(".left-text-button-area input[type=radio]:checked").id;
    userAssignEL=document.querySelector("select[name=userassign]").value;
    task.push({id:task.length+1,title:titleEL,description:descriptionEl,taskStatus:taskStatusEL,userAssign:userAssignEL})
    displayTask();
    document.querySelector(".left-text-button-area #title").value=null;
    document.querySelector(".left-text-button-area #description").value=null;
}

function displayTask(){
    document.querySelector(".task-categories .recent").innerHTML=""
    document.querySelector(".task-categories .onprogress").innerHTML=""
    document.querySelector(".task-categories .completed").innerHTML=""
    task.forEach((item,index)=>{
        if (item.taskStatus==="recent") {
            document.querySelector(".task-categories .recent").innerHTML+=
            `
            <div class="box">
                <h2>${item.title}</h2>
                <p class="description">${item.description}</p>
                <p>Assigned to: ${item.userAssign}</p>
                <div>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${item.id})">Delete</button>
                </div>
            </div>          
            `            
        } else if (item.taskStatus==="onprogress") {
            document.querySelector(".task-categories .onprogress").innerHTML+=
            `
            <div class="box">
                <h2>${item.title}</h2>
                <p class="description">${item.description}</p>
                <p>Assigned to: ${item.userAssign}</p>
                <div>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${item.id})">Delete</button>
                </div>
            </div>          
            `  
        } else {
            document.querySelector(".task-categories .completed").innerHTML+=
            `
            <div class="box">
                <h2>${item.title}</h2>
                <p class="description">${item.description}</p>
                <p>Assigned to: ${item.userAssign}</p>
                <div>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${item.id})">Delete</button>
                </div>
            </div>          
            `  
        }
    })
}

const deleteTask=(id)=>{
    task=task.filter(item=>item.id!==id);
    displayTask();
}

const editTask=(index)=>{
    document.querySelectorAll(".newtaskform .left-text-button-area button")[0].classList.add('display-none')
    document.querySelectorAll(".newtaskform .left-text-button-area button")[1].classList.remove('display-none')
    document.querySelector(".newtaskform .left-text-button-area h3").innerHTML="Edit Task"

    document.querySelector(".left-text-button-area #id").value=task[index].id;
    document.querySelector(".left-text-button-area #title").value=task[index].title;
    document.querySelector(".left-text-button-area #description").value=task[index].description;
    
    if (task[index].taskStatus==document.querySelector(".left-text-button-area #recent").id) {
        document.querySelector(".left-text-button-area #recent").checked=true;
    } else if (task[index].taskStatus==document.querySelector(".left-text-button-area #onprogress").id) {
        document.querySelector(".left-text-button-area #onprogress").checked=true;
    } else {
        document.querySelector(".left-text-button-area #complete").checked=true;
    }

    document.querySelector(".assigntask select").value=task[index].userAssign;
}

const saveTask=()=>{
    document.querySelectorAll(".newtaskform .left-text-button-area button")[0].classList.remove('display-none')
    document.querySelectorAll(".newtaskform .left-text-button-area button")[1].classList.add('display-none')
    document.querySelector(".newtaskform .left-text-button-area h3").innerHTML="Add Task"

    const arrayIndex=task.findIndex(item=>item.id==document.querySelector(".left-text-button-area #id").value)
    task[arrayIndex].title=document.querySelector(".left-text-button-area #title").value;
    task[arrayIndex].description=document.querySelector(".left-text-button-area #description").value;
    task[arrayIndex].taskStatus=document.querySelector(".left-text-button-area input[type=radio]:checked").id;
    task[arrayIndex].userAssign=document.querySelector("select[name=userassign]").value;
    displayTask();

    document.querySelector(".left-text-button-area #title").value=null;
    document.querySelector(".left-text-button-area #description").value=null;
}
