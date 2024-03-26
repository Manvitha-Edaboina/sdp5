function uploadCSV() {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('csvFile', file);
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.error('Error:', error));
}

function generateData() {
    fetch('/generate')
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.getElementById('downloadLink');
        a.href = url;
        a.download = 'synthetic_data.csv';
        a.style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
}

