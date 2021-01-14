let income_array=[],expense_array=[];
function calc(){
    let flag=0;
    let text = document.getElementById('text_value').value;
    let amount = document.getElementById('amount_value').value;
    if (text === '') {
        document.getElementsByTagName("small")[0].innerHTML = "Description is required";
        flag=1;
    }else{
        document.getElementsByTagName("small")[0].innerHTML = "";
    }
    if (amount === '') {
        document.getElementsByTagName("small")[1].innerHTML = "Amount is required";
        flag=1;
    }else{
        document.getElementsByTagName("small")[1].innerHTML = ""
    }
    amount=parseInt(amount);
    if(amount<0 && flag===0){
        expense_array.push(amount);
        var h2 = document.createElement('LI');
        var text2 = document.createTextNode(text + "   -   " + (-amount));
        h2.appendChild(text2);
        document.getElementById('result1').appendChild(h2);
    }else if(amount>=0 && flag===0){
        income_array.push(amount);
        var h1 = document.createElement('LI');
        var text1 = document.createTextNode(text+"  "+amount);
        h1.appendChild(text1);
        document.getElementById('result').appendChild(h1);
    }
    let sum=0;
    for(let i=0;i<income_array.length;i++){
        sum+=income_array[i];
    }
    let expense_sum = 0;
    for (let i = 0; i < expense_array.length; i++) {
        expense_sum += -(expense_array[i]);
    }
    document.getElementById('result2').innerHTML='';
    var h3 = document.createElement('h2');
    var text3 = document.createTextNode(sum-expense_sum);
    h3.appendChild(text3);
    document.getElementById('result2').appendChild(h3);
    document.getElementById('text_value').value='';
    document.getElementById('amount_value').value = '';
    income_total();
    expense_total();
}

function myFunctionIncome() {
    let delete_value_income = document.getElementById('delete_value_income').value;
    document.getElementById("result").childNodes[delete_value_income-1].outerHTML = '';
    document.getElementById('delete_value_income').value='';
    let val=delete_value_income-1;
    balance_rectify_income(val);
}

function myFunctionExpense() {
    let delete_value_expense = document.getElementById('delete_value_expense').value;
    document.getElementById("result1").childNodes[delete_value_expense - 1].outerHTML = '';
    document.getElementById('delete_value_expense').value = '';
    let val=delete_value_expense-1;
    balance_rectify_expense(val);
}

function balance_rectify_income(val){
    let sum = 0;
    income_array.splice(val, 1);
    for (let i = 0; i < income_array.length; i++) {
        sum += income_array[i];
    }
    let expense_sum = 0;
    for (let i = 0; i < expense_array.length; i++) {
        expense_sum += -(expense_array[i]);
    }
    document.getElementById('result2').innerHTML = '';
    var h3 = document.createElement('h2');
    var text3 = document.createTextNode(sum - expense_sum);
    h3.appendChild(text3);
    document.getElementById('result2').appendChild(h3);
    income_total();
    expense_total();
}

function balance_rectify_expense(val){
    let sum = 0;
    for (let i = 0; i < income_array.length; i++) {
        sum += income_array[i];
    }
    let expense_sum = 0;
    expense_array.splice(val, 1);
    for (let i = 0; i < expense_array.length; i++) {
        expense_sum += -(expense_array[i]);
    }
    document.getElementById('result2').innerHTML = '';
    var h3 = document.createElement('h2');
    var text3 = document.createTextNode(sum - expense_sum);
    h3.appendChild(text3);
    document.getElementById('result2').appendChild(h3);
    income_total();
    expense_total();
}

function income_total(){
    let income_sum = 0;
    for (let i = 0; i < income_array.length; i++) {
        income_sum += income_array[i];
    }
    var h = document.createElement('h4');
    var income_text = document.createTextNode("INCOME - " + income_sum);
    h.appendChild(income_text);
    document.getElementById('income_total').innerHTML = '';
    document.getElementById('income_total').appendChild(h);
}

function expense_total(){
    let expense_sum_total = 0;
    for (let i = 0; i < expense_array.length; i++) {
        expense_sum_total += -(expense_array[i]);
    }
    var h = document.createElement('h4');
    var expense_text = document.createTextNode("EXPENSES - " + expense_sum_total);
    h.appendChild(expense_text);
    document.getElementById('expenses_total').innerHTML = '';
    document.getElementById('expenses_total').appendChild(h);
}
