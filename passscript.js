let inputArr = [];
let optabArr = [];

function readFile(inputId, outputId) {
    const fileInput = document.getElementById(inputId);
    const file = fileInput.files[0];
    if (file) {
        const isTextFile = file.type === "text/plain" || file.name.endsWith('.txt');

        if (isTextFile) {
            const reader = new FileReader();

            reader.onload = function (e) {
                document.getElementById(outputId).textContent = e.target.result;
            };

            reader.onerror = function () {
                alert('Error reading file');
            };

            reader.readAsText(file);
        } else {
            alert('Please upload a valid .txt file');
        }
    } else {
        alert('No file selected');
    }
}

document.getElementById('source_code_input').addEventListener('change', function () {
    readFile('source_code_input', 'source_code_input_text');
});
document.getElementById('op_tab_input').addEventListener('change', function () {
    readFile('op_tab_input', 'optab_input_text');
});

function readTextarea() {
    const source_text = document.getElementById('source_code_input_text').textContent;
    const optab_text = document.getElementById('optab_input_text').textContent;

    // Process source text
    if (source_text.trim() === "") {
        console.log('Please enter the source code.');
    } else {
        console.log('source code:', source_text);
        inputArr = source_text.split('\n').map(line => line.trim().split(/\s+/));
        console.log(inputArr);
    }

    // Process optab text
    if (optab_text.trim() === "") {
        console.log('Please enter the optab.');
    } else {
        console.log('optab:', optab_text);
        optabArr = optab_text.split('\n').map(line => line.trim().split(/\s+/));
        console.log(optabArr);
    }
}

document.getElementById('assembleBtn').addEventListener('click', readTextarea);
document.getElementById('resetBtn').addEventListener('click', function () {
    document.getElementById('source_code_input_text').textContent = '';
    document.getElementById('optab_input_text').textContent = '';
});

// Ensure inputArr and optabArr are available globally
// Call pass1 function only after reading the text areas
document.getElementById('assembleBtn').addEventListener('click', function () {
    const pass1out = pass1(inputArr, optabArr);
    const intermediateArr = pass1out.intermediate.split('\n');
    for (let i = 0; i < intermediateArr.length; i++) {
        intermediateArr[i] = intermediateArr[i].trim().split(/\s+/);
    }

    const interrrr = pass1out.intermediate.split('\n');
    const intermediateBody = document.getElementById('intermediateBody');
    intermediateBody.innerHTML = '';
    for (let i = 0; i < interrrr.length; i++) {
        const rowData = interrrr[i].trim().split(/\s+/);
        const tr = document.createElement('tr');
        rowData.forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            tr.appendChild(td);
        });
        intermediateBody.appendChild(tr);
    }

    const symtableBody = document.getElementById('symtabBody');

    // Clear existing content
    symtableBody.innerHTML = '';

    const symtabArr = pass1out.symtab.split('\n');
    for (let i = 0; i < symtabArr.length; i++) {
        symtabArr[i] = symtabArr[i].trim().split(/\s+/);
    }
    const sysm = pass1out.symtab.split('\n');

    for (let i = 0; i < sysm.length; i++) {
        // Trim and split into columns
        const rowData = sysm[i].trim().split(/\s+/);

        // Create a new table row
        const tr = document.createElement('tr');

        // Create cells for each piece of data
        rowData.forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData; // Set the text content
            tr.appendChild(td); // Append cell to row
        });

        // Append the row to the table body
        symtableBody.appendChild(tr);
    }
    // intermediate output table

    const pass2out = pass2(optabArr, intermediateArr, symtabArr)
    console.log(pass2out.output);
    console.log(pass2out.output2);

    const objectcodebody = document.getElementById('objectcodeBody');

    const obb = pass2out.output.split('\n');
    objectcodebody.innerHTML = '';
    for (let i = 0; i < obb.length; i++) {
        const rowData = obb[i].trim().split(/\s+/);
        const tr = document.createElement('tr');
        rowData.forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            tr.appendChild(td);
        });
        objectcodebody.appendChild(tr);
    }
    const po = pass2out.output2.toUpperCase();
    const objectcode2body = document.getElementById('outputBody');
    const op = po.split('\n');
    
    objectcode2body.innerHTML = '';
    for (let i = 0; i < op.length; i++) {
        const rowData = op[i].trim().split(/\s+/);
        const tr = document.createElement('tr');
        rowData.forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            tr.appendChild(td);
        });
        objectcode2body.appendChild(tr);
    }



});


function formattarray(array) {
    return array.map(row =>
        row.map(cell => cell.padEnd(10, ' ')).join('')).join('\n');
}


