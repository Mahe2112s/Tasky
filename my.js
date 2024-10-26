//BackUP Storage
//This (state) object holds the list of tasks
const state = {
  taskList : [],
};

//DOM OPERATIONS
//queryselector is something to show from js to html.
//taskModal:reders to body of the modal where the task details will be shown.
//taskContenets:Represents the section where task card will be dynamically inserted.
const taskModal=document.querySelector(".task__modal__body");
const taskContents=document.querySelector(".task__contents");

//Template for card on screen.
//Generates strucuture for a task card.
const htmlTaskContent = ({ id, title, type, description, url }) => 
     `
      <div class="col-md-6 col-lg-4 mt-3" id="${id}">
        <div class="card shadow-sm taskCard">
          <div class="card-header d-flex justify-content-end taskHeader">
            <button type="button" class="btn btn-success" onclick='editTask.apply(this,arguments)' name="${id}"> 
            <i class="fas fa-pencil-alt"></i> </button>
            <button type="button" class="btn btn-danger" name="${id}" onclick='deleteTask.apply(this,arguments)'>
            <i class="fa-solid fa-trash"></i></button>
          </div>
          <div class="card-body">
            ${
              // url ? `<img width="100%" src="${url}" class="card-img-top md-3 rounded-lg">` : ''
              url
                     ? `<img width="100%" src="${url}" class="imag-fluid md-3 place_holder_img">`
                     : `<img width="100%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAAPFBMVEX///+rq6unp6fMzMykpKTp6enx8fHU1NS0tLS6urr6+vqwsLDHx8fPz8/w8PD19fXa2trh4eHl5eXAwMAzrysnAAADpklEQVR4nO2c2ZKDIBAAE6KJmsPr//91c69yKKREHav7dctl6YVhGJTdDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZqE5LMU1XbrvVupELUe9dO9t5PsFyZfuvY1FjWRL994GRnQeRs5NOj+rNpIVCzSMER2M6GBEByM6GNHBiI4cI+mhbdtLE12SFCO3XKnH36ryJnLDQoxU/xm2usZtWIaRWu1nUyLCSNnfh6moE0eEkYvqK4lavpBgpNA368ktYsMSjKSJbqSK2LAEI7VuRB0iNizBSGUYuURsWIIRc4zEXH8lGDkacSTm6YEEI7tMX2zKiA2LMFL185HAMJJWdcj2UIQRfZCEDJEyT5JkH7BcyzBSnrujJORY9r0BSPzXaxlGHv/pz5TJQoQUn4Mw5T1KhBi5x5LseUadnYJKRlcVPLLEGNkVt7qq0rASWtOZa7nno3KM/EB5/mGF2rSRvLdqe+Z1WzZy0Moq6ujz1IaNNJoQz1CyXSO9IPIeJD5ZyXaN6KXIJx6hZLNGKpuQ/Xl8A7BVI6nNx+MAbPTJjRopjAKCdyjZqJHWOmeeSsay+W0asQcRv1CySSM3t4/7IGmHH96ikW8JwKHkNPj0Fo3o2bvBYCiRayRt84u1a/WYkOHfK9bISam92lvW0qOZvRvzZqgwINXI+5zP0rd8dIgMHxwLNdI4+zYaRF643y6QaaT4nxlaxtXo538O3LJlGmk7fetlXKW9/ybuUCLSSC8l7WZchTt7N5S4QolEI1pK2sm4Tt5C7mPLEUoEGjH3tZ++OUoAjkHiKAwINGIWx86vHxTjmUhPib0wIM+IZV/7DpOhn/bZjyvEGbHOjGffQoLIG1thQJoRV3HsFhZEXqjWolyaEUdKqvLyl89hbYUBYUbcKWlYVP1i7p5lGfFOSb05G9JlGfHZ14ZhZiWijFwnF2IJJZKM1NP7eKCFEkFGLEfbk5D1sxJBRvz3tWFohQE5Rk6etaAflPQKA2KMpJFGyJNuYUCKkdJ1tD0JXfVSjFjfj5mMbigRYmToaHsSJf+FARlGftjXhvJ9j1GEEef7MdOhvu8xijASN4i8lXy+dJNgxPhOLw7vL80FGDnO4uN7FCbAyGx3xb0KA+s3cpntysnkGUpWb6Q8zcjjP7B6I7ODEZ1VGznfjrNzW7WRfbIA6zayFBjRWeWtxhU3X+vUi92Ofoh9CR0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMA2+AN7/TZH3Ls1kQAAAABJRU5ErkJggg==" class="imag-fluid md-3 place_holder_img">`
            }
            <h4 class="card-title card_title">${title}</h4>
            <p class="description trim-3-lines">${description}</p>
            <div class="tags">
              <span class="badge bg-primary m-1">${type}</span>
            </div>
          </div>
          <div class="card-footer">
            <button type='button' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showTask" onclick='openTask.apply(this,arguments)' id=${id}>Open Task</button>
          </div>
        </div>
      </div>
    `


