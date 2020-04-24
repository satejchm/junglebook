didn = 0;
//function to display bars when the screen resolution is a certain width
function init() {
  let navOpen = false;

  $(".bars").click(function (e) {
    if (navOpen) {
      $("nav").css("display", "none");
      navOpen = false;
    } else {
      $("nav").css("display", "flex");
      navOpen = true;
    }
  });
}

function initNav() {
  //adds the nav links to the page
  navHome();
  navBrowse();
  navCreateRecipe();
  navLogin();
}

//when you select home navigation leads back to home page
function navHome() {
  $("#home").click(function (e) {
    $(".content").html(JUNGLE_SERVICE.homeContent());
  });
}

//when you select browse navigation leads you to browse page with avialable recipes
function navBrowse() {
  $("#browse").click(function (e) {
    $(".content").html(JUNGLE_SERVICE.browseContent());
    JUNGLE_SERVICE.getData(displayData);
  });
}

//when you select create recipe link leads you to a form to create a recipe
function navCreateRecipe() {
  $("#create-recipe").click(function (e) {
    $(".content").html(JUNGLE_SERVICE.createRecipeContent());
    createRecipe();
  });
}

//when you select login link leads you to a form to create a user login or account
function navLogin() {
  $("#login").click(function (e) {
    $(".content").html(JUNGLE_SERVICE.createLoginContent());
  });
}

//data for each recipe grabbed from the database
function displayData(addData) {
  console.log(addData);
  var container = `<div><span class='header-holder'><h1>Recipes: Try some today!</h1></span>`;
  var idnumber = 0;
  addData.forEach(function (doc) {
    var id = doc.id;
    var rawData = doc.data();
    container += `<div class='recipe-list-holder'>
    <div class='recipe'> <div id="${idnumber}" class='recipe-image'
        background-image: 
        url(${rawData.recipeImage})"><div id="${idnumber}" class='recipe-button'><a href='#'>View</a></div></div><div class='recipe-info'><h2 id="${id}">${rawData.recipeName}</h2><p class="recipeDescription" id="${id}">${rawData.recipeDescription}</p><div class='time-serv'><img src='../images/time.svg' alt='time image' style='width: 23px; height: 24px;'><h3 id="${id}">${rawData.recipeTime}</h3></div><div class='time-serv serv'><img src='../images/servings.svg' alt='time image' style='width: 23px; height: 24px;'><p class="rSize" id="${id}"> ${rawData.recipeServing}</p></div></div></div></div></div>`;
    idnumber += 1;
  });
  container += "</div>";
  $(".browse").html(container);
  viewRecipeButton();
}

//function to create recipe and adding recipe data to database
function createRecipe() {
  $(".create-recipe-button").click(function (e) {
    console.log("clicked");
    // e.preventDefault();
    let recipeImage = $("#recipeImage").val();
    let recipeName = $("#recipeName").val();
    let recipeDescription = $("#recipeDescription").val();
    let recipeTime = $("#recipeTime").val();
    let recipeServing = $("#recipeServing").val();
    let recipeIngredient = $("#recipeIngredient").val();
    let recipeIngredientTwo = $("#recipeIngredientTwo").val();
    let recipeIngredientThree = $("#recipeIngredientThree").val();
    let recipeInstruction = $("#recipeInstruction").val();
    let recipeInstructionTwo = $("#recipeInstructionTwo").val();
    let recipeInstructionThree = $("#recipeInstructionThree").val();

    if (
      recipeImage != "" &&
      recipeName != "" &&
      recipeDescription != "" &&
      recipeTime != "" &&
      recipeServing != "" &&
      recipeIngredient != "" &&
      recipeIngredientTwo != "" &&
      recipeIngredientThree != "" &&
      recipeInstruction != "" &&
      recipeInstructionTwo != "" &&
      recipeInstructionThree != ""
    ) {
      JUNGLE_SERVICE.addData(
        recipeImage,
        recipeName,
        recipeDescription,
        recipeTime,
        recipeServing,
        recipeIngredient,
        recipeIngredientTwo,
        recipeIngredientThree,
        recipeInstruction,
        recipeInstructionTwo,
        recipeInstructionThree
      );
    } else {
      swal("please add data to your recipe! ");
      console.log("error adding data");
    }
    $(".content").html(JUNGLE_SERVICE.browseContent());
    JUNGLE_SERVICE.getData(displayData);
  });
}

//when you click view on a recipe it will lead you to the recipe details
function viewRecipeButton() {
  $(".recipe-button").click(function (e) {
    console.log("clicked");
    var id = e.currentTarget.id;
    idnumber = id;
    $(".content").html(JUNGLE_SERVICE.viewRecipe(id));
    JUNGLE_SERVICE.getData(viewRecipeDetails);
  });
}

