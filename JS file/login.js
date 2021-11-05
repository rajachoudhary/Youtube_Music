function handleMsg(msg, isError){
    const container = document.createElement("div");
    const msgCont = document.createElement("div");
    msgCont.textContent = msg;
    container.className = "msg";
    if ( isError ) container.className += " error";
    container.append( msgCont );
    document.body.append( container );
    setTimeout( () => {
        container.className += " fade-out";
    }, 3000);
    setTimeout( () => {
        document.body.getElementsByClassName("msg")[0].remove()
    }, 5500);
}

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
                handleMsg("Login Successful", false);
                localStorage.setItem('User', JSON.stringify(res[0]));
                document.getElementById("email").value = "";
                document.getElementById("pass").value = "";
                window.location.href = "index.html";
            }
            else{
                document.getElementById("pass").focus();
                handleMsg("Incorrect Password", true);
            }
        })
        .catch(error => {
            handleMsg("Your Email Id is not registered", true);
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