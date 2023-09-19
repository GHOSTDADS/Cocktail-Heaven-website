
document.addEventListener('DOMContentLoaded', function () {
    const likeBTN = document.getElementById('like-btn');
    const userID = likeBTN.dataset.user;
    const loggedUserID = likeBTN.dataset.loggedin;

    console.log(likeBTN);
    console.log(userID);
    console.log(loggedUserID);
})