//Modal when on >> click
//Generates the HTML for displaying detailed task info.
const htmlModalContent = ({id,title,description,url}) => {
        const date = new Date(parseInt(id));

        return `
            <div id=${id}>
                 ${
                    url
                     ? `<img width="100%" src="${url}" class="imag-fluid md-3 place_holder_img">`
                     : `<img width="100%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAAPFBMVEX///+rq6unp6fMzMykpKTp6enx8fHU1NS0tLS6urr6+vqwsLDHx8fPz8/w8PD19fXa2trh4eHl5eXAwMAzrysnAAADpklEQVR4nO2c2ZKDIBAAE6KJmsPr//91c69yKKREHav7dctl6YVhGJTdDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZqE5LMU1XbrvVupELUe9dO9t5PsFyZfuvY1FjWRL994GRnQeRs5NOj+rNpIVCzSMER2M6GBEByM6GNHBiI4cI+mhbdtLE12SFCO3XKnH36ryJnLDQoxU/xm2usZtWIaRWu1nUyLCSNnfh6moE0eEkYvqK4lavpBgpNA368ktYsMSjKSJbqSK2LAEI7VuRB0iNizBSGUYuURsWIIRc4zEXH8lGDkacSTm6YEEI7tMX2zKiA2LMFL185HAMJJWdcj2UIQRfZCEDJEyT5JkH7BcyzBSnrujJORY9r0BSPzXaxlGHv/pz5TJQoQUn4Mw5T1KhBi5x5LseUadnYJKRlcVPLLEGNkVt7qq0rASWtOZa7nno3KM/EB5/mGF2rSRvLdqe+Z1WzZy0Moq6ujz1IaNNJoQz1CyXSO9IPIeJD5ZyXaN6KXIJx6hZLNGKpuQ/Xl8A7BVI6nNx+MAbPTJjRopjAKCdyjZqJHWOmeeSsay+W0asQcRv1CySSM3t4/7IGmHH96ikW8JwKHkNPj0Fo3o2bvBYCiRayRt84u1a/WYkOHfK9bISam92lvW0qOZvRvzZqgwINXI+5zP0rd8dIgMHxwLNdI4+zYaRF643y6QaaT4nxlaxtXo538O3LJlGmk7fetlXKW9/ybuUCLSSC8l7WZchTt7N5S4QolEI1pK2sm4Tt5C7mPLEUoEGjH3tZ++OUoAjkHiKAwINGIWx86vHxTjmUhPib0wIM+IZV/7DpOhn/bZjyvEGbHOjGffQoLIG1thQJoRV3HsFhZEXqjWolyaEUdKqvLyl89hbYUBYUbcKWlYVP1i7p5lGfFOSb05G9JlGfHZ14ZhZiWijFwnF2IJJZKM1NP7eKCFEkFGLEfbk5D1sxJBRvz3tWFohQE5Rk6etaAflPQKA2KMpJFGyJNuYUCKkdJ1tD0JXfVSjFjfj5mMbigRYmToaHsSJf+FARlGftjXhvJ9j1GEEef7MdOhvu8xijASN4i8lXy+dJNgxPhOLw7vL80FGDnO4uN7FCbAyGx3xb0KA+s3cpntysnkGUpWb6Q8zcjjP7B6I7ODEZ1VGznfjrNzW7WRfbIA6zayFBjRWeWtxhU3X+vUi92Ofoh9CR0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMA2+AN7/TZH3Ls1kQAAAABJRU5ErkJggg==" class="imag-fluid md-3 place_holder_img">`
                  }
            </div>
            <strong class="text-muted text-sm">Created On: ${date.toDateString()}</strong>
            <h2 class="mb-3">${title}</h2>
            <p class="text-muted">${description}</p>
        `

}

//where we convert json to str (i.e for local storage);
//stores in browers's localstorage under the key  "tasky".
const updateLocalStorage = () => {
  localStorage.setItem(
    "task",
    JSON.stringify({
      tasks: state.taskList,
    })
  );
};

