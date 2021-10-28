import navbar from "../components/navbar.js"

window.addEventListener("load", () => {
    document.body.append(navbar({ pageTitle: "Home" }))
})