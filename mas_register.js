"use strict";
/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 3


   Filename: mas_register.js

   Author: Gabriel Hernandez 
   Date: 4/23/19    
   
   Function List
   =============
   
   formTest()
      Performs a validation test on the selection of the conference
      session package and the conference discount number
   
   calcCart()
      Calculates the cost of the registration and saves data
      in session storage
      
   writeSessionValues()
      Writes data values from session storage in to the
      registration summary form


*/

// sets up the page by calling all the functino that will be called later in the document
window.onload = function () {
      document.getElementById("regSubmit").onclick = sessionTest;

      document.getElementById("fnBox").onblur = calcCart;
      document.getElementById("lnBox").onblur = calcCart;
      document.getElementById("groupBox").onblur = calcCart;
      document.getElementById("mailBox").onblur = calcCart;
      document.getElementById("phoneBox").onblur = calcCart;
      document.getElementById("banquetBox").onblur = calcCart;

      document.getElementById("sessionBox").onchange = calcCart;

      document.getElementById("mediaCB").onclick = calcCart;

      calcCart();
}

//provide validation test for the confrence session selection list
function sessionTest () {
      var confSession = document.getElementById("sessionBox");
      if (confSession === -1) {
            confSession.setCustomValidity("Select a Session Package");
      } else {
            confSession.setCustomValidity("");
      }
}

//calculate the registration cost and to save information about the customer’s choices in session storage
function calcCart() {
      //stores the first and last name in the session Storage variable
      sessionStorage.confName = document.forms.regForm.elements.fnBox.value + " " + document.forms.regForm.elements.lnBox.value;

      //  Gets the value from the users unpute ans stores them for later use
      sessionStorage.confGroup = document.forms.regForm.elements.groupBox.value;
      sessionStorage.confMail = document.forms.regForm.elements.mailBox.value;
      sessionStorage.confPhone = document.forms.regForm.elements.phoneBox.value;
      sessionStorage.confBanquet = document.forms.regForm.elements.banquetBox.value;

      //gets the value from the 
      sessionStorage.confBanquetCost = sessionStorage.confBanquet * 55;
      
      //tests whether or not an option is selected
      var selectedIndex = document.getElementById("sessionBox").selectedIndex;
      if (selectedIndex !== -1) {
            sessionStorage.confSession = document.forms.regForm.elements.sessionBox[selectedIndex].text;
            sessionStorage.confSessionCost = document.forms.regForm.elements.sessionBox[selectedIndex].value;
      } else {
            sessionStorage.confSession = "";
            sessionStorage.confSessionCost = 0;
      }
      // tests whether the "Media Pack" option is selcted
       if (document.forms.regForm.elements.mediaCB.checked) {
             sessionStorage.confPack = "yes";
             sessionStorage.confPackCost = 115;
       } else {
            sessionStorage.confPack = "no";
            sessionStorage.confPackCost = 0;
      }

      //adds all the cost to calcualte the total
      sessionStorage.confTotal = parseFloat(sessionStorage.confSessionCost) + parseFloat(sessionStorage.confBanquetCost) + parseFloat(sessionStorage.confPackCost);

      writeSessionValues()
}

//writes the selceted values in an organized seccion that is a basic summary the user's order
function  writeSessionValues(){
      document.getElementById("regName").textContent = sessionStorage.confName;
      document.getElementById("regGroup").textContent = sessionStorage.confGroup;
      document.getElementById("regEmail").textContent = sessionStorage.confMail;
      document.getElementById("regPhone").textContent = sessionStorage.confPhone;
      document.getElementById("regSession").textContent = sessionStorage.confSession;
      document.getElementById("regBanquet").textContent = sessionStorage.confBanquet;
      document.getElementById("regPack").textContent = sessionStorage.confPack;

      document.getElementById("regTotal").textContent = "$" + sessionStorage.confTotal;
}