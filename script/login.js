const loginBtn =document.getElementById("login-btn");

loginBtn.addEventListener("click",()=>{
    const inputUsername =document.getElementById("input-username");
    const username =inputUsername.value
    console.log(username)
    const inputPassword =document.getElementById("input-password");
    const password =inputPassword.value
    console.log(password)
    if(username =="admin" && password =="admin123"){
        alert("login Success");
        window.location.assign("./home.html")
    }else{
         alert("login Failed");
        return;
    }
})