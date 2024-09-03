const container = document.getElementById('container');
const overlayCon = document.getElementById('overlayCon');
const overlayBtn = document.getElementById('overlayBtn');

overlayBtn.addEventListener('click', () => {
    container.classList.toggle('right-panel-active');
    overlayBtn.classList.remove('btnScaled');
    window.requestAnimationFrame( ()=> {
            overlayBtn.classList.add('btnScaled');
        })
})

console.log("Firebase App initialized:", app);
console.log("Register function called");
console.log("Email:", email, "Password:", password);

let email = "";
let password = "";

function register() {
    console.log("Register button clicked");
    const Name = document.getElementById('Name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if (!validate_email(email)) {
        alert("Please enter a valid email.");
        return;
    }

    if (!validate_password(password)) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then(function() {
            const user = auth.currentUser;
            const userId = user.uid;

            const user_data = {
                Name: Name,
                email: email,
                last_login: Date.now() 
            };

            set(ref(database, 'users/' + userId), user_data)
                .then(() => {
                    alert('User Created!!');
                })
                .catch((error) => {
                    alert(error.message);
                });
        })
        .catch(function(error) {
            alert(error.message);
        });
}

function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validate_password(password) {
    return password.length >= 6;
}

document.querySelector('.sign-up-container form').addEventListener('submit', function(event){
    event.preventDefault();
    register();
});