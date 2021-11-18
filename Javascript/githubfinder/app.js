
const github = new github
const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keyup',(e) => {

const userText = e.target.value;

if(userText !== ''){
    console.log(userText);
    // gitHub.getUser(userText)
    // .then(data => {
    //     console.log(data);
    // })
}
});