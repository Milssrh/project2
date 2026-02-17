let expenses = [];
let nextId = 1;

function addExpense(title, amount, category) {
    if (title === "" || amount <= 0 || category === "" || isNaN(amount)) {
        console.log("Ошибка: данные неверные");
        return;
    }
    
    let expense = {
        id: nextId,
        title: title,
        amount: amount,
        category: category
    };
    
    expenses.push(expense);
    nextId++;
    console.log("Расход добавлен: " + title);
}

function printAllExpenses() {
    console.log("\n ВСЕ РАСХОДЫ");
    if (expenses.length === 0) {
        console.log("Расходов нет");
        return;
    }
    
    for (let i = 0; i < expenses.length; i++) {
        let e = expenses[i];
        console.log(e.id + " | " + e.title + " | " + e.amount + "руб | " + e.category);
    }
}

function getTotalAmount() {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total = total + expenses[i].amount;
    }
    
    console.log("\n ЧЕК");
    console.log("Всего потрачено: " + total + " рублей");
    return total;
}

function getExpensesByCategory(category) {
    let result = [];
    let total = 0;
    
    console.log("\n КАТЕГОРИЯ: " + category + "");
    
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].category === category) {
            result.push(expenses[i]);
            total = total + expenses[i].amount;
            console.log(expenses[i].title + " - " + expenses[i].amount + "руб");
        }
    }
    
    if (result.length > 0) {
        console.log("Итого по категории: " + total + "руб");
    } else {
        console.log("Нет расходов в этой категории");
    }
    
    return result;
}

function findExpenseByTitle(search) {
    if (search === "") {
        console.log("Ошибка: строка поиска пустая");
        return null;
    }
    
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].title.indexOf(search) !== -1) {
            let expense = expenses[i];
            console.log("\n НАЙДЕНО");
            console.log("ID: " + expense.id);
            console.log("Название: " + expense.title);
            console.log("Сумма: " + expense.amount + "руб");
            console.log("Категория: " + expense.category);
            console.log("Дополнительно: важный расход");
            return expense;
        }
    }
    
    console.log("Ничего не найдено");
    return null;
}

let expenseTracker = {
    expenses: expenses,
    
    addExpense: function(title, amount, category) {
        addExpense(title, amount, category);
    },
    
    getTotalAmount: function() {
        return getTotalAmount();
    },
    
    getExpensesByCategory: function(category) {
        return getExpensesByCategory(category);
    },
    
    findExpenseByTitle: function(search) {
        return findExpenseByTitle(search);
    },
    
    nextExpense: function() {
        console.log("\n ПЕРЕКЛЮЧЕНИЕ");
        if (expenses.length === 0) {
            console.log("Нет расходов");
            return;
        }
        let randomIndex = Math.floor(Math.random() * expenses.length);
        let e = expenses[randomIndex];
        console.log("Текущий: " + e.title + " (" + e.amount + "руб)");
    },
    
    deleteExpenseById: function(id) {
        let newExpenses = [];
        let found = false;
        
        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].id === id) {
                console.log("Удален: " + expenses[i].title);
                found = true;
            } else {
                newExpenses.push(expenses[i]);
            }
        }
        
        if (found) {
            expenses = newExpenses;
            this.expenses = expenses;
        } else {
            console.log("ID " + id + " не найден");
        }
    },
    
    printCategoryStats: function() {
        console.log("\n СТАТИСТИКА ПО КАТЕГОРИЯМ");
        let cats = [];
        for (let i = 0; i < expenses.length; i++) {
            let category = expenses[i].category;
            let found = false;
            
            for (let j = 0; j < cats.length; j++) {
                if (cats[j] === category) {
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                cats.push(category);
            }
        }
        for (let i = 0; i < cats.length; i++) {
            let cat = cats[i];
            let total = 0;
            let count = 0;
            
            for (let j = 0; j < expenses.length; j++) {
                if (expenses[j].category === cat) {
                    total = total + expenses[j].amount;
                    count++;
                }
            }
            
            console.log(cat + ": " + count + " операций, " + total + "руб");
        }
        
        if (cats.length === 0) {
            console.log("Нет данных");
        }
    }
};
console.log("ТРЕКЕР РАСХОДОВ\n");
addExpense("Пицца", 500, "Еда");
addExpense("Такси", 300, "Транспорт");
addExpense("Кофе", 200, "Еда");
addExpense("Книга", 400, "Развлечения");

printAllExpenses();
getTotalAmount();

getExpensesByCategory("Еда");

findExpenseByTitle("Кофе");

expenseTracker.nextExpense();
expenseTracker.nextExpense();

expenseTracker.printCategoryStats();

console.log("\n УДАЛЕНИЕ");
expenseTracker.deleteExpenseById(2); 

printAllExpenses();
getTotalAmount();

console.log("\n ПРОВЕРКА ОШИБОК");
addExpense("", 100, "Еда");     
addExpense("Тест", -50, "Еда");    
addExpense("Тест", 100, ""); 
addExpense("Тест", "не число", "Еда");
