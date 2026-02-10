document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.getElementById('tabs-container');
    const tableBody = document.getElementById('table-body');
    let allData = {};

    // 1. Cargar el JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allData = data;
            initializeTabs();
        })
        .catch(error => {
            console.error('Error cargando el JSON:', error);
            tableBody.innerHTML = `<tr><td colspan="9" class="p-4 text-center text-red-500">Error cargando los datos. Asegúrate de ejecutar esto en un servidor local o GitHub Pages.</td></tr>`;
        });

    // 2. Crear botones de pestañas
    function initializeTabs() {
        const subjects = Object.keys(allData);
        tabsContainer.innerHTML = ''; // Limpiar

        subjects.forEach((subject, index) => {
            const btn = document.createElement('button');
            // Capitalizar primera letra
            const label = subject.charAt(0).toUpperCase() + subject.slice(1);
            
            btn.textContent = label;
            btn.className = `px-6 py-2 rounded-md font-semibold text-sm transition-colors duration-200 focus:outline-none tab-btn ${index === 0 ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`;
            btn.onclick = () => switchTab(subject, btn);
            
            tabsContainer.appendChild(btn);
        });

        // Cargar la primera materia por defecto
        if (subjects.length > 0) {
            renderTable(subjects[0]);
        }
    }

    // 3. Cambiar de pestaña
    function switchTab(subject, clickedBtn) {
        // Actualizar estilos de botones
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.className = 'px-6 py-2 rounded-md font-semibold text-sm transition-colors duration-200 focus:outline-none tab-btn text-gray-600 hover:bg-gray-100';
        });
        clickedBtn.className = 'px-6 py-2 rounded-md font-semibold text-sm transition-colors duration-200 focus:outline-none tab-btn bg-blue-600 text-white shadow';

        // Renderizar tabla
        renderTable(subject);
    }

    // 4. Pintar la tabla
    function renderTable(subject) {
        const items = allData[subject];
        tableBody.innerHTML = '';

        items.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-gray-50 transition-colors';

            // Colores para dificultad
            let diffColor = 'text-gray-600';
            if(item.dificultad === 'Baja') diffColor = 'text-green-600 font-bold';
            if(item.dificultad === 'Media') diffColor = 'text-yellow-600 font-bold';
            if(item.dificultad === 'Alta') diffColor = 'text-red-600 font-bold';

            row.innerHTML = `
                <td class="p-4 font-bold text-gray-900">${item.id}</td>
                <td class="p-4 font-semibold">${item.tema}</td>
                <td class="p-4 text-xs leading-relaxed">${item.dba}</td>
                <td class="p-4 text-center text-xs bg-gray-50 rounded">${item.nivel}</td>
                <td class="p-4 text-center text-xs ${diffColor}">${item.dificultad}</td>
                <td class="p-4 text-center font-bold text-lg bg-blue-50 text-blue-800 rounded">${item.clave}</td>
                <td class="p-4 text-sm leading-relaxed text-gray-600">${item.justificacion}</td>
                <td class="p-4 text-xs italic text-blue-600 bg-blue-50/50 rounded-lg m-1">${item.rec_estudiante}</td>
                <td class="p-4 text-xs italic text-purple-600 bg-purple-50/50 rounded-lg m-1">${item.rec_docente}</td>
            `;
            tableBody.appendChild(row);
        });
    }
});