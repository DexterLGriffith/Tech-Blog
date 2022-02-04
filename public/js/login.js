//front end login
//get login form



const loginFormHandler = async function(event)
{
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    fetch("/api/user/login", {
        method: "POST",
        
        body: JSON.stringify({

            username: username.value,
            password: password.value
        }),
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(response => response.json())
    .then(() => {
      
          document.location.replace("/dashboard");

       
    })
    .catch(err => {
        console.log(err);
    });
}


document.querySelector(".loginContainer").addEventListener("submit", loginFormHandler);