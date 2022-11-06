const form = document.querySelector(".form");
const formCreate = document.querySelector(".form-create");
const logOut = document.querySelector(".nav__el--logout");

const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 5000);
};

//Logining user
const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:4000/user/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
    return;
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

//Logout User
const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:4000/user/logout",
    });
    if ((res.data.status = "success")) location.reload(true);
  } catch (err) {
    console.log(err.response);
    alert("error", "Error logging out! Try again.");
  }
};

//Register User
const singUp = async (
  first_name,
  last_name,
  username,
  email,
  password,
  confirmPassword
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:4000/user/signup",
      data: {
        first_name,
        last_name,
        username,
        email,
        password,
        confirmPassword,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Registerd successfully!");
      window.setTimeout(() => {
        location.assign("/login");
      }, 1500);
    }
    return;
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

//Create a Blog Post
const createPost = async (title, description, tags, body) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:4000/blog",
      data: {
        title,
        description,
        tags,
        body,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Article Created Successfully");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
    return;
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
    return;
  });
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const first_name = document.getElementById("firstName").value;
    const last_name = document.getElementById("lastName").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    singUp(first_name, last_name, username, email, password, confirmPassword);
    return;
  });
}

if (logOut) logOut.addEventListener("click", logout);

if (formCreate) {
  formCreate.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const tags = document.getElementById("tags").value;
    const body = document.getElementById("text_area").value;
    createPost(title, description, tags, body);
    return;
  });
}
