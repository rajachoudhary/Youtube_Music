/**
 * 
 * @param {String} target ID of the target element 
 * @param {Boolean} isLoading Status if is loading or completed
 */
const loadingIndicator = ( target, isLoading ) => {
    const container = document.getElementById(target);
    let loader = container.querySelector("#loader");
    if ( loader ){
        if ( isLoading ){
            loader.style.display = "block";
        } else {
            loader.style.display = "none";
        }
    } else if ( isLoading ){
        loader = document.createElement("div");
        loader.innerHTML = '<svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg>';
        loader.id = "loader";
        container.append(loader);
    }
}

export default loadingIndicator;