async function register()
{
    
    let firstName = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;
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
    button.addEventListener("click", register);
})