let expenses = [];
let nextId = 1;

function addExpense(title, amount, category) {
    if (title === "" || amount <= 0 || category === "") {
        console.log("Ошибка: введите корректные данные");
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
    console.log("Расход добавлен!");
}

function printAllExpenses() {
    console.log(" ВСЕ РАСХОДЫ");
    for (let i = 0; i < expenses.length; i++) {
        console.log("ID: " + expenses[i].id + " | " + expenses[i].title + " | " + expenses[i].amount + " руб. | " + expenses[i].category);
    }
    if (expenses.length === 0) {
        console.log("Расходов нет");
    }
}

function getTotalAmount() {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total = total + expenses[i].amount;
    }
    console.log("ЧЕК");
    console.log("Общая сумма расходов: " + total + " руб.");
    return total;
}

function getExpensesByCategory(category) {
    let categoryExpenses = [];
    let categoryTotal = 0;
    
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].category === category) {
            categoryExpenses.push(expenses[i]);
            categoryTotal = categoryTotal + expenses[i].amount;
        }
    }
    
    console.log("КАТЕГОРИЯ: " + category + "");
    if (categoryExpenses.length > 0) {
        for (let i = 0; i < categoryExpenses.length; i++) {
            console.log(categoryExpenses[i].title + " - " + categoryExpenses[i].amount + " руб.");
        }
        console.log("Всего потрачено на " + category + ": " + categoryTotal + " руб.");
    } else {
        console.log("В этой категории расходов нет");
    }
    
    return categoryExpenses;
}

function findExpenseByTitle(searchString) {
    if (searchString === "") {
        console.log("Ошибка: введите строку для поиска");
        return null;
    }
    
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].title.indexOf(searchString) !== -1) {
            console.log("НАЙДЕНО");
            console.log("ID: " + expenses[i].id);
            console.log("Название: " + expenses[i].title);
            console.log("Сумма: " + expenses[i].amount + " руб.");
            console.log("Категория: " + expenses[i].category);
            
            let additionalInfo = "Комментарий: важный расход";
            console.log(additionalInfo);
            
            return expenses[i];
        }
    }
    
    console.log("Расход с названием '" + searchString + "' не найден");
    return null;
}

let expenseTracker = {
    expenses: expenses,
    currentIndex: 0,
    
    addExpense: function(title, amount, category) {
        if (title === "" || amount <= 0 || category === "") {
            console.log("Ошибка: введите корректные данные");
            return;
        }
        
        let expense = {
            id: nextId,
            title: title,
            amount: amount,
            category: category
        };
        
        this.expenses.push(expense);
        nextId++;
        console.log("Расход добавлен через трекер!");
    },
    
    getTotalAmount: function() {
        let total = 0;
        for (let i = 0; i < this.expenses.length; i++) {
            total = total + this.expenses[i].amount;
        }
        console.log("Общая сумма расходов: " + total + " руб.");
        return total;
    },
    
    getExpensesByCategory: function(category) {
        let result = [];
        for (let i = 0; i < this.expenses.length; i++) {
            if (this.expenses[i].category === category) {
                result.push(this.expenses[i]);
            }
        }
        return result;
    },
    
    findExpenseByTitle: function(searchString) {
        for (let i = 0; i < this.expenses.length; i++) {
            if (this.expenses[i].title.indexOf(searchString) !== -1) {
                return this.expenses[i];
            }
        }
        return null;
    },
    
    nextExpense: function() {
        if (this.expenses.length > 0) {
            this.currentIndex = (this.currentIndex + 1) % this.expenses.length;
            console.log("Текущий расход: " + this.expenses[this.currentIndex].title);
        } else {
            console.log("Нет расходов для переключения");
        }
    },
    
    prevExpense: function() {
        if (this.expenses.length > 0) {
            this.currentIndex = (this.currentIndex - 1 + this.expenses.length) % this.expenses.length;
            console.log("Текущий расход: " + this.expenses[this.currentIndex].title);
        } else {
            console.log("Нет расходов для переключения");
        }
    },
    
    deleteExpenseById: function(id) {
        let newExpenses = [];
        let found = false;
        
        for (let i = 0; i < this.expenses.length; i++) {
            if (this.expenses[i].id === id) {
                found = true;
                console.log("Расход '" + this.expenses[i].title + "' удален");
            } else {
                newExpenses.push(this.expenses[i]);
            }
        }
        
        if (!found) {
            console.log("Расход с ID " + id + " не найден");
            return;
        }
        
        this.expenses = newExpenses;
        expenses = newExpenses;
    },
    
    printCategoryStats: function() {
        let categories = [];
        
        for (let i = 0; i < this.expenses.length; i++) {
            let found = false;
            for (let j = 0; j < categories.length; j++) {
                if (categories[j] === this.expenses[i].category) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                categories.push(this.expenses[i].category);
            }
        }
        
        console.log("СТАТИСТИКА ПО КАТЕГОРИЯМ");
        
        if (categories.length === 0) {
            console.log("Нет расходов для статистики");
        } else {
            for (let i = 0; i < categories.length; i++) {
                let categoryTotal = 0;
                let categoryCount = 0;
                
                for (let j = 0; j < this.expenses.length; j++) {
                    if (this.expenses[j].category === categories[i]) {
                        categoryTotal = categoryTotal + this.expenses[j].amount;
                        categoryCount++;
                    }
                }
                
                console.log(categories[i] + ": " + categoryCount + " операций, всего " + categoryTotal + " руб.");
            }
        }
        
    }
};

console.log("ТЕСТИРУЕМ ТРЕКЕР РАСХОДОВ\n");

addExpense("Обед", 350, "Еда");
addExpense("Такси", 500, "Транспорт");
addExpense("Кофе", 150, "Еда");

printAllExpenses();
getTotalAmount();

getExpensesByCategory("Еда");
findExpenseByTitle("Кофе");

console.log("\n ПРОВЕРКА НЕКОРРЕКТНОГО ВВОДА");
addExpense("", 300, "Еда");
addExpense("Покупка", -100, "Другое");
addExpense("Покупка", 300, "");

console.log("\n РАБОТА С ТРЕКЕРОМ");
expenseTracker.addExpense("Кино", 800, "Развлечения");
expenseTracker.addExpense("Метро", 65, "Транспорт");

console.log("\n Переключение между расходами");
expenseTracker.nextExpense();
expenseTracker.nextExpense();
expenseTracker.prevExpense();

console.log("\n Статистика");
expenseTracker.printCategoryStats();

console.log("\n Удаление расхода");
if (expenseTracker.expenses.length > 0) {
    let idToDelete = expenseTracker.expenses[0].id;
    console.log("Удаляем расход с ID: " + idToDelete);
    expenseTracker.deleteExpenseById(idToDelete);
}

console.log("\n ПОСЛЕ УДАЛЕНИЯ");
printAllExpenses();