const colors = [
  "#ef5777",
  "#575fcf",
  "#4bcffa",
  "#34e7e4",
  "#0be881",
  "#f53b57",
  "#3c40c6",
  "#0fbcf9",
  "#00d8d6",
  "#05c46b",
  "#ffc048",
  "#ffdd59",
  "#ff5e57",
  "#d2dae2",
  "#485460",
  "#ffa801",
  "#ffd32a",
  "#ff3f34"
];
const btn = document.querySelector("button");
//# 배경 변경
function handleClick() {
  const a = colors[Math.floor(Math.random() * colors.length)];
  const b = colors[Math.floor(Math.random() * colors.length)];
  if (a === b) {
    return handleClick();
  }
  document.body.style.background = `linear-gradient(to left, ${a}, ${b})`;
}
btn.addEventListener("click", changeImg);
window.addEventListener("resize", changeImg);


//# 시계 표시 
const clockTitle = document.querySelector(".js-clock");

function getClock() {
  const date = new Date();

  const hours = String(date.getHours()).padStart(2,"0");
  const minutes = String(date.getMinutes()).padStart(2,"0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  clockTitle.innerText = `${hours}: ${minutes}: ${seconds}`;
}

getClock();
setInterval(getClock, 1000);

//# 로그인
const loginBtn = document.querySelector('#login_btn');
const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const user = document.querySelector('#login_user');
const HIDDEN_CLASSNAME = 'hidden';
const USER_NAME_KEY = 'username';

function loginSubmit(e){
  e.preventDefault();
  const id = loginInput.value;
  loginForm.classList.add(HIDDEN_CLASSNAME);
  localStorage.setItem(USER_NAME_KEY, id);
  paintUserName(id);
}
loginForm.addEventListener('submit', loginSubmit);

function paintUserName(userName){
  user.innerText = "반갑습니다~ " + userName;
  user.classList.remove(HIDDEN_CLASSNAME);
}
const saveedUserName = localStorage.getItem(USER_NAME_KEY);

if(saveedUserName === null){
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener('submit', loginSubmit);
}else{
  paintUserName(saveedUserName);

}


//# todo list
const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

//toDos는 처음에 빈배열로 시작하고 요소가 쌓이면 업데이트 되어야 하므로 let으로 선언
let toDos = [];

//5. localStorage의 todos를 배열의 문자형으로 만들어줌
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

//4. X button을 누르면 삭제하는 함수
function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id)); //클릭한 li.id와 다른 toDo는 남겨두고 싶다
}

//3. input의 value를 표시하는 리스트 함수
//리스트 안에 텍스트, 삭제버튼 포함
function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span); 
  li.appendChild(button); 
  toDoList.appendChild(li); 
}

//2. submit할때 동작하는 함수
function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value; 
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos(); 
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) { 
  const parsedToDos = JSON.parse(savedToDos); 
  toDos = parsedToDos; 
  parsedToDos.forEach(paintToDo); 
}


//# Weather
const API_KEY = "918256ce88f9af60e07d6fdf59921c9f"

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  fetch(url).then(response => response.json()).then(data => {
    const weather = document.querySelector("#weather span:first-child")
    weatherIcon.src = `img/weather/${weatherIconCode}.png`;
    const city = document.querySelector("#weather span:last-child")
    city.innerText = data.name;
    weather.innerText = `${data.weather[0].main} / ${data.main.temp}`
  })
}

function onGeoError() {
  alert("Can't find you. No weather for you.")
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)

//#백그라운드 이미지 변경
const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
];

changeImg()

function changeImg(){
  const choseImage = images[Math.floor(Math.random() * images.length)];
  const bgImage = document.createElement("img"); //이미지 태그 만들어서
  bgImage.src = `img/${choseImage}`; //이미지 경로 불러와서
  document.body.appendChild(bgImage); //body의 맨뒤에 붙인다
}
