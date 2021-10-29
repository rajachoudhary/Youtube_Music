async function login()
{
    let emailId = document.getElementById("email").value;
    let password = document.getElementById("pass").value;
    return await fetch(`http://localhost:3000/users?emailId=${emailId}`)
        .then(res => {
            // alert("login successfully")
            return res.json();
        })
        .then(res => {
            if (res[0].password == password)
            {
                alert("Login successfully");
                localStorage.setItem('Name', JSON.stringify(res[0].firstName));
                console.log(res[0].firstName);
                document.getElementById("email").value = "";
                document.getElementById("pass").value = "";
                window.open("index.html");
            }
            else
                alert("Incorrect Password");
        })
        .catch(error => {
            alert("Your Email Id is not registered");
    })

}
window.addEventListener("load", function ()
{
    let button = document.getElementById("login");
    let showBtn = document.getElementById("showPassword");
    showBtn.addEventListener("click", togglePassword);
    button.addEventListener("click",login)
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