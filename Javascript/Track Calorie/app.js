//Storage controller

const StorageCtrl = (function(){

    //public methods
    return{
        storeItem: function(item){
            let items ;
           if(localStorage.getItem('items') === null){
               let items = [];
               items.push(item);
               localStorage.setItem('items',JSON.stringify(items));
           }else{
            items = JSON.parse(localStorage.getItem('items'));
            items.push(item);
            localStorage.setItem('items',JSON.stringify(items));

           }
        },
        getItemsStorage: function(){
            let items;
            if(localStorage.getItem('items')==null){
                items = [];
            }else{
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        }
    }
})();

//Item controller
const ItemCtrl = (function(){
    //console.log("item controller");
    //Item Constructor
    const Item = function(id,name,calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data stucture/state 
    const data = {
        // 
        items: StorageCtrl.getItemsStorage(),
        currentItem: null,
        totalCalories: 0
    }
    
    return{
        addItem: function(name , calories){
            let ID;
            if(data.items.length > 0){
                ID = data.items[data.items.length-1].id+1;

            }
            else{
                ID = 0;
            }
            calories =parseInt(calories);

            newItem = new Item(ID,name,calories);

            data.items.push(newItem);

            return newItem;

        },
        getItems: function(){
            return data.items;
        },
        getItemById: function(id){
            let found = null;
            data.items.forEach(function(item){
                if(item.id === id){
                    found = item;

                }
            });
            return found;

        },
        updateItem: function(name , calories){
            calories =parseInt(calories);
            let found = null;
            data.items.forEach(function(item){
                if(item.id == data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    found = item;

                }
            });
            return found;

        },
        deleteItem: function(id){
            //get id
           const ids = data.items.map(function(item){
               return item.id;
           });
           //get index
           const index = ids.indexOf(id);

           //Remove item
           data.items.splice(index , 1);
        },
        clearAllItems: function(){
            data.items = [];

        },
        setCurrentItem: function(item){
            data.currentItem = item;
           
        },
        getCurrentItem: function(){
            return data.currentItem;

        },
        getTotalCalorie: function(){
            let total = 0;
            data.items.forEach(function(item){
                total += item.calories;
               });
               data.totalCalories = total;
               return data.totalCalories;
        },

        logData: function(){
            return data;
        }
    }

})();

//UI controller

const UICtrl = (function(){
    //console.log("item controller");
    const UISelector = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'

    }

    return{
        populateItemList: function(items){
            let html = '';
            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            </li>`
            });

            //Insert list items
            document.querySelector(UISelector.itemList).innerHTML = html;

        },
        getItemInput: function(){
           return {
               name: document.querySelector(UISelector.itemNameInput).value,
               calories: document.querySelector(UISelector.itemCaloriesInput).value
           } 
        },
        addListItem: function(item){
            document.querySelector(UISelector.itemList).style.display = 'block';
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML =`<strong>${item.name}: </strong><em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`;
            document.querySelector(UISelector.itemList).insertAdjacentElement('beforeend',li);


        },
        updateListItem: function(item){
            let listItems = document.querySelectorAll(UISelector.listItems);
            //turn node list into array 
            listItems = Array.from(listItems);
            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute('id');

                if(itemID == `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>`;
                }

            });

        },
        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();

        },
        clearInput: function(){
            document.querySelector(UISelector.itemNameInput).value = '';
            document.querySelector(UISelector.itemCaloriesInput).value = '';
        },
        addItemToForm: function(){
            document.querySelector(UISelector.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelector.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();

        },
        clearItems: function(){
            let listItems = document.querySelectorAll(UISelector.itemList);

            listItems = Array.from(listItems);

            listItems.forEach(function(item){
                item.remove();

            });

        },
        hideList: function(){
            document.querySelector(UISelector.itemList).style.display = 'none';

        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelector.totalCalories).textContent = totalCalories;

        },
        clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(UISelector.updateBtn).style.display = 'none';
            document.querySelector(UISelector.deleteBtn).style.display = 'none';
            document.querySelector(UISelector.backBtn).style.display = 'none';
            document.querySelector(UISelector.addBtn).style.display = 'inline';

        },
        showEditState: function(){
           
            document.querySelector(UISelector.updateBtn).style.display = 'inline';
            document.querySelector(UISelector.deleteBtn).style.display = 'inline';
            document.querySelector(UISelector.backBtn).style.display = 'inline';
            document.querySelector(UISelector.addBtn).style.display = 'none';

        },
        getSelectors: function(){
            return UISelector;
        }

    }
})();

//App controller

const App = (function(ItemCtrl, StorageCtrl, UICtrl){
    //console.log(ItemCtrl.logData());
    //load event listeners
    const loadEventListeners = function(){
        const UISelectors = UICtrl.getSelectors();
        document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);
        //diable submit on enter
        document.addEventListener('keypress',function(e){
            if(e.keyCode === 13 || e.which === 13){
                e.preventDefault();
                return false;
            }

        });

        //edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click',itemEditCLick);

        //update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit);
        //back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

         //delete item event
         document.querySelector(UISelectors.deleteBtn).addEventListener('click',itemDeleteSubmit);

          //clear item event
          document.querySelector(UISelectors.clearBtn).addEventListener('click',clearAllItemsClicked);

    }
    //add item submit
    const itemAddSubmit = function(e){
        //Get form input  from UI controller
        const input = UICtrl.getItemInput();
        //console.log(input);
        if(input.name !== '' && input.calories !==''){
            const newItem = ItemCtrl.addItem(input.name , input.calories);
            //get total calories
            const totalCalories = ItemCtrl.getTotalCalorie(); 
            UICtrl.showTotalCalories(totalCalories);

            //Store in local storage
            StorageCtrl.storeItem(newItem);
            UICtrl.clearInput();

            UICtrl.addListItem(newItem);
        }
        
        e.preventDefault();

    }

    const itemEditCLick = function(e){
        //console.log('test');
        if(e.target.classList.contains('edit-item')){
           //Get list item id(item-0,item 1)
           const listId = e.target.parentNode.parentNode.id; 
           //console.log(listId);
           //break into array
           const listIdArr = listId.split('-');
           //console.log(listIdArr);
           //get actual id
           const id = parseInt(listIdArr[1]);
           //get item 
           const itemToEdit = ItemCtrl.getItemById(id);
           //console.log(itemToEdit);
           ItemCtrl.setCurrentItem(itemToEdit);
           //Add item to form
           UICtrl.addItemToForm();

        }
        e.preventDefault();
    }

    const itemUpdateSubmit = function(e){
       // console.log('update');

       //get item input
       const input = UICtrl.getItemInput();

       const updateItem = ItemCtrl.updateItem(input.name , input.calories);
       //UI update
       UICtrl.updateListItem(updateItem);
       const totalCalories = ItemCtrl.getTotalCalorie(); 
       UICtrl.showTotalCalories(totalCalories);

       UICtrl.clearEditState();
        e.preventDefault();
    }

    const itemDeleteSubmit = function(e){
       // console.log(123);
        //get current item

        const currentItem =ItemCtrl.getCurrentItem();
        //Delete from data structure
        ItemCtrl.deleteItem(currentItem.id);
        //delete from UI
        UICtrl.deleteListItem(currentItem.id);

        //UICtrl.updateListItem(updateItem);
        const totalCalories = ItemCtrl.getTotalCalorie(); 
        UICtrl.showTotalCalories(totalCalories);
 
        UICtrl.clearEditState();
        e.preventDefault();
    }

    //Clear items events
    const clearAllItemsClicked = function(){
       //delete all items from datastructure
       ItemCtrl.clearAllItems();
       const totalCalories = ItemCtrl.getTotalCalorie(); 
       UICtrl.showTotalCalories(totalCalories);

       //Remove from UI
       UICtrl.clearItems();
        
       

    }


    //public Methods
    return{
        init: function(){
            //clear edit state
            UICtrl.clearEditState();
            

            //Fetch items from data structure
            const items = ItemCtrl.getItems();
            //check if any items
            if(items.length === 0){
                UICtrl.hideList();
            }else{
                UICtrl.populateItemList(items);


            }
            const totalCalories = ItemCtrl.getTotalCalorie(); 
            UICtrl.showTotalCalories(totalCalories);

            //populate list with items
           
            loadEventListeners();
        }
    }
})(ItemCtrl,StorageCtrl,UICtrl);

App.init();
