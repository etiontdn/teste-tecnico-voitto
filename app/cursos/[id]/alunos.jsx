"use client"
function makeCSV(nome, matriculas) {
    const arr = matriculas.map((v) =>
        Object.entries(v).map(([key, val]) => val)
    );
    const data = arr
        .map((row) =>
            row
                .map(String)
                .map((v) => v.replaceAll('"', '""'))
                .map((v) => `"${v}"`)
                .join(",")
        )
        .join("\r\n");
    const blob = new Blob([data], {
        type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob)
    
    var download = document.createElement('a');
    download.href = url;
    download.setAttribute('download', "alunos"+ nome + ".csv");
    download.click();

    return url;
}

export default function Alunos({ nome, matriculas }) {
    return (
        <div>
            {matriculas.map(({ id, nomeAluno }) => (
                <div key={id}>{nomeAluno}</div>
            ))}

            <button onClick={(e) => makeCSV(nome, matriculas)}>
                Baixar em CSV
            </button>
        </div>
    );
}
