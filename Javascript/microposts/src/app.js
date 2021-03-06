import { http} from './http';
import {ui} from './ui';

//get post on dom load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add post
document.querySelector('.post-submit').addEventListener('click',submitPost);

//delete post
document.querySelector('#posts').addEventListener('click', deletePost);

//Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

//listen for cancel
document.querySelector('.card-form').addEventListener('click',cancelEdit);

//get posts
function getPosts(){
    http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

//submit Post
function submitPost(){
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

    const data = {
        title,
        body
    }

    if(title === '' || body === ''){
        ui.showAlert('please fill in all fields', 'alert alert-danger');
    }
    else{
        //check for id
        if(id === ''){
              //create post
        http.post('http://localhost:3000/posts',data)
        .then(data => {
            ui.showAlert('post Added','alert alert-success');
            ui.clearFields();
            getPosts();
        })
        .catch(err => console.log(err));

        }else{
            console.log(`${id}`);
              //update post
        http.put(`http://localhost:3000/posts/${id}`,data)
        .then(data => {
            ui.showAlert('post updated','alert alert-success');
           ui.changeFormState('add');
            getPosts();
        })
        .catch(err => console.log(err));

        }
        
      

    }

    

}

//Delete POst
function deletePost(e){
   
   // console.log('delete');
    if(e.target.parentElement.classList.contains('delete')){
        const id = e.target.parentElement.dataset.id;
        if(confirm('Are you sure?')){
            http
            .delete(`http://localhost:3000/posts/${id}`)
            .then(data =>{
                ui.showAlert('Post Removed', 'alert alert-success');
                
                getPosts();
            })
            .catch(err => console.log(err));
        }
    }
    e.preventDefault();
}

function enableEdit(e){
    if(e.target.parentElement.classList.contains('edit')){
      const id = e.target.parentElement.dataset.id;
      const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
      const body = e.target.parentElement.previousElementSibling.textContent;

      const data = {
          id,
          title,
          body
        }

        //fill the form with current post
        ui.fillForm(data);
      }
      e.preventDefault();
    }

    //cancel edit state
    function cancelEdit(e){
        if(e.target.classList.contains('post-cancel')){
            ui.changeFormState('add');
        }
        e.preventDefault();

    }
   
