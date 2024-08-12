// script.js

let boxes = [];

function addBox() {
    const boxTypeSelect = document.getElementById('box-type');
    const quantityInput = document.getElementById('quantity');
    
    const boxData = boxTypeSelect.value.split(',');
    const boxType = boxData[0];
    const boxWidth = parseFloat(boxData[1]);
    const boxHeight = parseFloat(boxData[2]);
    const boxLength = parseFloat(boxData[3]);
    const quantity = parseInt(quantityInput.value);

    if (quantity > 0) {
        boxes.push({
            type: boxType,
            width: boxWidth,
            height: boxHeight,
            length: boxLength,
            quantity: quantity
        });

        quantityInput.value = '';  // Clear input field
        displayBoxes();
    }
}

function displayBoxes() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    let totalVolume = 0;
    boxes.forEach(box => {
        const boxVolume = box.width * box.height * box.length;
        const totalBoxVolume = boxVolume * box.quantity;
        totalVolume += totalBoxVolume;
        
        resultDiv.innerHTML += `<p>Tipo de Caja ${box.type}: ${box.quantity} cajas (${box.width}x${box.height}x${box.length} cm) - Volumen Total: ${totalBoxVolume} cm³</p>`;
    });
}

function calculate() {
    const containerWidth = parseFloat(document.getElementById('container-width').value);
    const containerHeight = parseFloat(document.getElementById('container-height').value);
    const containerLength = parseFloat(document.getElementById('container-length').value);
    
    const containerVolume = containerWidth * containerHeight * containerLength;
    
    if (containerVolume <= 0) {
        alert('Las dimensiones del contenedor deben ser mayores a cero.');
        return;
    }

    let totalBoxVolume = 0;
    boxes.forEach(box => {
        const boxVolume = box.width * box.height * box.length;
        totalBoxVolume += boxVolume * box.quantity;
    });

    const containersNeeded = Math.ceil(totalBoxVolume / containerVolume);
    const volumeUsed = containersNeeded * containerVolume;
    const volumeUnused = volumeUsed - totalBoxVolume;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML += `
        <h2>Resultado del Cálculo</h2>
        <p>Dimensiones del Contenedor: ${containerWidth}x${containerHeight}x${containerLength} cm</p>
        <p>Volumen del Contenedor: ${containerVolume} cm³</p>
        <p>Cantidad Total de Cajas: ${boxes.reduce((total, box) => total + box.quantity, 0)}</p>
        <p>Cantidad de Contenedores Necesarios: ${containersNeeded}</p>
        <p>Volumen Total Utilizado: ${totalBoxVolume} cm³</p>
        <p>Volumen No Utilizado: ${volumeUnused} cm³</p>
    `;
}