//this function pulls the id for the specific recipe in the database and displays the details
function viewRecipeDetails(addData) {
  var doc = addData.docs[idnumber];
  var id = doc.id;
  var rawData = doc.data();
  var container = `    <div class='view-recipe'><div class='view-recipe-holder'><div class='vertical-align-items'>
  <h1 class='vertical-align'>${rawData.recipeName}</h1><img style=" width: 468px; height: 421px;background-position: center;
  background-repeat: no-repeat;
  background-size: cover;" src="${rawData.recipeImage}" alt="food image"></div><div class='column-items'><h1>Description:</h1><p>${rawData.recipeDescription}</p><h1>Total Time:</h1><p>${rawData.recipeTime}</p><h1>Servings:</h1><p>${rawData.recipeServing}</p><h1>Ingredients:</h1><p>${rawData.recipeIngredient}</p><p>${rawData.recipeIngredientTwo}</p><p>${rawData.recipeIngredientThree}</p><h1>Instructions:</h1><p>${rawData.recipeInstruction}</p><p>${rawData.recipeInstructionTwo}</p><p>${rawData.recipeInstructionThree}</p><button id="${id}" class="edit-recipe-button">Edit</button></div></div></div>
    `;
  $(".content").html(container);
  editRecipeButton();
}

//when you hit button takes you to a page to edit the recipe
function editRecipeButton() {
  $(".edit-recipe-button").click(function (e) {
    console.log("clicked edit recipe button");
    var id = e.currentTarget.id;
    $(".content").html(JUNGLE_SERVICE.editRecipe(id));
    JUNGLE_SERVICE.getData(editRecipe);
  });
}

function editRecipe(addData) {
  var doc = addData.docs[idnumber];
  var id = doc.id;
  var rawData = doc.data();
  var container = `
  <div class='create'><div class='input-holder'><div class='header-holder'><h1>Hey, edit your recipe!</h1></div><input id='recipeImage' class='input' type='text' name='image' value=${rawData.recipeImage}><input id='recipeName' class='input' type='text'  name='name' value=${rawData.recipeName}><input id='recipeDescription' class='input' type='text' name='description' value=${rawData.recipeDescription}><input id='recipeTime' class='input' type='text'  name='time' value=${rawData.recipeTime}><input id='recipeServing' class='input' type='text'  name='servings' value=${rawData.recipeServing}><div id='recipe-ingredients' class='header-holder'><h2>Enter Ingredients:</h2></div><input id='recipeIngredient' class='input' type='text' name='image' value=${rawData.recipeIngredient}><input id='recipeIngredientTwo'class='input' type='text'  name='image' value=${rawData.recipeIngredientTwo}><input id='recipeIngredientThree'class='input' type='text'  name='ingredient' value=${rawData.recipeIngredientThree}><div class='header-holder'><h2>Enter Instructions:</h2></div><input id='recipeInstruction'class='input' type='text'  name='image' value=${rawData.recipeInstruction}><input id='recipeInstructionTwo'class='input' type='text'  name='instuctions' value=${rawData.recipeInstructionTwo}><input id='recipeInstructionThree'class='input' type='text' name='instructions' value=${rawData.recipeInstructionThree}><button id="${id}" class='save-changes-button'>Save Changes</button><button id="${id}" class='delete-button'>Delete Recipe</button></div></div>
    `;
  $(".content").html(container);
  saveChangesButton();
  deleteButton();
}

function saveChangesButton(id) {
  $(".save-changes-button").click(function (e) {
    let recipeImage = $("#recipeImage").val();
    let recipeName = $("#recipeName").val();
    let recipeDescription = $("#recipeDescription").val();
    let recipeTime = $("#recipeTime").val();
    let recipeServing = $("#recipeServing").val();
    let recipeIngredient = $("#recipeIngredient").val();
    let recipeIngredientTwo = $("#recipeIngredientTwo").val();
    let recipeIngredientThree = $("#recipeIngredientThree").val();
    let recipeInstruction = $("#recipeInstruction").val();
    let recipeInstructionTwo = $("#recipeInstructionTwo").val();
    let recipeInstructionThree = $("#recipeInstructionThree").val();

    if (
      recipeImage != "" &&
      recipeName != "" &&
      recipeDescription != "" &&
      recipeTime != "" &&
      recipeServing != "" &&
      recipeIngredient != "" &&
      recipeIngredientTwo != "" &&
      recipeIngredientThree != "" &&
      recipeInstructionTwo != "" &&
      recipeInstructionThree != "" &&
      recipeInstruction != ""
    ) {
      JUNGLE_SERVICE.updateRecipe(
        id,
        recipeImage,
        recipeName,
        recipeDescription,
        recipeTime,
        recipeServing,
        recipeIngredient,
        recipeIngredientTwo,
        recipeIngredientThree,
        recipeInstruction,
        recipeInstructionTwo,
        recipeInstructionThree
      );
    } else {
      swal("please finish making changes to data");
    }
    $(".content").html(JUNGLE_SERVICE.browseContent());
    JUNGLE_SERVICE.getData(displayData);
  });
}

function deleteButton() {
  $(".delete-button").click(function (e) {
    var id = e.currentTarget.id;
    JUNGLE_SERVICE.deleteRecipe(id);
    $(".content").html(JUNGLE_SERVICE.browseContent());
    JUNGLE_SERVICE.getData(displayData);
  });
}

$(document).ready(function () {
  $(".content").html(JUNGLE_SERVICE.homeContent());
  JUNGLE_SERVICE.initFirebase(init);
  init();
  initNav();
});
