// ==UserScript==
// @name         Bunkr Sort
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Sorts Bunkr.is by filesize,Name and date
// @author       DJFuryX
// @match        https://bunkr.is/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bunkr.is
// @grant        none
// ==/UserScript==

/*global waitForKeyElements*/


(function() {
    'use strict';

    const rows = document.getElementById("table").getElementsByClassName("image-container column");
    const rowNum = rows.length
    SortFileSizeButton();
    SortFileNameButton();
    SortFileDate();

     function SortFileSizeButton(){
     var descending = false

    let btn = document.createElement("sort");
    btn.innerHTML = "Sort By FileSize ↓";
    btn.style = "bottom:15%;right:1.5%;position:fixed;z-index:2;padding:15px;color:white;background:#ff7675;border-radius:60px;cursor:pointer";// dynamically adjust button position
    btn.onclick = function () {
   descending = !descending;

       if (descending){
        btn.innerHTML = "Sort By FileSize ↑";
      }
      else{
           btn.innerHTML = "Sort By FileSize ↓";
       }

  var switching, i, x,newX, y,newY, shouldSwitch;

  switching = true;

  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;

    /* Loop through all table rows*/
    for (i = 0; i < (rowNum -1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByClassName("file-size")[0].innerHTML;
      newX=x.split(" ");

      if (newX[1]=="kB"){
      x= newX[0]/1000;
      }


      //prevent trying to access empty array
      y = rows[i + 1].getElementsByClassName("file-size")[0].innerHTML;
      newY=y.split(" ");

      if (newY[1]=="kB"){
      y=newY[0]/1000
      }


      if(descending){
      // Check if the two rows should switch place:
          if (parseFloat(x) < parseFloat(y)) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
          }
      }
      else{

      // Check if the two rows should switch place:
          if (parseFloat(x) > parseFloat(y)) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
          }
      }

  }

    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }


}

    document.body.append(btn);
   }

     function SortFileNameButton(){

     var descending
    let btn2 = document.createElement("sort");
    btn2.innerHTML = "Sort By FileName ↓";
    btn2.style = "bottom:25%;right:1.5%;position:fixed;z-index:2;padding:15px;color:white;background:#ff7675;border-radius:60px;cursor:pointer";// dynamically adjust button position
    btn2.onclick = function () {
    descending = !descending;

       if (descending){
        btn2.innerHTML = "Sort By FileName ↑";
      }
      else{
           btn2.innerHTML = "Sort By FileName ↓";
       }



   var switching, i, x, y, shouldSwitch;

  switching = true;

  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;   
    /* Loop through all table rows*/
    for (i = 0; i < (rowNum -1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByClassName("name")[0];
      //prevent trying to access empty array
       y = rows[i + 1].getElementsByClassName("name")[0];
      if(descending){

      // Check if the two rows should switch place:
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
          }
      }
      else{

      // Check if the two rows should switch place:
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
          }
      }

  }

    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }


    }

      document.body.append(btn2);
  }

     function SortFileDate(){

        //var datechanged=false;
        var descending
    let btn3 = document.createElement("sort");
    btn3.innerHTML = "Sort By FileDate ↓";
    btn3.style = "bottom:35%;right:1.5%;position:fixed;z-index:2;padding:15px;color:white;background:#ff7675;border-radius:60px;cursor:pointer";// dynamically adjust button position
    btn3.onclick = function () {
    descending = !descending;

       if (descending){
        btn3.innerHTML = "Sort By FileDate ↑";
      }
      else{
           btn3.innerHTML = "Sort By FileDate ↓";
       }

    var switching, i, x, y, shouldSwitch;

  switching = true;

  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    /* Loop through all table rows*/
    for (i = 0; i < (rowNum -1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByClassName("name")[1];
      y = rows[i + 1].getElementsByClassName("name")[1];

      var tmpdatex = x.innerHTML.split(" ");
      var tmpdatey = y.innerHTML.split(" ");

      var currtimex = tmpdatex[0].split(":");
      var currdatex = tmpdatex[1].split("/");


        var nexttimey = tmpdatey[0].split(":");
        var nextdatey = tmpdatey[1].split("/");

        var currentDate = new Date(currdatex[2],currdatex[1],currdatex[0], currtimex[0], currtimex[1], currtimex[2]);

       var nextDate = new Date(nextdatey[2],nextdatey[1],nextdatey[0], nexttimey[0], nexttimey[1], nexttimey[2]);
//       console.table("current date is : "+currentDate+"next date is : "+nextDate);

//         if (!datechanged){
//         x.innerHTML = currentDate.toDateString() + currentDate.toLocaleTimeString();
//             datechanged = true;
//         }
      if(descending){

      // Check if the two rows should switch place:
          if (currentDate < nextDate) {
              // If so, mark as a switch and break the loop:

              shouldSwitch = true;
              break;
          }
      }
      else{

      // Check if the two rows should switch place:
          if (currentDate > nextDate) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
          }
      }

  }

    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */


      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }


    }

     document.body.append(btn3);
    }

})();