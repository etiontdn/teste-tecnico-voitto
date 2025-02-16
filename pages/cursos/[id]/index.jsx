export async function getServerSideProps(context) {
    let res = await fetch("http://localhost:8080/cursos/" + context.query.id);
    const curso = await res.json();
    res = await fetch("http://localhost:8080/matriculas/" + context.query.id);
    const matriculas = await res.json();
    return { props: { curso, matriculas } };
}

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

export default function Page({ curso, matriculas }) {
    return (
        <div>
            <h1>{curso.nome}</h1>
            <p>{curso.descricao}</p>
            <p>{curso.cargaHoraria}</p>

            {matriculas.map(({ id, nomeAluno }) => (
                <div key={id}>{nomeAluno}</div>
            ))}

            <button onClick={(e) => makeCSV(curso.nome, matriculas)}>Baixar em CSV</button>
        </div>
    );
}
