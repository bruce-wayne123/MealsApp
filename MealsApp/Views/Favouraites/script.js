var favouraitesList = [];
var resultList = document.getElementById("resultList");
document.addEventListener('click', handleClickListener);

renderList();

//Adding meal to the favoraites list
function addMealToList(meal) {
    const li = document.createElement('li');
    li.innerHTML = `  
    <div style="display:flex;justify-content: space-around; align-items: center; 
                border: 1px solid black; border-radius: 5px; padding: 15px;margin-top: 10px;width: 900px;  border-radius: 25px;">
    <label style="font-size: 17px;width: 45%">${meal.strMeal}</label>
    <img src="${meal.strMealThumb}" style="height:10%;width: 10%;border-radius: 30%;"></img>
    <Button id=${meal.idMeal} class="btn btn-danger delete" >Delete</Button>
    <div>`;
    resultList.append(li);
}

//Adding click event listeners
function handleClickListener(e) {
    if (e.target.className === "btn btn-danger delete") {
        DeleteMeal(e.target.id);
        return;
    }
}

//Delete Meal
function DeleteMeal(mealId) {
    if (mealId > 0) {
        var filteredList = favouraitesList.filter(meal => meal.idMeal !== mealId);//Remove the meal
        localStorage.setItem('favList', JSON.stringify(filteredList));//Saving 
        renderList();
        alert("Meal Deleted");
    }
}

//Fetch the local storage list and refresh the list.
function renderList() {
    resultList.innerHTML = "";
    favouraitesList = JSON.parse(localStorage.getItem("favList"));
    if (favouraitesList.length > 0) {
        favouraitesList.forEach(element => {
            addMealToList(element);
        });
    }
}