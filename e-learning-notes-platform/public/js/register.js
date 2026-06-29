document.querySelector("form").addEventListener("submit",function(e){

let name=document.querySelector("[name=fullname]").value;

let email=document.querySelector("[name=email]").value;

let password=document.querySelector("[name=password]").value;

if(name=="" || email=="" || password==""){

e.preventDefault();

alert("Fill all fields");

}

});