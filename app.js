function getCouncillorData() {
  const url = "http://ws-old.parlament.ch/councillors?format=json";
  let fetchData = [];
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data)
      fetchData = data;
      let myTable = document.createElement("table");
      myTable.className = "myTable";

      fetchData.map((item) => {
        myTable.innerHTML += `
          <tr>
              <td id=${item.id} class='id'>
                  ${item.id}
              </td>
              <td>
              ${item.number ? item.number : 0}
              </td>
              <td class='name'>
                  ${item.firstName}
              </td>
              <td>
                  ${item.lastName}
              </td>
          </tr>`;
      });
      var element = document.getElementById("tableValue");
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      element.appendChild(myTable);
    });
}

let serachinput = document.getElementById("input_search");
let searchbutton = document.querySelector("#search-button");

searchbutton.addEventListener("click", (e) => {
  const searchtext = serachinput.value.toLowerCase();
  console.log(searchtext);
  const searchItems = document.getElementsByClassName("name");

  for (i = 0; i < searchItems.length; i++) {
    if (searchItems[i].textContent.toLowerCase().indexOf(searchtext) === -1) {
      searchItems[i].setAttribute("style", "display:none");
    } else {
      searchItems[i].setAttribute("style", "display:block");
    }
  }
  serachinput.value = "";
});

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementsByClassName("myTable")[0];
  switching = true;
  while (switching) {
    switching = false;
    console.log(table);
    rows = table.rows;
    console.log(rows.length);
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      if (Number(x.innerHTML) > Number(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

getCouncillorData();
