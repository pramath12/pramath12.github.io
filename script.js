document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("input-form");
    const resultsDiv = document.getElementById("results");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const templateDescInput = document.getElementById("template-desc").value;
        const compactBufferInput = document.getElementById("compact-buffer").value;

        // Perform AJAX request to backend
        const response = await fetch("https://cfparser.pythonanywhere.com.pythonanywhere.com/cors-proxy/http://localhost:56421/parse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify({
                templateDesc: templateDescInput,
                compactBuffer: compactBufferInput,
            }),
        });

        if (response.ok) {
            const data = await response.json();      
      
            resultsDiv.appendChild(createTable(data));
            // Display results
            //resultsDiv.innerHTML = `<pre>${JSON.stringify(data, null, 1)}</pre>`;
        } else {
            resultsDiv.innerHTML = "<p>Error while parsing.</p>";
        }
    });
});

function createTable(data) {
    const table = document.createElement("table");
    table.classList.add("result-table");

    // Create a heading row
    const headingRow = table.insertRow();
    const serialNoCell = headingRow.insertCell(0);
    const dataTypeCell = headingRow.insertCell(1);
    const bufferCell = headingRow.insertCell(2);

    // Set heading text
    serialNoCell.textContent = "Serial No.";
    dataTypeCell.textContent = "Data Type";
    bufferCell.textContent = "Buffer";

    for (const key in data) {
        const value = data[key];

        const row = table.insertRow();
        const serialNoCell = row.insertCell(0);
        const dataTypeCell = row.insertCell(1);
        const bufferCell = row.insertCell(2);

        serialNoCell.textContent = key;
        dataTypeCell.textContent = JSON.stringify(value[0], null, 1);
        bufferCell.textContent = JSON.stringify(value[1], null, 1);
    }

    return table;
}
