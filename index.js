
const notesList = document.querySelector('.notes_list');
const noteDescriptionContainer = document.querySelector('.notes_description_container');
const addNote = document.querySelector('.notes_add_notes_btn');
const modalContainer = document.querySelector('.add_note_modal_container');
const modalBtnClose = document.querySelector('.modal_btn_close');
const submitBtn = document.querySelector('.modal_btn_submit');
const closeBtn = document.querySelector('.modal_btn_close');

const notesData = JSON.parse(localStorage.notes);

let noteIdForEdit = '';

function uniqueNumber() {

  var date = Date.now();
 
  if (date <= uniqueNumber.previous) {
      date = ++uniqueNumber.previous;
  } else {
      uniqueNumber.previous = date;
  }

  return date;
}

const addClickOnNote = (e, id) => {
  notesData.forEach((note) =>{
    note.active = false;
  });
  const noteWhichClicked = notesData.find((note) => note.id === id);
  noteWhichClicked.active = true;
  localStorage.notes = JSON.stringify(notesData);

  generateNotes();
  noteDescriptionContainer.innerHTML = "";
  addDescriptionForActiveNote();
}

const editNote = function(e, id){
  e.stopPropagation();
  noteIdForEdit = id;
  modalContainer.style.display = 'flex';
  const noteToEdit = notesData.find((note) => note.id === noteIdForEdit);
  document.querySelector('.note_heading_input').value =  noteToEdit.heading;
  document.querySelector('.note_heading_textarea').value = noteToEdit.description;
}

const generateNotes = () => {
  notesList.innerHTML = ""
  notesData.forEach(({heading, description, active, id}) => {
    const note = document.createElement('li');
    note.classList.add('notes_item');
    if(active){
      note.classList.add('notes_item--active');
    }
    //notes_item_heading
    const notesItemHeading = document.createElement('h4');
    notesItemHeading.classList.add('notes_item_heading');
    const headingTextNode = document.createTextNode(heading);
    notesItemHeading.appendChild(headingTextNode);

    const editIcon = document.createElement('i');
    editIcon.classList.add('fas');
    editIcon.classList.add('fa-edit');
    editIcon.classList.add('edit-icon');
    notesItemHeading.appendChild(editIcon);

    //notes_item_description
    const notesItemDescription = document.createElement('div');
    notesItemDescription.classList.add('notes_item_description');
    const descriptionTextNode = document.createTextNode(description);
    notesItemDescription.appendChild(descriptionTextNode);
  
    note.appendChild(notesItemHeading);
    note.appendChild(notesItemDescription);
    
    note.addEventListener('click', (e) => {addClickOnNote(e,id)});
    editIcon.addEventListener('click', (e) => {editNote(e, id)});
    notesList.appendChild(note);
  })
}

const addDescriptionForActiveNote = () => {
  noteDescriptionContainer.innerHTML = '';
  const activeNote = notesData.find((note) => note.active);

  const notesItemHeading = document.createElement('h2');
  const headingTextNode = document.createTextNode(activeNote.heading);
  notesItemHeading.appendChild(headingTextNode);

  const descriptionPara = document.createElement('p');
  const descriptionTextNode = document.createTextNode(' '+ activeNote.description);
  descriptionPara.appendChild(descriptionTextNode);

  noteDescriptionContainer.appendChild(notesItemHeading);
  noteDescriptionContainer.appendChild(descriptionPara);
}

window.onload = () =>{
  generateNotes();
  addDescriptionForActiveNote();
}

const hideModalContainer = () => {
  modalContainer.style.display = 'none';
  document.querySelector('.heading-error').style.display = 'none';
  document.querySelector('.description-error').style.display = 'none';
  document.querySelector('.note_heading_input').value = '';
  document.querySelector('.note_heading_textarea').value = '';
}

addNote.addEventListener('click', () => {
  modalContainer.style.display = 'flex';
});

modalBtnClose.addEventListener('click', () => {
  hideModalContainer();
})

submitBtn.addEventListener('click', () => {
  const headingText = document.querySelector('.note_heading_input').value;
  const descriptionText = document.querySelector('.note_heading_textarea').value;

  if(!headingText){
    document.querySelector('.heading-error').style.display = 'block';
  }
  if(!descriptionText){
    document.querySelector('.description-error').style.display = 'block';
  }

  if(headingText && descriptionText) {

    notesData.forEach((note) => {
      note.active = false;
    });

    if(!noteIdForEdit){
      const noteObj = {
        heading: headingText,
        description: descriptionText,
        active: true,
        id:uniqueNumber().toString(),
      }
  
      notesData.push(noteObj);
    } else {
      const noteToEdit = notesData.find((note) => note.id === noteIdForEdit);
      noteToEdit.heading = headingText;
      noteToEdit.description = descriptionText;
      noteToEdit.active = true;
    }  

    localStorage.setItem('notes', JSON.stringify(notesData));
    generateNotes();
    addDescriptionForActiveNote();
    hideModalContainer();
  }
})