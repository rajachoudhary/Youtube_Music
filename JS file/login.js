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
                alert("Login successfully");
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
    button.addEventListener("click",login)
})