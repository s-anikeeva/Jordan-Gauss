        //Выполняется при загрузки страницы
        //Устанавливает значения по умолчанию:
        //1. Количество строк
        //2. Количество неизвестных
        function pageOnLoad(){
            const matrixLimits = new matrixLimit();
            addOptions('xVariable', matrixLimits.getVariableLimits);
            addOptions('rows', matrixLimits.getRowLimits);
        }

        //Печатает таблицу
        //Добавляет в елемент select(dropdown) значения
        function addOptions(elementId, limit){
            var element = document.getElementById(elementId);
                    for(var i = limit.Min; i <= limit.Max; i++){
                var opt = document.createElement('option');
                opt.value = i;
                opt.innerHTML = i;
                element.appendChild(opt);
            }
        }

        //Рисует таблицу ввода
        function drawInputTable(){
            var tableSize = GetTableSize();

            PrintTable("inputTable", tableSize);
            button = document.getElementById("drawTableButton");
            button.setAttribute("id", "solveButton");
            button.setAttribute("onclick", "solve()");
            button.innerHTML = "Рассчитать";
        }

        //Возвращает размер таблицы
        function GetTableSize(){            
            let columnsElement = document.getElementById("xVariable");
            let rowsElement = document.getElementById("rows");

            let rowsCount = rowsElement.value;
            let columnsCount = columnsElement.value;

            var tableSize = {
                Rows: rowsCount,
                Columns: columnsCount
            };

            return tableSize;
        }

        //Выполняет решение методом Гаусса-Жордана
        function solve(){
            disableMatrixForm();
            var matrix = GetMatrixByInputElements();
            gaussJordan(matrix);
        }

        //Возвращает массив введённых элементов
        function GetMatrixByInputElements(){
            var tableSize = GetTableSize();

            let matrix = [];
            for (var i = 0; i < tableSize.Rows; i++){
                var arr = new Array(tableSize.Columns);
                matrix.push(arr);

            }
            
            for(var i = 0; i < tableSize.Rows; i++){
                for(var j = 0; j <= tableSize.Columns; j++){
                    var xij = document.getElementById("x" + i + "" + j);
                    if(xij){
                        matrix[i][j] = parseFloat(xij.value);
                    }
                    else{
                        var bi = document.getElementById("b" + i);
                        matrix[i][j] = parseFloat(bi.value);
                    }
                }
            }

            return matrix;
        }

        //Уберает возможность редактирования вводимых значений
        function disableMatrixForm(){
            var textBoxes = document.getElementsByTagName("input");
            for(var i=0; i < textBoxes.length; i++){
                textBoxes[i].setAttribute("readonly", "true");
            }
        }

        //Печатает таблицу
        function PrintTable(tableId, tableSize){
            let tableArea = document.getElementById(tableId);            
            let table = document.createElement("table");
            for(i = 0; i < tableSize.Rows; i++){
                var row = document.createElement("tr");
                for(j = 0; j <= tableSize.Columns; j++){
                    var column = document.createElement("td");
                    column.style.width = "35px";
                    var element = GetElementByTableId(tableId);

                    if(j == parseInt(tableSize.Columns)){
                        element.style.background="bisque";
                        element.setAttribute("id", "b"+i);
                    }
                    else{
                        element.setAttribute("id", "x" + i + "" + j);
                    }
                    element.style.width = "55px";
                    column.appendChild(element);
                    row.appendChild(column);
                }
                table.appendChild(row);
            }
            
            tableArea.appendChild(table);
        }

        //Добавляет элемент в ячейку наблицы
        function GetElementByTableId(tableId){
            if(tableId === "inputTable"){
                var textBox = document.createElement("input");
                textBox.setAttribute("type", "number");
                return textBox;
            }
            else{
                var label = document.createElement("label");
                return label;
            }
        }
