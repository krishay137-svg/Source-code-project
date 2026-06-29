document.querySelector("form").addEventListener("submit",function(e){

let email=document.querySelector("[name=email]").value;

let password=document.querySelector("[name=password]").value;

if(email=="" || password==""){

e.preventDefault();

alert("Fill all fields");

}

});