var JUNGLE_SERVICE = (function () {
  document.addEventListener("DOMContentLoaded", function () {
    try {
      let app = firebase.app();
      let features = ["auth", "database", "messaging", "storage"].filter(
        (feature) => typeof app[feature] === "function"
      );
      document.getElementById("load");
    } catch (e) {
      console.error(e);
    }
  });

  var _db;

  //get data from database
  var _getData = function (callback) {
    _db
      .collection("Recipes")
      .get()
      .then(function (querySnapshot) {
        callback(querySnapshot);
      });
  };

  //create a new recipe and add it to your database
  var _addData = function (
    recipeImage,
    recipeName,
    recipeDescription,
    recipeTime,
    recipeServing,
    ingredientArray,
    instructionArray
  ) {
    let recipeInfo = {
      recipeImage: recipeImage,
      recipeName: recipeName,
      recipeDescription: recipeDescription,
      recipeTime: recipeTime,
      recipeServing: recipeServing,
      ingredientArray: ingredientArray,
      instructionArray: instructionArray,
    };

    _db
      .collection("Recipes")
      .add(recipeInfo)
      .then(function (docRef) {
        swal("Added new recipe!");
      })
      .catch(function (error) {
        swal("Error adding recipe!");
        console.log("Error adding recipe: ", error);
      });
  };

  //when you edit a recipe this function updates the information in the database
  var _updateRecipe = function (
    id,
    recipeImage,
    recipeName,
    recipeDescription,
    recipeTime,
    recipeServing,
    ingredientArray,
    instructionArray
  ) {
    let recipeInfo = {
      recipeImage: recipeImage,
      recipeName: recipeName,
      recipeDescription: recipeDescription,
      recipeTotalTime: recipeTime,
      recipeServingSize: recipeServing,
      recipeIngredient: ingredientArray,
      recipeInstruction: instructionArray,
    };

    _db
      .collection("Recipes")
      .doc(id)
      .update(recipeInfo)
      .then(function (docRef) {
        swal("changes to recipe saved! :)");
      })
      .catch(function (error) {
        swal("error adding changes to document!");
      });
  };

  //initialize firebase connection
  var _initFirebase = function () {
    firebase
      .auth()
      .signInAnonymously()
      .then(function (result) {
        console.log("connected to firebase");
        _db = firebase.firestore();
      });
  };

  //deletes recipe from database
  var _deleteRecipe = function (id) {
    _db.collection("Recipes").doc(id).delete();
    swal("Recipe deleted!");
  };

  //displays home page content
  var _homeContent = function () {
    let homeInfo = `<div class='home'><div class='home-info-holder'><div class='home-info'><h1>The Jungle Cook</h1><p>The home to various recipes of your choice. Add your own recipe today and fill the world with joy!</p></div><div class='pink-circle'><p>Want to be a jungle cook? Go ahead and the kitchen is yours!</p></div></div>`;

    return homeInfo;
  };

  //displays browse page content
  var _browseContent = function () {
    let browseInfo = `<div class='browse'></div>`;

    return browseInfo;
  };

  //display create recipe form page
  var _createRecipeContent = function (id) {
    let createInfo = `<div class='create'><div class='input-holder'><div class='header-holder'><h1>Hey, create your recipe!</h1></div><input id='recipeImage' class='input' type='text' name='image' placeholder='Add Recipe Image - Please enter an image url to add image to your recipe'><input id='recipeName' class='input' type='text'  name='name' placeholder='Recipe Name'><input id='recipeDescription' class='input' type='text' name='description' placeholder='Recipe Description'><input id='recipeTime' class='input' type='text'  name='time' placeholder='Recipe Total Time'><input id='recipeServing' class='input' type='text'  name='servings' placeholder='Recipe Serving Size'><div class='header-holder'><h2>Enter Ingredients:</h2></div><div id='create-recipe-ingredients'><input id='recipeIngredient' class='input' type='text' placeholder='Ingredient #1'><input id='recipeIngredient2' class='input' type='text' placeholder='Ingredient #2'><input id='recipeIngredient3' class='input' type='text' name='ingredient' placeholder='Ingredient #3'></div><br><button id="ingredient" class='add-more'>+ Add Ingredient</button><div class='header-holder'><h2>Enter Instructions:</h2></div><div id='create-recipe-instructions'><input id='recipeInstruction'class='input' type='text' placeholder='Instruction #1'><input id='recipeInstruction2' class='input' type='text' placeholder='Instruction #2'><input id='recipeInstruction3' class='input' type='text' name='instruction' placeholder='Instruction #3'></div><br><button id="instruction" class='add-more'>+ Add Instruction</button><button id="${id}" class='create-recipe-button'>Create Recipe</button></div></div>`;

    return createInfo;
  };

  //displays login form page - not working just the css for the page
  var _createLoginContent = function () {
    let loginInfo = `<div class='login-wrapper'><div class='holder'><div class='input-holder'><div class='header-holder'><h1>Login Here!</h1></div><input class='input' type='text' name='email' placeholder='Email Address'><input class='input' type='text'  name='password' placeholder='Password'><div class='login-button'>Login</div></div><div class='input-holder'><div class='header-holder'><p>Don't have an account?</p><h1>Sign Up!</h1></div><input class='input' type='text'  name='fname' placeholder='First Name'><input class='input' type='text'  name='lname' placeholder='Last Name'><input class='input' type='text' name='email' placeholder='Email Address'><input class='input' type='text'  name='password' placeholder='Password'><div class='login-button'>Sign Up</div></div></div></div>`;
    return loginInfo;
  };

  //when you click on view recipe it links through to recipe info
  var _viewRecipe = function (id) {
    let recipeInfo = `<div></div>`;
    return recipeInfo;
  };

  //when you click on view recipe it links through to recipe info
  var _editRecipe = function (id) {
    let editRecipeInfo = `<div></div>`;
    return editRecipeInfo;
  };

  return {
    getData: _getData,
    initFirebase: _initFirebase,
    homeContent: _homeContent,
    browseContent: _browseContent,
    createRecipeContent: _createRecipeContent,
    createLoginContent: _createLoginContent,
    addData: _addData,
    viewRecipe: _viewRecipe,
    editRecipe: _editRecipe,
    updateRecipe: _updateRecipe,
    deleteRecipe: _deleteRecipe,
  };
})();
