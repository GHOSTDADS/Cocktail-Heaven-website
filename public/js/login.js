const loginFormHandler = async (event) => {
  event.preventDefault();


  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in, please check your Email and Password is correct');
    }
  }
};

const checkUsernameExists = async (username) => {
  try {
    const response = await fetch(`/api/users/check-username/${username}`);
    
    if (response.ok) {
      const data = await response.json();
      const helpElementUsername = document.getElementById('username-signup-help');
      const helpElementUsernamebox = document.getElementById('username-signup');
      const helpElementUsernameicon = document.getElementById('username-signup-icon');
      if (data.exists) {
        helpElementUsernameicon.classList.add('fa-exclamation-triangle');
        helpElementUsernameicon.classList.remove('fa-check');
        helpElementUsernamebox.classList.remove('is-success');
        helpElementUsernamebox.classList.add('is-danger');
        helpElementUsername.textContent = 'This username is already taken.';
        helpElementUsername.classList.remove('is-success');
        helpElementUsername.classList.add('is-danger');
      } else {
        helpElementUsernameicon.classList.remove('fa-exclamation-triangle');
        helpElementUsernameicon.classList.add('fa-check');
        helpElementUsernamebox.classList.add('is-success');
        helpElementUsernamebox.classList.remove('is-danger');
        helpElementUsername.textContent = 'This username is available.';
        helpElementUsername.classList.remove('is-danger');
        helpElementUsername.classList.add('is-success');
      }

      return data.exists; // assuming the backend sends a JSON response with an 'exists' key
    } else {
      console.error('Failed to check username');
      return false;
    }
  } catch (err) {
    console.error('Error checking username:', err);
  }
};

document.querySelector('#username-signup').addEventListener('blur', async (event) => {
  const username = event.target.value.trim();
  if (username) {
    const exists = await checkUsernameExists(username);
    if (exists) {
      alert('Username already taken!');
      // Alternatively, you can provide a more user-friendly feedback, e.g., changing input color or displaying a message on the page.
    }
  }
});


const checkEmailExists = async (email) => {
  try {
    const response = await fetch(`/api/users/check-email/${email}`);
  
    if (response.ok) {
      const data = await response.json();
      const helpElementEmail = document.getElementById('email-signup-help');
      const helpElementEmailbox = document.getElementById('email-signup');
      const helpElementEmailicon = document.getElementById('email-signup-icon');

      if (data.exists) {
        helpElementEmailicon.classList.add('fa-exclamation-triangle');
        helpElementEmailicon.classList.remove('fa-check');
        helpElementEmailbox.classList.remove('is-success');
        helpElementEmailbox.classList.add('is-danger');
        helpElementEmail.textContent = 'This email is already taken.';
        helpElementEmail.classList.remove('is-success');
        helpElementEmail.classList.add('is-danger');
      } else {
        helpElementEmailicon.classList.remove('fa-exclamation-triangle');
        helpElementEmailicon.classList.add('fa-check');
        helpElementEmailbox.classList.add('is-success');
        helpElementEmailbox.classList.remove('is-danger');
        helpElementEmail.textContent = 'This email has not been used.';
        helpElementEmail.classList.remove('is-danger');
        helpElementEmail.classList.add('is-success');
      }

      return data.exists; // assuming the backend sends a JSON response with an 'exists' key
    } else {
      console.error('Failed to check email');
      return false;
    }
  } catch (err) {
    console.error('Error checking email:', err);
  }
};

document.querySelector('#email-signup').addEventListener('blur', async (event) => {
  const email = event.target.value.trim();
  if (email) {
    const exists = await checkEmailExists(email);
    if (exists) {
      alert('Email already taken!');
      // Alternatively, you can provide a more user-friendly feedback, e.g., changing input color or displaying a message on the page.
    }
  }
});





const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const tC = document.querySelector('#tC');
  

  if (name && email && password && tC.checked) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};


document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);


