document.getElementById('button1').addEventListener('click',loadCustomer);
document.getElementById('button2').addEventListener('click',loadCustomers);

function loadCustomer(e){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'customer.json',true);

    xhr.onload = function(){

    if(this.status === 200){
        //console.log(this.responseText);

        const customer = JSON.parse(this.responseText);
        //console.log(customer);

        const output = ` 
        <ul>
        <li>ID: ${customer.id}</li>
        <li>Name: ${customer.name}</li>
        <li>Name: ${customer.company}</li>
        <li>Phone: ${customer.phone}</li>

        </ul>
        `;
        document.getElementById('customer').innerHTML = output;

    }
    }
    xhr.send();
}


function loadCustomers(e){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'customers.json',true);

    xhr.onload = function(){

    if(this.status === 200){
        //console.log(this.responseText);

        const customers = JSON.parse(this.responseText);
        //console.log(customer);

        let outputs;

        customers.forEach(function(customer){
            outputs += ` 
        <ul>
        <li>ID: ${customer.id}</li>
        <li>Name: ${customer.name}</li>
        <li>Name: ${customer.company}</li>
        <li>Phone: ${customer.phone}</li>

        </ul>
        `;
    });
        document.getElementById('customers').innerHTML = outputs;

    }
    }
    xhr.send();

      

        
}