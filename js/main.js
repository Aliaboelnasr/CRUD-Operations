var userBookmarkName = document.getElementById("userBookmarkName");
var userWebsiteUrl = document.getElementById("userWebsiteUrl");
var dataRow = document.getElementById("dataRow");
var box = document.getElementById("box");
var userList = [];
if (localStorage.getItem("user")) {
  userList = JSON.parse(localStorage.getItem("user"));
  display();
}

function addUser() {
  if (!bookNameValidation() || !urlValidation()) {
    Swal.fire({
      title: "",
      html: `
        <div style="text-align: left; padding: 10px;">
            <div style="display: flex; margin-bottom: 15px;">
                <span style="margin-right: 10px;">
                    <span
                        style="height: 10px; width: 15px; background-color: red; border-radius: 50%; display: inline-block;"></span>
                    <span
                        style="height: 10px; width: 15px; background-color: rgba(255, 213, 0, 0.799); border-radius: 50%; display: inline-block;"></span>
                    <span
                        style="height: 10px; width: 15px; background-color: rgba(0, 128, 0, 0.638); border-radius: 50%; display: inline-block;"></span>
                </span>
            </div>
            <h2 style="font-size: 21px;  font-family: Bree Serif, serif; font-weight: 400 ;font-style: normal; margin-bottom: 15px;">Site Name or Url is not valid, Please follow the rules below :</h2>
           <ul style="list-style:none; ">
            <li style="margin-bottom: 10px;"><i style="margin-right: 5px;" class="fa-solid fa-circle-arrow-right text-danger"></i>Site name must contain at least 3 characters</li>
            <li style="margin-bottom: 10px;"><i style="margin-right: 5px;" class="fa-solid fa-circle-arrow-right text-danger"></i>Site URL must be a valid one</li>
           </ul>
        </div>
      `,
      showConfirmButton: false,
      showCloseButton: true,
      customClass: {
        popup: "custom-popup-class",
      },
    });
    return;
  }

  var ContentObj = {
    id: Date.now(),
    ubn: userBookmarkName.value,
    uwU: userWebsiteUrl.value,
  };

  userList.push(ContentObj);
  localStorage.setItem("user", JSON.stringify(userList));
  clearForm();
  display();
}

function display() {
  var tableHTML = `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Index</th>
          <th scope="col">Website Name</th>
          <th scope="col">Visit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>`;

  for (var i = 0; i < userList.length; i++) {
    tableHTML += `
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${userList[i].ubn}</td>
          <td>
          <a href="${userList[i].uwU}" target="_blank">
              <button type="button" class="btn btn-1">
                <i class="fa-solid fa-eye px-1"></i>visit
              </button>
            </a>
          </td>
          <td>
            <button onclick="deleteFun(${
              userList[i].id
            })" type="button" class="btn btn-2">
              <i class="fa-solid fa-trash px-1"></i>delete
            </button>
          </td>
        </tr>`;
  }

  tableHTML += `
      </tbody>
    </table>`;

  dataRow.innerHTML = tableHTML;
}
function clearForm() {
  userBookmarkName.value = null;
  userWebsiteUrl.value = null;
}

function deleteFun(id) {
  userList = userList.filter(function (ele) {
    return ele.id !== id;
  });
  localStorage.setItem("user", JSON.stringify(userList));
  display();
}

function bookNameValidation() {
  var Regex = /^[A-Za-z]{2,5}$/;
  if (Regex.test(userBookmarkName.value)) {
    userBookmarkName.classList.add("is-valid");
    userBookmarkName.classList.remove("is-invalid");
    return true;
  } else {
    userBookmarkName.classList.add("is-invalid");
    userBookmarkName.classList.remove("is-valid");
    return false;
  }
}
function urlValidation() {
  var Regex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  if (Regex.test(userWebsiteUrl.value)) {
    userWebsiteUrl.classList.add("is-valid");
    userWebsiteUrl.classList.remove("is-invalid");
    return true;
  } else {
    userWebsiteUrl.classList.add("is-invalid");
    userWebsiteUrl.classList.remove("is-valid");
    return false;
  }
}
