document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/dados/')
        .then(response => response.json())
        .then(data => {
            const dadosLista = document.getElementById('dados-lista');
            data.forEach(dado => {
                const li = document.createElement('li');
                li.textContent = `Sensor: ${dado.Sensor}, Botão: ${dado.Botao}, Liga Robô: ${dado.LigaRobo}, Reset Contador: ${dado.ResetContador}, Valor Contagem: ${dado.ValorContagem}`;
                dadosLista.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));

    const addForm = document.getElementById('add-form');
    addForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(addForm);
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = key === 'sensor' || key === 'botao' || key === 'reset' ? value === 'on' : value;
        });
        fetch('/api/dados/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
        .then(response => response.json())
        .then(data => {
            alert('Dado adicionado com sucesso!');
            window.location.href = 'index.html';
        })
        .catch(error => console.error('Erro ao adicionar dado:', error));
    });
});