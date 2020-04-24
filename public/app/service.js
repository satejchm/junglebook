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
    recipeIngredient,
    recipeIngredientTwo,
    recipeIngredientThree,
    recipeInstruction,
    recipeInstructionTwo,
    recipeInstructionThree
  ) {
    let recipeInfo = {
      recipeImage: recipeImage,
      recipeName: recipeName,
      recipeDescription: recipeDescription,
      recipeTime: recipeTime,
      recipeServing: recipeServing,
      recipeIngredient: recipeIngredient,
      recipeIngredient: recipeIngredientTwo,
      recipeIngredient: recipeIngredientThree,
      recipeInstruction: recipeInstruction,
      recipeInstruction: recipeInstructionTwo,
      recipeInstruction: recipeInstructionThree,
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

  var _updateRecipe = function (
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
  ) {
    let recipeInfo = {
      recipeImage: recipeImage,
      recipeName: recipeName,
      recipeDescription: recipeDescription,
      recipeTotalTime: recipeTime,
      recipeServingSize: recipeServing,
      recipeIngredient: recipeIngredient,
      recipeIngredient: recipeIngredientTwo,
      recipeIngredient: recipeIngredientThree,
      recipeInstruction: recipeInstruction,
      recipeInstruction: recipeInstructionTwo,
      recipeInstruction: recipeInstructionThree,
    };

    _db
      .collection("Recipes")
      .doc(id)
      .update(recipeInfo)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        swal("changes to recipe saved! :)");
      })
      .catch(function (error) {
        swal("error adding changes to document!");
        console.log("Error adding changes document: ", error);
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

  var _deleteRecipe = function (id) {
    _db.collection("Recipes").doc(id).delete();
    swal("Recipe deleted!");
  };

  var _homeContent = function () {
    let homeInfo = `<div class='home'><div class='home-info-holder'><div class='home-info'><h1>The Jungle Cook</h1><p>The home to various recipes of your choice. Add your own recipe today and fill the world with joy!</p></div><div class='pink-circle'><p>Want to be a jungle cook? Go ahead and the kitchen is yours!</p></div></div>`;

    return homeInfo;
  };

  var _browseContent = function () {
    let browseInfo = `<div class='browse'></div>`;

    return browseInfo;
  };

  var _createRecipeContent = function (id) {
    let createInfo = `<div class='create'><div class='input-holder'><div class='header-holder'><h1>Hey, create your recipe!</h1></div><input id='recipeImage' class='input' type='text' name='image' placeholder='Add Recipe Image - Please enter an image url to add image'><input id='recipeName' class='input' type='text'  name='name' placeholder='Recipe Name'><input id='recipeDescription' class='input' type='text' name='description' placeholder='Recipe Description'><input id='recipeTime' class='input' type='text'  name='time' placeholder='Recipe Total Time'><input id='recipeServing' class='input' type='text'  name='servings' placeholder='Recipe Serving Size'><div id='recipe-ingredients' class='header-holder'><h2>Enter Ingredients:</h2></div><input id='recipeIngredient' class='input' type='text' name='image' placeholder='Ingredient #1'><input id='recipeIngredientTwo'class='input' type='text'  name='image' placeholder='Ingredient #2'><input id='recipeIngredientThree'class='input' type='text'  name='ingredient' placeholder='Ingredient #3'><div class='header-holder'><h2>Enter Instructions:</h2></div><input id='recipeInstruction'class='input' type='text'  name='image' placeholder='Instruction #1'><input id='recipeInstructionTwo'class='input' type='text'  name='instuctions' placeholder='Instruction #2'><input id='recipeInstructionThree'class='input' type='text' name='instructions' placeholder='Instruction #3'><button id="${id}" class='create-recipe-button'>Create Recipe</button></div></div></div>`;

    return createInfo;
  };

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
