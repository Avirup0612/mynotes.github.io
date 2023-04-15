const collapseDiv = document.querySelector(".collapsediv");
const toggleBtn = document.querySelector(".toggle-btn");
const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelector(".addlist");
const titleInput = document.querySelector(".title");
const ul = document.querySelector(".row");
const task = document.querySelector(".task")

const collapseDivHeading = document.querySelector(".collapsediv-heading");

toggleBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    collapseDiv.classList.toggle("open");
    collapseDivHeading.classList.toggle("hide");
    submitBtn.classList.toggle("hide");
    toggleBtn.classList.toggle("change");
});


form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const titleValue = titleInput.value;
    const taskValue = task.value;

    if(titleValue!=""||taskValue!="") {
        ul.insertAdjacentHTML("beforeend", `<li class="taskdiv col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mx-1">
                                                <h3 class="taskheading">${titleValue}</h3>
                                                <p class="task-info">${taskValue}</p>
                                                <div class="buttondiv">
                                                <ion-icon name="checkmark-done-outline" class="done-btn"></ion-icon>
                                                <ion-icon name="create-outline" class="edit-btn"></ion-icon>
                                                <ion-icon name="checkmark-outline" class="save-btn hide"></ion-icon>
                                                <ion-icon name="close-outline" class="remove-btn"></ion-icon>                                             
                                                </div>  
                                            </li>`);
    };
    titleInput.value="";
    task.value="";                                          
});

ul.addEventListener("click", (e)=>{

    if(e.target.classList.contains("done-btn")){
        e.target.parentNode.parentNode.style.border="#00cc00 2px solid";
        e.target.parentNode.previousElementSibling.style.color="#006600";
        e.target.parentNode.previousElementSibling.previousElementSibling.style.color="#006600";
        e.target.nextElementSibling.remove();
        e.target.remove();
    };

    if(e.target.classList.contains("remove-btn")){
        e.target.parentNode.parentNode.remove();
    };

    if(e.target.classList.contains("edit-btn")){
        const oldTaskValue = e.target.parentNode.previousElementSibling.textContent;
        const oldTitleValue = e.target.parentNode.previousElementSibling.previousElementSibling.textContent;
        const oldTitle = e.target.parentNode.previousElementSibling.previousElementSibling;
        const oldTask = e.target.parentNode.previousElementSibling;

        const newElemTitle = document.createElement("input");
        newElemTitle.setAttribute("class", "titleedit");
        newElemTitle.setAttribute("value", oldTitleValue);
        e.target.parentNode.parentNode.replaceChild(newElemTitle, oldTitle);

        const newElemTask = document.createElement("textarea");
        newElemTask.setAttribute("class", "taskedit");
        newElemTask.textContent=oldTaskValue;
        e.target.parentNode.parentNode.replaceChild(newElemTask, oldTask);

        e.target.classList.add("hide");
        e.target.nextElementSibling.classList.remove("hide");
        e.target.previousElementSibling.classList.add("hide");
    };
    
    if(e.target.classList.contains("save-btn")) {
        const oldTitle = e.target.parentNode.previousElementSibling.previousElementSibling;
        const oldTask = e.target.parentNode.previousElementSibling;
        
        const newTitleHead = document.createElement("h3");
        newTitleHead.setAttribute("class", "newtaskheading");
        newTitleHead.textContent = oldTitle.value;
        e.target.parentNode.parentNode.replaceChild(newTitleHead, oldTitle);

        const newEditedTask = document.createElement("p");
        newEditedTask.setAttribute("class", "newtaskinfo");
        newEditedTask.textContent = oldTask.value;
        e.target.parentNode.parentNode.replaceChild(newEditedTask, oldTask);

        e.target.classList.add("hide");
        e.target.previousElementSibling.classList.remove("hide");
        e.target.previousElementSibling.previousElementSibling.classList.remove("hide");
    }
});