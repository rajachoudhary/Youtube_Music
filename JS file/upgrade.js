import navbar from "../components/navbar.js";

window.addEventListener("load", ()=>{
    document.body.querySelector("nav").append(navbar({ pageTitle: "Upgrade"})
    )
})