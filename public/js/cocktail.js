//grabs all the needed data on page load.
document.addEventListener('DOMContentLoaded', function () {
    const likeBTN = document.getElementById('like-btn');
    const likeSection = document.getElementById('like-section');
    const userID = likeSection.dataset.user;
    const loggedUserID = likeSection.dataset.loggedin;
    const likeCounter = document.getElementById('like-counter');
    const targetID = likeCounter.dataset.cocktail;
    //sets th like count to int so we can manipulate it easier.
    var likeCount = parseInt(likeCounter.dataset.count);

    //checks if the user thats logged in is the one that created the cocktail, removes the like button if so.
    if (loggedUserID == userID) {
        likeBTN.remove();
    };

    //function for adding likes to Likes in the cocktail database table.
    function addLikes() {
        likeCount++;

        const dataToUpdate = {
            likes: (likeCount)
        };

        //fetch call to update the database
        fetch(('/api/cocktails/'+targetID), {
            method: 'PUT',
            body: JSON.stringify(dataToUpdate),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(data => {
            //refreshes the page to reload all the variables
            document.location.replace(`/cocktail/` + targetID);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
    }

    //event listner on the like button.
    likeBTN.addEventListener('click', function () {
        addLikes();
    })
});

