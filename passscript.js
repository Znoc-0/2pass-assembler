function readFile() {
    const input = document.getElementById('source_code_input');
    const textarea = document.getElementById('source_code_input_text');
    
    if (input.files.length === 0) {
        alert('Please select a file.');
        return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;  // File content as string
        textarea.value = content;         // Set the content into the textarea
    };

    reader.readAsText(file);  // Read the file as a text file
}
