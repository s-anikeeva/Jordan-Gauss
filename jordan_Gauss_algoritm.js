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


function gaussJordan(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    for (let i = 0; i < rows; i++) {
        // Поиск максимального элемента в текущем столбце
        let maxRow = i;
        for (let j = i + 1; j < rows; j++) {
            if (Math.abs(matrix[j][i]) > Math.abs(matrix[maxRow][i])) {
                maxRow = j;
            }
        }

        // Обмен строк для улучшения устойчивости
        [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];

        // Приведение к единичной диагональной матрице
        let pivot = matrix[i][i];
        for (let k = 0; k < cols; k++) {
            matrix[i][k] /= pivot;
        }

        // Обнуление элементов в столбцах, кроме текущего
        for (let j = 0; j < rows; j++) {
            if (j !== i) {
                let factor = matrix[j][i];
                for (let k = 0; k < cols; k++) {
                    matrix[j][k] -= factor * matrix[i][k];
                }
            }
        }
    }

    // Вывод решения
    console.log("Решение системы уравнений:");
    for (let i = 0; i < rows; i++) {
        console.log(`x${i + 1} = ${matrix[i][cols - 1]}`);
    }
}