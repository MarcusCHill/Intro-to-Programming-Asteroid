/*
Created a paragraph element and assigned inner HTML as small copyright info text
Placed created paragraph at the specified footer loaction
*/
let today = new Date();
let thisYear = today.getFullYear();
let footer = document.querySelector("footer ul");
let copyright = document.createElement("li");
copyright.classList.add("copyright")
copyright.innerHTML = `<small> &copy; Marcus Hill ${thisYear} </small>`
footer.insertBefore(copyright, footer.firstChild)

/*
Created an array of skills
Located where I want my list of skills to be by using desendant selector (#skills ul)
Using a for of loop I add each element of my skills array within a newly created list element
Added each list element with array value into the skills list
*/
let skills = ["HTML", "CSS", "Javascript"];
let skillsList = document.querySelector("#skills ul");
for (let skill of skills) {
  let newSkill = document.createElement("li");
  newSkill.textContent = skill;
  skillsList.append(newSkill);
}

//vairiables will be used in the next few functions
const messageSection = document.getElementById("messages")
const messageList = document.querySelector("#messages ul");

/*
Create a function that will check the number of messages in the message list and Hide the messages section if there are no messages to list
*/
let hideMessages = () => {
  if (messageList.children.length === 0){
    messageSection.style.display = "none"
  } else {
    messageSection.style.display = "block"
  }
}
hideMessages();

/*
Creating a message form that takes user input and returns it into the messages section as a list element
Remove button added to each list element giving ability to remove that list element
Edit button provides the user with an input field holing the text content within the span element of the list element.
The user can change the input field and press save to return a list itemp with different span content
*/
const messageForm = document.getElementsByName("leave_message")[0];
messageForm.addEventListener("submit", (e) => {
  //Does not refresh the page and keeps data within local file
  e.preventDefault();
  //create message template and put it within a list element
  let nameVal = e.target.name.value
  let emailVal = e.target.email.value
  let messageVal = e.target.message.value
  const newMessage = document.createElement("li");
  newMessage.innerHTML = `<span>Message: </span><span id = first>${messageVal}</span><span id = dashSpan> - </span><a href="mailto:${emailVal}">${nameVal}</a>`
  //Here is my remove button
  const removeButton = document.createElement("button")
  removeButton.textContent = "Remove"
  removeButton.type = "button"
  removeButton.classList.add("remove")
  removeButton.addEventListener("click", (e) => {
    let entry = e.target.parentNode
    newMessage.remove(entry);
    hideMessages();
  })
  //Here is my edit button
  const editButton = document.createElement("button")
  editButton.textContent = "Edit"
  editButton.type = "button"
  editButton.classList.add("edit")
  editButton.addEventListener("click", (e) => {
    if (editButton.textContent === "Edit"){
      editButton.textContent = "save"
      li = e.target.parentNode
      span = document.querySelector("#messages #first")
      spanText = document.getElementById("first").textContent
      input = document.createElement("input")
      input.type = "text"
      input.id = "new"
      input.value = spanText
      li.insertBefore(input, span)
      span.remove()
      newMessage.insertBefore(editButton, removeButton);
      messageList.appendChild(newMessage);
    }
    else if (editButton.textContent === "save"){
      editButton.textContent = "Edit"
      li = e.target.parentNode
      oldInput = document.querySelector("#messages #new")
      dash = document.querySelector("#messages #dashSpan")
      span = document.createElement("span")
      span.id = "first"
      span.textContent = input.value
      //If user saves with a blank input field it will remove the message
      //If user saves with a value in the input field it will update the message
      if(span.textContent !== ""){
        li.insertBefore(span, dash)
        oldInput.remove()
        newMessage.appendChild(removeButton);
        newMessage.insertBefore(editButton, removeButton);
      } else {
        newMessage.remove(li);
        hideMessages();
      }
    }
  })
  //Create the message list with the new message!
  //hideMessages function is ran to display the message list after user submits a message
  newMessage.appendChild(removeButton);
  newMessage.insertBefore(editButton, removeButton);
  messageList.appendChild(newMessage);
  hideMessages();
  messageForm.reset();
})

/*
Allows navigation bar to change css class at a certain user scroll position
*/
const navbar = document.querySelector(".navigation");
const imageSection = document.getElementById("imageSection");
//Navigation bar class is based on user scroll position in reference to image height
window.addEventListener("scroll", (e) => {
  let imagePosition = imageSection.getBoundingClientRect().height;
  let navbarPosition = navbar.getBoundingClientRect().height;
  let displayNav = imagePosition - navbarPosition;
  if(window.scrollY > displayNav){
    //Show navigation background color and display photo and author name
    navbar.classList.remove("navOne");
    navbar.classList.add("navTwo");
  } else {
    //Navigation background is transparent and display of photo and author name is set to none
    navbar.classList.remove("navTwo");
    navbar.classList.add("navOne");
  }
})

/*
Light theme or Dark them button
*/
const theme = document.getElementById("lightDark");
const body = document.getElementById("content");
const headingTwo = document.getElementsByTagName("h2");
const navContent = document.querySelectorAll("nav li");
const navClass = Array.from(navbar.classList);
let navLink = (i) =>  navContent[i].firstChild;
let navSvg = navContent[6].children[0].children[0];
let clickCount = 0;
theme.addEventListener("click", (e) =>{
  //count the number of clicks
  clickCount ++;
  //First/odd click runs ELSE second/even click runs IF
  if(clickCount/2 === parseInt(clickCount/2)){

    //Make body background white and text color black
    body.classList.remove("dark", "white");
    body.classList.add("light", "black");

    //Ignoring the first h2 make all h2s black
    for (i = 1; i < headingTwo.length; i++){
      headingTwo[i].classList.remove("white");
      headingTwo[i].classList.add("black");
    }

    //Make navigation bar background white
    navbar.classList.remove("dark");
    navbar.classList.add("light");

    //Ignoring the first navigation list element make all navigation list elements white
    for (i = 1; i < 6; i++){
      navLink(i).classList.remove("whiteNav");
      navLink(i).classList.add("blackNav");
    }

    //Make the sun SVG black
    navSvg.classList.remove("whiteNav");
    navSvg.classList.add("blackNav");

  } else {

    //Make body background black and text color white
    body.classList.remove("light", "black");
    body.classList.add("dark", "white");

    //Ignoring the first h2 make all h2s white
    for (i = 1; i < headingTwo.length; i++){
      headingTwo[i].classList.remove("black");
      headingTwo[i].classList.add("white");
    }

    //Make navigation bar background black
    navbar.classList.remove("light");
    navbar.classList.add("dark");

    //Ignoring the first navigation list element make all navigation list elements white
    for (i = 1; i < 6; i++){
      navLink(i).classList.remove("blackNav");
      navLink(i).classList.add("whiteNav");
    }

    //Make the sun SVG white
    navSvg.classList.remove("blackNav");
    navSvg.classList.add("whiteNav");
  }
})