function pass1(inputArr, optabArr) {
    let locctr = 0, i = 1, prev, top = 0, pos = -1;
    let interAddr = [];
    const symtabArr = [[]];
    let opcode;
    let intermediate = "", symtab = "";

    if (inputArr.length > 0 && inputArr[0][1] === 'START') {
        locctr = parseInt(inputArr[0][2], 16);
        prev = locctr;
    } else {
        locctr = 0;
    }

    while (inputArr[i] && inputArr[i][1] !== 'END') {
        let found = false;
        opcode = inputArr[i][1];
        for (let x = 0; x < optabArr.length; x++) {
            if (optabArr[x][0] === opcode) {
                locctr += 3;
                found = true;
                break;
            }
        }
        if (!found) {
            if (inputArr[i][1] === 'WORD') {
                locctr += 3;
            } else if (inputArr[i][1] === 'RESW') {
                locctr += 3 * parseInt(inputArr[i][2]);
            } else if (inputArr[i][1] === 'RESB') {
                locctr += parseInt(inputArr[i][2]);
            } else if (inputArr[i][1] === 'BYTE') {
                const len = inputArr[i][2].length;
                locctr += len - 3;
            } else {
                console.log("Invalid opcode");
            }
        }
        top++;
        interAddr[top] = prev.toString(16);
        i++;
        prev = locctr;

        // Symbol table logic
        if (inputArr[i] && inputArr[i][0] !== '-') {
            let flag = 0;
            for (let x = 0; x < symtabArr.length; x++) {
                if (symtabArr[x][0] === inputArr[i][0]) {
                    flag = 1;
                    symtabArr[x][2] = 1;
                }
            }
            pos++;
            symtabArr[pos] = [inputArr[i][0], prev.toString(16), flag];
        }
    }
    top++;
    interAddr[top] = prev.toString(16);

    intermediate = "-\t" + inputArr[0][0] + "\t" + inputArr[0][1] + "\t" + inputArr[0][2] + "\n";
    for (let j = 1; j < interAddr.length; j++) {
        intermediate += interAddr[j] + "\t" + inputArr[j][0] + "\t" + inputArr[j][1] + "\t" + inputArr[j][2] + "\n";
    }
    intermediate = intermediate.slice(0, -1);

    for (let j = 0; j < symtabArr.length; j++) {
        symtab += symtabArr[j][0] + "\t" + symtabArr[j][1] + "\t" + symtabArr[j][2] + "\n";
    }
    symtab = symtab.slice(0, -1);

    return { intermediate, symtab };
}


function pass2(optabArr, intermediateArr, symtabArr) {
    let i = 1, objectCode
    let objectCodeArr = []

    while (intermediateArr[i][2] !== 'END') {
        let found = false
        optabArr.forEach((opLine) => {
            if (opLine[0] === intermediateArr[i][2]) {
                found = true
                objectCode = opLine[1]
                symtabArr.forEach((symLine) => {
                    if (symLine[0] === intermediateArr[i][3]) {
                        objectCode += symLine[1]
                        objectCodeArr.push(objectCode)
                    }
                })
            }
        })

        if (!found) {
            if (intermediateArr[i][2] === 'WORD') {
                const val = parseInt(intermediateArr[i][3])
                objectCode = val.toString(16).padStart(6, '0')
                objectCodeArr.push(objectCode)
            }
            else if (intermediateArr[i][2] === 'BYTE') {
                const val = intermediateArr[i][3].substring(2, intermediateArr[i][3].length - 1)
                objectCode = ""
                for (let char of val) {
                    objectCode += char.charCodeAt(0).toString(16)
                }
                objectCodeArr.push(objectCode)
            }
            else if (intermediateArr[i][2] === 'RESW' || intermediateArr[i][2] === 'RESB') {
                objectCode = "\t"
                objectCodeArr.push(objectCode)
            }
        }
        i++
    }
    objectCodeArr.push("\t")

    let output = intermediateArr[0][0] + "\t" + intermediateArr[0][1] + "\t" + intermediateArr[0][2] + "\t" + intermediateArr[0][3] + "\n"
    // console.log(intermediateArr.length)
    for (let j = 1; j < intermediateArr.length; j++) {
        output += intermediateArr[j][0] + "\t" + intermediateArr[j][1] + "\t" + intermediateArr[j][2] + "\t" + intermediateArr[j][3] + "\t" + objectCodeArr[j - 1] + "\n"
    }
    const lower = parseInt(intermediateArr[1][0], 16)
    const upper = parseInt(intermediateArr[intermediateArr.length - 1][0], 16)
    const length = upper - lower
    let output2 = "H^" + intermediateArr[0][1].padEnd(6, "_") + "^" + intermediateArr[1][0] + "^" + length.toString(16).padStart(6, "0") + "\n\n"
    let lines = intermediateArr.length - 1, x = 1, text = "", size = 0, keri = false
    // console.log(objectCodeArr)
    let start = intermediateArr[x][0]
    while (x < intermediateArr.length) {
        keri = false
        if (objectCodeArr[x - 1] === "\t") {
            x++
            continue
        }
        text += "^" + objectCodeArr[x - 1]
        size += objectCodeArr[x - 1].length / 2
        if (size > 21) {
            keri = true
            size -= objectCodeArr[x - 1].length / 2
            text = text.slice(0, -objectCodeArr[x - 1].length - 1)
            output2 += "T^" + start + "^" + size.toString(16).padStart(2, "0") + text + "\n"
            start = intermediateArr[x][0]
            text = ""
            size = 0
            continue
        }
        x++
    }
    if (!keri) {
        output2 += "T^" + start + "^" + size.toString(16).padStart(2, "0") + text + "\n\n"
    }

    output2 += "E^" + intermediateArr[1][0]
    // console.log(output2)

    symtabArr.forEach((symLine) => {
        if (symLine[2] == 1) {
            output = "AUGEYSTOOOO"
            output2 = "AUGEYSTOOOO"
        }
    })

    return { output, output2 }
}