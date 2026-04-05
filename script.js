const form = document.getElementById("expenseForm");

if (form) {

form.addEventListener("submit", function(event){

event.preventDefault();

console.log("Form Submitted");

const name = document.getElementById("name").value;
const amount = document.getElementById("amount").value;
const category = document.getElementById("category").value;
const date = document.getElementById("date").value;

const expense = {
name: name,
amount: amount,
category: category,
date: date
};

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

expenses.push(expense);

localStorage.setItem("expenses", JSON.stringify(expenses));

alert("Expense Added");

form.reset();

});

}


const table = document.getElementById("expenseTable");

if (table) {

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

expenses.forEach(function(expense , index){

const row = document.createElement("tr");

row.innerHTML = `
<td>${expense.name}</td>
<td>${expense.amount}</td>
<td>${expense.category}</td>
<td>${expense.date}</td>
<td><button class="delete-btn">Delete</button></td>
`;

table.appendChild(row);

/* DELETE BUTTON CODE */
const deleteBtn = row.querySelector(".delete-btn");

deleteBtn.addEventListener("click", function(){

row.remove();

expenses.splice(index, 1);

localStorage.setItem("expenses", JSON.stringify(expenses));

});

});

}

const chartCanvas = document.getElementById("expenseChart");

if(chartCanvas){

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let food = 0;
let travel = 0;
let shopping = 0;
let bills = 0;

expenses.forEach(function(expense){

if(expense.category === "Food"){
food += Number(expense.amount);
}

else if(expense.category === "Travel"){
travel += Number(expense.amount);
}

else if(expense.category === "Shopping"){
shopping += Number(expense.amount);
}

else if(expense.category === "Bills"){
bills += Number(expense.amount);
}

});

new Chart(chartCanvas, {
type: "pie",
data: {
labels: ["Food", "Travel", "Shopping", "Bills"],
datasets: [{
data: [food, travel, shopping, bills]
}]
}
});

}

const searchInput = document.getElementById("searchExpense");

if(searchInput){

searchInput.addEventListener("keyup", function(){

const value = searchInput.value.toLowerCase();

const rows = document.querySelectorAll("#expenseTable tr");

rows.forEach(function(row){

const text = row.textContent.toLowerCase();

if(text.includes(value)){
row.style.display = "";
}else{
row.style.display = "none";
}

});

});

}

const filterDate = document.getElementById("filterDate");

if(filterDate){

filterDate.addEventListener("change", function(){

const selectedDate = filterDate.value;

const rows = document.querySelectorAll("#expenseTable tr");

rows.forEach(function(row){

const dateCell = row.children[3].textContent;

if(selectedDate === "" || dateCell === selectedDate){
row.style.display = "";
}else{
row.style.display = "none";
}

});

});

}

const monthlyCanvas = document.getElementById("monthlyChart");

if(monthlyCanvas){

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let monthlyData = {
Jan:0,
Feb:0,
Mar:0,
Apr:0,
May:0,
Jun:0,
Jul:0,
Aug:0,
Sep:0,
Oct:0,
Nov:0,
Dec:0
};

expenses.forEach(function(expense){

let month = new Date(expense.date).getMonth();

if(month === 0) monthlyData.Jan += Number(expense.amount);
if(month === 1) monthlyData.Feb += Number(expense.amount);
if(month === 2) monthlyData.Mar += Number(expense.amount);
if(month === 3) monthlyData.Apr += Number(expense.amount);
if(month === 4) monthlyData.May += Number(expense.amount);
if(month === 5) monthlyData.Jun += Number(expense.amount);
if(month === 6) monthlyData.Jul += Number(expense.amount);
if(month === 7) monthlyData.Aug += Number(expense.amount);
if(month === 8) monthlyData.Sep += Number(expense.amount);
if(month === 9) monthlyData.Oct += Number(expense.amount);
if(month === 10) monthlyData.Nov += Number(expense.amount);
if(month === 11) monthlyData.Dec += Number(expense.amount);

});

new Chart(monthlyCanvas,{
type:"line",
data:{
labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
datasets:[{
label:"Monthly Expense",
data:Object.values(monthlyData),
borderWidth:3,
fill:false
}]
}
});

}

// LocalStorage se expenses lo
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let total = 0;

expenses.forEach(function(exp){
    total = total + Number(exp.amount);
});

// Dashboard par show karo
document.getElementById("totalExpense").innerText = "₹ " + total;

function saveBudget(){

let budget = document.getElementById("budgetInput").value;

localStorage.setItem("monthlyBudget", budget);

document.getElementById("monthlyBudget").innerText = "₹ " + budget;

}

let savedBudget = localStorage.getItem("monthlyBudget");

if(savedBudget){

document.getElementById("monthlyBudget").innerText = "₹ " + savedBudget;

}


function saveIncome(){

let income = document.getElementById("incomeInput").value;

localStorage.setItem("totalIncome", income);

document.getElementById("totalIncome").innerText = "₹ " + income;

}

//reamin balance

function updateRemainingBalance(){

let income = localStorage.getItem("totalIncome") || 0;

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let totalExpense = 0;

expenses.forEach(function(exp){
    totalExpense += Number(exp.amount);
});

let balance = income - totalExpense;

let balanceElement = document.getElementById("remainingBalance");

if(balanceElement){
    balanceElement.innerText = "₹ " + balance;
}

}
updateRemainingBalance();

function saveIncome(){

let income = document.getElementById("incomeInput").value;

localStorage.setItem("totalIncome", income);

document.getElementById("totalIncome").innerText = "₹ " + income;

updateRemainingBalance();

}

//progress 

function updateBudgetProgress(){

let budget = localStorage.getItem("monthlyBudget") || 0;

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let totalExpense = 0;

expenses.forEach(function(exp){

totalExpense = totalExpense + Number(exp.amount);

});

let percent = 0;

if(budget > 0){

percent = (totalExpense / budget) * 100;

}

if(percent > 100){
percent = 100;
}

let progressBar = document.getElementById("budgetProgress");

let percentText = document.getElementById("budgetPercent");

if(progressBar){

progressBar.style.width = percent + "%";

percentText.innerText = Math.round(percent) + "%";

}

}

window.onload = function(){

updateBalance();

updateBudgetProgress();

}

localStorage.setItem("expenses", JSON.stringify(expenses));
updateBudgetProgress();

// csv file 

function downloadCSV(){

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let csv = "Name,Amount,Date\n";

expenses.forEach(function(exp){

csv += exp.name + "," + exp.amount + "," + exp.date + "\n";

});

let blob = new Blob([csv], { type: "text/csv" });

let url = URL.createObjectURL(blob);

let a = document.createElement("a");

a.href = url;

a.download = "expenses-report.csv";

a.click();

}

function toggleDarkMode(){

document.body.classList.toggle("dark-mode");

}