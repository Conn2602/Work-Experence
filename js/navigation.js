
// This is preparation done on the page startup to setup the initial page start
  $().ready(function(){

    hideErrorAlerts();

    $("#personalLink a").click(function(){
      showPersonalDetails(); 
      return false;
    });

    $("#carLink a").click(function(){
      showCarDetails(); 
      return false;
    });

    $("#quoteLink a").click(function(){
      showQuoteDetails(); 
      return false;
    });
  });

  function ValidatePersonalDetails() {
     var valid = 1;
     var name = $("#txtName").val();

     if(name == "") {
      valid = 0;
     }

    var Age = $("#Ageinput").val();

    if(Age==""){
      valid=0;
     }

     if(Age < 17)
        valid=0;

    var Town_City = $("#LocationName").val();

    if (Town_City==""){
      valid=0;
    }

    var Email = $("#EmailName").val();

    if(Email==""){
      valid=0
    }
    
    return valid;
  }

  function showCarDetails() {
      var valid = ValidatePersonalDetails();
      if(valid==1){ 
      $("#dvPersonalDetails").hide();
      $("#dvQuoteDetails").hide();
      $("#dvCarDetails").show();
      }
      else
      {
       $("#dvPersonalDetailsAlert").show();  
      }  
    // Hide the personal details section (dvPersonalDetails)
    // Hide the quote section (dvQuoteDetails)
    // Show the car details section (dvCarDetails)

  }

  function createjason() {
    var age = $("#Ageinput").val();
    var gender =  $("#dvPersonalDetails input:radio[name=GenderInput]:checked").val();
    var carcost = $("#EstimatedValue").val();
    var storagelocation = $("#Storage").val();
    var years = $("#ddlNcb option:selected").val();
    var json = {age:age,gender:gender,costOfCar:carcost,carStorage:storagelocation,noClaimsBonus:years,insuranceDuration:'12'};
    return json;
  }

  function showPersonalDetails() {
      $("#dvPersonalDetails").show();
      $("#dvQuoteDetails").hide();
      $("#dvCarDetails").hide(); 
      // Hide the car details section (dvCarDetails)
      // Hide the quote section (dvQuoteDetails)
      // Show the personal details section (dvPersonalDetails)
  }

  function showQuoteDetails() {
      // Hide the car details section (dvCarDetails)
      // Hide the personal details section (dvQuoteDetails)
      // Show the quote section (dvPersonalDetails)
  }

  function getQuote() {
    var jsonResult = createjason();
    // Perform validation to test that all data has been entered
/*
    if ( Page is Valid )
    {
*/
      // Get the values from the page elements that you need to create your JSON

      $.ajax({
          type: "GET",
          url: "http://localhost:53753/api/calculateRates",
          data: jsonResult
        }).done(function(msg) {alert(msg.result);
          // Put the return value into Label created on quote details
          // Hide the Car Details section
          // Display the quote details page
      });
  }

//################################# Helper Functions - look at these when validating and changing section #########################################

  // Use this function to "Reset" the form and hide all 3 error sections whenever you make a section transition
  function hideErrorAlerts()
  {
    $("#dvPersonalDetailsAlert").hide();
    $("#dvCarDetailsAlert").hide();
    $("#dvQuoteDetailsAlert").hide();
  }

  // This function will control the top navigation and set the active tab when you make a section transition
  // You will need to call it and pass in the tab that needs to be made active
  function setActiveNavigation(activeTab) {
    $(".nav li").removeClass("active");

    $("#" + activeTab).addClass("active");
  }
