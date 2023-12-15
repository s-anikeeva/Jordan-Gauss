//Ограничение на вычисления матрицы, в дальнейшем может быть увеличена
class matrixLimit{
    constructor(){
        this.XVarMin = 2;
        this.XVarMax = 8;
        this.RowsMin = 2;
        this.RowsMax = 6;
    }

    get getVariableLimits(){
        return {
            Min: this.XVarMin,
            Max: this.XVarMax
        };
    }

    get getRowLimits(){
        return {
            Min: this.RowsMin,
            Max: this.RowsMax
        };
    }
}

//Алгоритм Гаусса-Жордана
function gaussJordan(matrix) {
    const rows = matrix.length;

    for (let i = 0; i < rows; i++) {        

        transfrmMatrix(matrix, i);

        reductionToEdentityMatrix(matrix, i);        
    }
    
    printResponse(matrix);    
}

//Преобразование матрицы для улучшения устойчивости
function transfrmMatrix(matrix, iteration){    

    // Поиск максимального элемента в текущем столбце
    let maxRow = iteration;
    for (let j = iteration + 1; j < rows; j++) {
        if (Math.abs(matrix[j][iteration]) > Math.abs(matrix[maxRow][iteration])) {
            maxRow = j;
        }
    }

    // Обмен строк для улучшения устойчивости
    [matrix[iteration], matrix[maxRow]] = [matrix[maxRow], matrix[iteration]];

    //Вывод устойчивой матрицы
    var transfrmIteration = 0 - (iteration + 1);    
    var tableSize = getTableSize(matrix);
    tableSize.Columns = tableSize.Columns - 1;
    printIteration(transfrmIteration, tableSize);
    printMatrix(matrix, transfrmIteration);
}

//Приведение матрицы к единичной матрице
function reductionToEdentityMatrix(matrix, iteration){    
    let i = iteration;    
    var tableSize = getTableSize(matrix);

    // Приведение к единичной диагональной матрице
    let pivot = matrix[i][i];
    for (let k = 0; k < tableSize.Columns; k++) {
        matrix[i][k] /= pivot;
    }

    // Обнуление элементов в столбцах, кроме текущего
    for (let j = 0; j < tableSize.Rows; j++) {
        if (j !== i) {
            let factor = matrix[j][i];
            for (let k = 0; k < tableSize.Columns; k++) {
                matrix[j][k] -= factor * matrix[i][k];
            }
        }
    }

    tableSize.Columns = tableSize.Columns - 1;
    //Вывод результата
    printIteration(i+1, tableSize);
    printMatrix(matrix, iteration+1);
}

//Возвращает размерность матрицы
function getTableSize(matrix){
    const rows = matrix.length;
    const cols = matrix[0].length;
    var tableSize = 
    { 
        Rows: rows,
        Columns: cols
    };
    return tableSize;
}

//Выводит матрицу на страницу
function printMatrix(matrix, iteration){
    for(var i = 0; i < matrix.length; i++){
        for(var j = 0; j < matrix[0].length; j++){
            var tableDiv = document.getElementById("tableIteration" + iteration);
            var element = tableDiv.querySelectorAll("label#"+ "x" + i + "" + j);
            if(j == matrix[0].length - 1){
                element = tableDiv.querySelectorAll("label#"+ "b" + i);
            }
            element[0].append(matrix[i][j]);
        }
    }
}

//Выводит итерацию на страницу с матрицей
function printIteration(iteration, tableSize){

    var parentDiv = document.createElement("div");
    parentDiv.setAttribute("class", "container");
    var divElement = document.createElement("div");
    var labelElement = document.createElement("label");
    var tableIterationId = "tableIteration" + iteration;
    var divTablElement = document.createElement("div");   

    divTablElement.setAttribute("id", tableIterationId);
    
    labelElement.setAttribute("id", "labelIteration" + iteration);
    var messageLabel ="";
    if(iteration < 0){
        messageLabel = "Выполнение преобразования для лучшей устойчивости.";
    }
    else{
        messageLabel = "Итерация выполнения №" + iteration;
    }
    labelElement.append(messageLabel);
    divElement.setAttribute("id", "divIteration" + iteration);
    divElement.appendChild(labelElement);
    parentDiv.appendChild(divElement);
    parentDiv.appendChild(divTablElement);

    document.body.appendChild(parentDiv);
    
    PrintTable(tableIterationId, tableSize);
}

//Вывод решения
function printResponse(matrix){    
    let tableSize = getTableSize(matrix);

    // Вывод решения
    var divElement = document.createElement("div");
    var labelElement = document.createElement("label");
    labelElement.innerHTML = "Решение системы уравнений:";
    divElement.setAttribute("id", "response");
    divElement.appendChild(labelElement);

    for (let i = 0; i < tableSize.Rows; i++) {
        var dvElement = document.createElement("div");
        var lblElement = document.createElement("label");

        lblElement.innerHTML = `x${i + 1} = ${matrix[i][tableSize.Columns - 1]}`;
        dvElement.appendChild(lblElement);
        divElement.appendChild(dvElement);
    }

    document.body.appendChild(divElement);
}