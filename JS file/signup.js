async function register()
{
    
    let firstName = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;
   
     if (firstName == "" || lastname == "") {
        alert("Please Fill your name");
        return;
    }
    else if(email=="") {
        alert("please fill your email");
        return;
    }
    else  if (password == "") {
        alert("Please Fill Password");
        return;
    }
    console.log(firstName, lastname, email, password);
    const payLoad = {
        firstName: firstName,
        lastName: lastname,
        emailId: email,
        password: password,
    }
    return fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(payLoad)
    })
    // return  await fetch("http://localhost:3000/users")
    //     .then(res => {
    //        let data =res.json();
    //         console.log(data);
    // })

  
}
 
window.addEventListener("load", function () {
    let button = document.getElementById("register");
    let showBtn = document.getElementById("showPassword");
    showBtn.addEventListener("click", togglePassword);
    button.addEventListener("click", register);
})
function togglePassword()
{
    let password = document.getElementById("pass");
    let confirmPassword = document.getElementById("confirm");
    if (password.type === "password") {
        password.type = "text";
        confirmPassword.type = "text";
    }
    else {
        password.type = "password";
        confirmPassword.type = "password";
    }
}