//where we convert str to json (i.e  for rendering cards on the screen);
//This function retrives task data from localstorage, parses into object,& tehn renders the saved tasks on the page.
//If there is no data in localstorage,it doesn' render anything.
const loadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.task);

  if (localStorageCopy) state.taskList = localStorageCopy.tasks;

  state.taskList.map((cardDate) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
  });
};

//Handles form submission.
const handleSubmit = () => {
  const id = `${Date.now()}`;
  const input = {
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("tags").value,
    description: document.getElementById("taskDescription").value,
  };

  if (!input.title || !input.type || !input.description) {
    return alert("Please fill all the necessary fields :-)");
  }

  taskContents.insertAdjacentHTML("beforeend", htmlTaskContent({ ...input, id }));
  state.taskList.push({ ...input, id });
  
  updateLocalStorage();

  // Clear the form inputs after submission
  // document.getElementById("imageUrl").value = '';
  // document.getElementById("taskTitle").value = '';
  // document.getElementById("tags").value = '';
  // document.getElementById("taskDescription").value = '';
};

//Open task
// const openTask = (e) => {
//   if(!e) e = window.event;

//   const getTask = state.taskList.find(({id}) => id === e.target.id);
//   taskModal.innerHTML = htmlModalContent(getTask);
// };
const openTask = (e) => {
  if (!e) e = window.event;

  const getTask = state.taskList.find(({ id }) => id === e.target.id);
  taskModal.innerHTML = htmlModalContent(getTask);
};


//Delete Task
const deleteTask = (e) => {
  if(!e) e = window.event

  const targetId = e.target.getAttribute("name");
  //console.log(targetId);
  console.log("Target ID for deletion:", targetId);
  console.log("Current Task IDs:", state.taskList.map(task => task.id));
  const type  = e.target.tagName;
  //console.log(type);
  const previousLength = state.taskList.length;
  console.log(previousLength);
  state.taskList = state.taskList.filter(task => task.id !== targetId);
  const newLength = state.taskList.length;
  console.log(newLength);
  updateLocalStorage();

  if(type === "BUTTON"){
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
  }else  if(type === "I"){
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode.parentNode
    );
  }

  
  
};
//Edit Task

const editTask = (e) => {
  if(!e) e = window.event;

  const targetId = e.target.id;
  const type = e.target.tagName;

  // console.log(targetId);
  // console.log(type);

  let parentNode;
  let taskTitle;
  let taskDescription;
  let taskType;
  let submitButton;

  if(type === "BUTTON")
  {
    parentNode = e.target.parentNode.parentNode;
  }
  else{
    parentNode = e.target.parentNode.parentNode.parentNode;
  }

  taskTitle = parentNode.childNodes[3];
  //console.log(taskTitle);

  taskTitle = parentNode.childNodes[3].childNodes[3];
  taskDescription = parentNode.childNodes[3].childNodes[5];
  taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
  submitButton = parentNode.childNodes[5].childNodes[1];
  //console.log(submitButton);
  //console.log(taskTitle,taskDescription,taskType);

  taskTitle.setAttribute("contenteditable","true");
  taskDescription.setAttribute("contenteditable","true");
  taskType.setAttribute("contenteditable","true");


  submitButton.removeAttribute("data-bs-toggle");
  submitButton.removeAttribute("data-bs-target");
  submitButton.innerHTML = "Save Changes";
  submitButton.setAttribute("onclick","saveEdit.apply(this,arguments)");
}
//Save Task
const saveEdit = (e) =>{
  if(!e) e = window.event;

  const targetId = e.target.id;
  const parentNode = e.target.parentNode.parentNode;
  //console.log(parentNode.childNodes[3]);

  taskTitle = parentNode.childNodes[3].childNodes[3];
  taskDescription = parentNode.childNodes[3].childNodes[5];
  taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
  submitButton = parentNode.childNodes[5].childNodes[1]; 

  const updateData = {
    taskTitle : taskTitle.innerHTML,
    taskDescription : taskDescription.innerHTML,
    taskType : taskType.innerHTML,
  };

  let stateCopy = state.taskList;

  stateCopy = stateCopy.map((task) => 
    task.id === targetId 
        ? { 
          id : task.id,
          title : updateData.taskTitle,
          description : updateData.taskDescription,
          type : updateData.taskType,
          url : task.url, 
        } : task
  );
  state.taskList = stateCopy;
  updateLocalStorage();

  taskTitle.setAttribute("contenteditable","false");
  taskDescription.setAttribute("contenteditable","false");
  taskType.setAttribute("contenteditable","false");

  submitButton.setAttribute("onclick","openTask.apply(this,arguments)");
  submitButton.setAttribute("data-bs-toggle", "modal");
  submitButton.setAttribute("data-bs-target", "#showTask");
  submitButton.innerHTML = "Open Task";
  
 
 
};
//Search

