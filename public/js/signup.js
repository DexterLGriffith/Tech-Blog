

const signupFormHandler = async function(event)
{
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    fetch("/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

            username: username.value,
            password: password.value
        })
       

    })
    .then(response => response.json())
    .then(data => {
        if(data.message === "success")
        {
            window.location.href = "/dashboard";
        }
        else
        {
            alert("Invalid username or password");
        }
    })
    .catch(err => {
        console.log(err);
    });
}


document.querySelector(".signupContainer").addEventListener("submit", loginFormHandler);