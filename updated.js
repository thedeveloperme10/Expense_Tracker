var form = document.getElementById('form');
var object = JSON.parse(localStorage.getItem('object'));

if(object==null){
    object = {
        incomes_sum:0,
        expenses_sum:0,
        incomes:{},
        expenses: {},
    };
    localStorage.setItem('object', JSON.stringify(object));
}
calc();
form.addEventListener('submit',function(e){
    e.preventDefault();
    let description = document.getElementById('text_value').value;
    let amount = document.getElementById('amount_value').value;
    
    if(amount>=0){
        if (description in object.incomes && object.incomes[description] == amount){
            alert("Oops!!! You have already entered this income");
        }
        else if (description in object.incomes) {
            let confirm_again = window.confirm("Description is already there, Click Ok for Updating the value!");
            if (confirm_again) {
                object.incomes_sum = parseInt(object.incomes_sum)-parseInt(object.incomes[description]);
                object.incomes[description] = parseInt(amount);
                object.incomes_sum = parseInt(object.incomes_sum)+parseInt(amount);                
            }
        }else{
            object.incomes[description] = amount;
            object.incomes_sum = parseInt(object.incomes_sum) + parseInt(amount);
        }
        calc();
    }else{
        amount=-amount;
        if (description in object.expenses && object.expenses[description] == amount) {
            alert("Oops!!! You have already entered this expense");
        }else if (description in object.expenses) {
            let confirm_again = window.confirm("Description is already there, Click Ok for Updating the value!");
            if (confirm_again) {
                object.expenses_sum=parseInt(object.expenses_sum)-parseInt(object.expenses[description]);
                object.expenses[description] = parseInt(amount);
                object.expenses_sum=parseInt(object.expenses_sum)+ parseInt(amount);
            }
        } else {
            object.expenses[description] = amount;
            object.expenses_sum = parseInt(object.expenses_sum)+parseInt(amount);
        }
        calc();
    }
    
    localStorage.setItem('object',JSON.stringify(object));
    form.reset();
});


function calc(){
   let h = document.createElement('h2');
    h.innerText ="INCOME - "+ object.incomes_sum;
    document.getElementById('income_total').innerHTML='';
    document.getElementById('income_total').append(h);
    document.getElementById('result').innerHTML = '';
    for(value in object.incomes){
         var h1 = document.createElement('LI');
         h1.innerHTML = value + " " + object.incomes[value];
         document.getElementById('result').append(h1);

         let button1 = document.createElement('button');
         button1.innerHTML = "X";
         button1.value = value;
         button1.addEventListener('click',function(){
             object.incomes_sum-=parseInt(object.incomes[button1.value]);
             delete object.incomes[button1.value];
             localStorage.setItem('object',JSON.stringify(object));
            calc();
         });
         document.getElementById('result').append(button1);
    }

    let h2 = document.createElement('h2');
    h2.innerText = "EXPENSES - "+ (object.expenses_sum);
    document.getElementById('expenses_total').innerHTML = '';
    document.getElementById('expenses_total').append(h2);
    document.getElementById('result1').innerHTML = '';
    for (value in object.expenses) {
        var h1 = document.createElement('LI');
        h1.innerHTML = value + " " + object.expenses[value];
        document.getElementById('result1').append(h1);

        let button1 = document.createElement('button');
        button1.innerHTML = "X";
        button1.value = value;
        button1.addEventListener('click', function () {
            object.expenses_sum -= parseInt(object.expenses[button1.value]);
            delete object.expenses[button1.value];
            localStorage.setItem('object', JSON.stringify(object));
            calc();
        });
        document.getElementById('result1').append(button1);
    }

    let h3 = document.createElement('h2');
    h3.innerText = parseInt(object.incomes_sum) - parseInt(object.expenses_sum);
    document.getElementById('result2').innerHTML = '';
    document.getElementById('result2').append(h3);

}
