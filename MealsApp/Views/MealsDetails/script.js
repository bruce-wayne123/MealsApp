var mealNameLabel = document.getElementById('mealnameLabel');
var mealsImageView=document.getElementById('mealnameLabel');
var mealsInstructions=document.getElementById('mealsInstructions');
GetMealDetail();

async function GetMealDetail() {
    var mealId = sessionStorage.getItem('mealId', mealId);
    try {
        var url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId;
        var mealResult = await fetch(url);
        if (mealResult != null) {
            var jsonResult = await mealResult.json();
            var meal = jsonResult.meals[0];
            bindDetails(meal);
        }
    } catch (error) {
        console.log(error);
    }
}

function bindDetails(meal) {
    mealNameLabel.innerText=meal.strMeal;
    mealImage.src=meal.strMealThumb;
    mealsInstructions.innerHTML=meal.strInstructions;
}