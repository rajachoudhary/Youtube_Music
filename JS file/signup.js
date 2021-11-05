function isNewUser(email) {
    return fetch( `http://localhost:3000/users?emailId=${email}` )
        .then( res => res.json() )
        .then( res => {
            if ( res[0] ) return false
            else return true
        })
}

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

async function registerUser(event) {
    event.preventDefault();
    let firstName = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let confirm = document.getElementById("confirm").value;
    let password = document.getElementById("pass").value;
   
    if (firstName == "" || lastname == "") {
        handleMsg("Please Fill your name", true);
        return;
    }
    else if(email=="") {
        handleMsg("please fill your email", true);
        return;
    }
    else  if (password == "") {
        handleMsg("Please Fill Password", true);
        return;
    }
    else if ( password.length < 8 ){
        handleMsg("Password must be 8 or more characters", true);
        document.getElementById("pass").focus();
        return;
    }
    else if ( confirm !== password ){
        handleMsg("Password is not matching", true);
        document.getElementById("pass").focus();
        return;
    }
    const payLoad = {
        firstName: firstName,
        lastName: lastname,
        emailId: email,
        password: password,
    }
    const r = await isNewUser(email);
    if ( !r ){
        handleMsg("User already exists!", true)
        return;
    }
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(payLoad)
    })
    .then ( res => {
        if ( res.status == 201 ){
            handleMsg("You have suceesfully registered!", false);
            window.location.href = "login.html";
        } else {
            handleMsg("Something went wrong, Please try again", true);
        }
    });
    
    // return  await fetch("http://localhost:3000/users")
    //     .then(res => {
    //        let data =res.json();
    //         console.log(data);
    // })

}
 
window.addEventListener("load",async function () {
    let button = document.getElementById("register");
    let showBtn = document.getElementById("showPassword");
    showBtn.addEventListener("click", togglePassword);
    button.addEventListener("click", registerUser);
})
function togglePassword(){
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