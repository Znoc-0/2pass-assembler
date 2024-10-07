

# 🌐 Web-based SIC Assembler (Pass 1 & Pass 2)

## 🚀 Overview
Welcome to the **SIC Assembler**! 🎉 This web-based application is designed to handle both **Pass 1** and **Pass 2** of the assembly process for the **SIC** (Simplified Instructional Computer) architecture. Built with **HTML**, **Tailwind CSS**, and **JavaScript**, this assembler provides an interactive interface for users to upload files, assemble code, and view output directly on the webpage. Plus, it’s hosted on **Vercel**, ensuring fast and reliable performance! ⚡️

## 🌟 Features
- **Two-Pass Assembly Process**: Efficiently generates the symbol table and object code! 📝
- **File Upload**: Easily upload your source code and OP table files. 📁
- **Output Generation**: View the symbol table, intermediate file, and object code all in one place! 🔍
- **User-Friendly Interface**: Intuitive layout with buttons to assemble code and reset inputs. 🖱️

## 🛠️ Tech Stack
- **HTML**: For structuring the web interface. 📄
- **Tailwind CSS**: For styling and responsive design. 🎨
- **JavaScript**: For handling assembly logic, file uploads, and output generation. ⚙️
- **Vercel**: Cloud platform used for fast, automated deployments. ☁️

## 🎉 Usage
1. **Upload Source Code and OP Tab Files**:
   - Upload your source code file (e.g., `input.txt`) containing assembly instructions.
   - Upload the OP table file (e.g., `optab.txt`) mapping instructions to machine codes.

2. **Click 'Assemble'**:
   - Hit the "Assemble" button to process the files. The assembler will perform both passes. 🔄

3. **View the Output**:
   - Outputs will be displayed in three sections: **Symbol Table**, **Intermediate File**, and **Object Code**. 📊

4. **Reset (Optional)**:
   - Click the "Reset" button to clear the current files and output. 🔄

## 📝 Examples
### 📜 Example Source Code
```
COPY    START   1000
LDA     ALPHA
ADD     ONE
SUB     TWO
STA     BETA
ALPHA   BYTE    C'CSE'
ONE     RESB    2
TWO     WORD    2
BETA    RESW    2
END     1000
```
📑 Example OP Tab
```
Copy code
SUB     05
CMP     03
LDA     00
STA     23
ADD     01
JNC     08
```
📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

