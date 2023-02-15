var meals = [];
var favMeals =[];
var getStorageList= JSON.parse(localStorage.getItem("favList"));
if (getStorageList!=null) {
    favMeals=getStorageList;
}
var searchResultList = document.getElementById("resultList");
var searchBox = document.getElementById("searchBox");
var countLabel = document.getElementById("mealsCountLabel");
var noResultsLabel = document.getElementById("noResultsFound");
var myFavLink = document.getElementById("linkMyFav");
searchBox.addEventListener('keyup', searchMeals);
searchBox.focus();

AddEventListeners();

//Search meals from API and add it into search results list.
async function searchMeals(e) {
    var meal = e.target.value;
    if (!meal || meal.startsWith(' ')) {
        meals = [];
        searchResultList.innerHTML = '';
        countLabel.innerHTML = `Total meals : 0`;
        return;
    }
    try {
        var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal;
        var mealResult = await fetch(url);
        if (mealResult != null) {
            var jsonResult = await mealResult.json();
            searchResultList.innerHTML = '';
            meals = [];
            meals = jsonResult.meals;
            if (meals == null || meals.length <= 0) {
                countLabel.innerHTML = `No results found :(`;
                searchResultList.innerHTML = '';
                meals = [];
                return;
            }
            countLabel.innerHTML = `Total meals : ${jsonResult.meals.length}`;
            jsonResult.meals.forEach(element => {
                addMealToList(element);
            });
        }
        else {
            meals = [];
            searchResultList.innerHTML = '';
            countLabel.innerHTML = `Total meals : 0`;
        }
    } catch (error) {
        alert("Oops.Something went wrong");
        meals = [];
        searchResultList.innerHTML = '';
        countLabel.innerHTML = `Total meals : 0`;
    }
}

//Add meal into search results list.
function addMealToList(meal) {
    const li = document.createElement('li');
    li.innerHTML = `  
    <div style="display:flex;justify-content: space-around; align-items: center; 
                border: 1px solid black; border-radius: 5px; padding: 15px;margin-top: 10px;width: 900px;  border-radius: 25px;">
    <a id=${meal.idMeal} class="mealsLabel"  style="font-size: 17px;width: 45%" text-decoration:none;>${meal.strMeal}</a>
    <img id=${meal.idMeal} class="mealsImage"  src="${meal.strMealThumb}" style="height:10%;width: 10%;border-radius: 30%;"></img>
    <button id=${meal.idMeal} class="btn btn-primary addToFav" ">Add to Favourites</button>
    <div>`;
    searchResultList.append(li);
}

function AddEventListeners() {
    document.addEventListener('click', handleClickListener);
}

//Adding click event listeners
function handleClickListener(e) {
    if (e.target.className === "btn btn-primary addToFav") {
        AddtoFavoraites(e.target.id);
        return;
    }
    if (e.target.className === "mealsLabel" || e.target.className === "mealsImage") {
        GoToMealsDetails(e.target.id);
    }
}

function AddtoFavoraites(mealId) {
    let favMeal = meals.find(element => element.idMeal === mealId);
    favMeals.push(favMeal);
    alert(`${favMeal.strMeal} added to Favoraites :)`);
}

//Navigate to favouraites meals page 
function GoToFavouraites() {
    searchResultList.innerHTML = '';
    searchBox.value = '';
    console.log(favMeals);
    localStorage.setItem('favList', JSON.stringify(favMeals));//Saving the favouraite meals in local storage
    location.href = "/Views/Favouraites/FavouraitesPage.html";
}

//Navigate to Meals details page 
function GoToMealsDetails(mealId) {
    searchResultList.innerHTML = '';
    searchBox.value = '';
    location.href = "/Views/MealsDetails/mealDetailsPage.html";
    sessionStorage.setItem('mealId', mealId);
}