const searchTask = (e) =>{
  if(!e) e = window.event;

  while(taskContents.firstChild){
    taskContents.removeChild(taskContents.firstChild);
  }

    const resultData = state.taskList.filter(({title}) => 
      title.toLowerCase().includes(e.target.value.toLowerCase())
    );

   // console.log(resultData);

    resultData.map((cardData) => 
      taskContents.insertAdjacentHTML("beforeend",htmlTaskContent(cardData))
    );
  

};





















//Load Initial Data


  // const TaskContainer=document.querySelector(".task_container");
  // console.log(TaskContainer);
  
  
  //How a card is stored in browser 
  
  // var state = {
  //   taskList : [
  //     {
  //       imageURL:"",
  //       taksTitle: "",
  //       taskType:"",
  //       taskDescription:" ",
  //     },
  //     {
  //       imageURL:"",
  //       taksTitle: "",
  //       taskType:"",
  //       taskDescription:" ",
  //     },
  //     {
  //       imageURL:"",
  //       taksTitle: "",
  //       taskType:"",
  //       taskDescription:" ",
  //     },
  //     {
  //       imageURL:"",
  //       taksTitle: "",
  //       taskType:"",
  //       taskDescription:" ",
  //     },
  //     {
  //       imageURL:"",
  //       taksTitle: "",
  //       taskType:"",
  //       taskDescription:" ",
  //     },
  //    ],
  //    BirthFeature:
  //     [
  //     ]
  // }
  
  // var BirthFeature:[
  
  // ]
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
// Spread Operator
/**
 const obj = {
    name: "Mahesh",
    age: 2
}


console.log(obj);
 {name: 'Mahesh', age: 2}

console.log({obj});
 {obj: {…}}obj: {name: 'Mahesh', age: 2}[[Prototype]]: Object

console.log({...obj});
 {name: 'Mahesh', age: 2}

//  appending or adding a new key into obj:
console.log({...obj, designation: "mentor"});
{name: 'Mahesh', age: 2, designation: 'mentor'}
 */

/**
 * 
//  updating key value using spread operator
const obj={
    name: "Mahesh"
}

console.log(obj)
 {name: 'Mahesh'}


console.log({...obj, age : 2});
 {name: 'Mahesh', age: 2}

console.log({...obj, age :4});
{name: 'Mahesh', age: 4}
 */

/* 
var date = new Date();
console.log(Date.now());

1677511569666
*/

  
  
  
  // const taskContainer=document.querySelector(".task_container");
  // console.log(taskContainer);
  // const saveChanges = () => {
  //     const taskSave = {
  //         //${xyz} --> is used when xyz is a dynamci property and we want to render when xyz is changed every time
  //         //Date.now() gives id for every save change ,id is unique value.
  //         //.values is used to get value of that key
  //         //for every dom parent is the document,getElementById is used to get id of the key
  //         id:`${Date.now()} `,
  //         imageUrl:document.getElementById("imageurl").value,
  //         taskTitle:document.getElementById("tasktitle").value,
  //         taskType:document.getElementById("tasktype").value,
  //         taskDescription:document.getElementById("taskdescription").value
  //     }
  //     const newCard = `
  //         <div class="col-sm-12 col-md-6 col-lg-4" id=${taskSave.id}>
  //           <div class="card">
  //             <div class="card-header d-flex justify-content-end gap-2">
  //               <button type="button" class="btn btn-success"> <i class="fas fa-pencil-alt"></i> </button>
  //               <button type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
  //             </div>
  //             <div class="card-body">
  //               <img src=${taskSave.imageUrl} class="img-fluid" alt="Horimiya">
  //               <h5 class="card-title mt-3 fw-bold text-primary">${taskSave.taskTitle}</h5>
  //               <p class="card-text">${taskSave.taskType}</p>
  //               <a href="#" class="btn btn-primary">${taskSave.taskDescription}</a>
  //             </div>
  //           </div>
  //         </div>
  //     `
  //     taskContainer.insertAdjacentHTML("beforeend",newCard);
  // };