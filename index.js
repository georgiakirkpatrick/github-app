'use strict';

const searchURL = 'https://api.github.com/users/';

let username = $('input').val().toLowerCase()
// Defines the user-input username.

function displayRepos(responseJson) {
    // This function runs after getRepos(username).  If the user-input handle is not found, a
    // message is displayed saying no repos are available for that handle.
    console.log('response', responseJson)
    $('.js-results').empty()
    if (responseJson.length === 0) {
        console.log('no repos found for that user')
        $('.js-results').prepend(`<h2>No repos found for ${username}</h2>`)
    }

    else {
        // If there are repos associated with the handle, they are displayed.
        console.log(`Username was found! responseJson.length is ${responseJson.length}`)
        $('.js-results').prepend(`<h2>Here are ${username}'s ${responseJson.length} repos:</h2>`)
        for (let i = 0; i < responseJson.length; i++) {
            console.log(`result ${i} was displayed`)
            $('.js-results').append(`<h3>${i + 1}. ${responseJson[i].name}</h3>
            <p><a href = "${responseJson[i].html_url}">${responseJson[i].html_url}</p>`)
        }
    }
}

function getRepos(username) {
    // This function fetches the repos from the GitHub API.
    console.log('`getRepos` ran')
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(responseJson => 
            displayRepos(responseJson))
        .catch(error => {
            console.log("There is an error.")
        })
}

function submitForm() {
    // This function runs when the form is submitted.  It sends the user an alert if they submit the
    // form with nothing in the input field.  Otherwise, it converts the entry to lowercase text so 
    // that it will work with dog.ceo's API.  Then it triggers the getDogImage function.
    $('.js-submit').on('click', function() {
        console.log('Form was submitted.')
        event.preventDefault()
        if (!$("input[name='GitHub-handle']").val()) {
            alert('Please enter a username.')
        }

        else {
            username = $('input').val().toLowerCase()
            getRepos(username)
        }
    })
}

$(function() {
// This function makes all the JavaScript functions work.
  console.log('App loaded! Waiting for submit!')
  submitForm()
})