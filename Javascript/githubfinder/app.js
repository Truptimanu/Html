
const github = new Github();
const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keyup',(e) => {

const userText = e.target.value;

if(userText !== ''){
    //console.log(userText);
    github.getUser(userText)
    .then(data => {
        console.log(data);
    })
}
});