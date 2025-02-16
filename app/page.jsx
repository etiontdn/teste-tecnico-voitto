function Curso({ nome, descricao, cargaHoraria }) {
    return (
        <tr>
            <td style={{ fontWeight: "bold" }}>{nome}</td>
            <td>{descricao}</td>
            <td>{cargaHoraria}</td>
        </tr>
    );
}

function Tabela({ cursos }) {
    const rows = cursos.map(({ nome, descricao, cargaHoraria }) => (
        <Curso
            nome={nome}
            descricao={descricao}
            cargaHoraria={cargaHoraria}
        ></Curso>
    ));
    return (
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Carga Horária (em horas)</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

export default function Page() {
    const cursos = [
        { nome: "Nome", descricao: "Descrição", cargaHoraria: "Carga" },
        { nome: "Nome", descricao: "Descrição", cargaHoraria: "Cargas" },
        { nome: "Nome", descricao: "Descrição", cargaHoraria: "Carga2" },
    ];
    return (
        <div>
            <Tabela cursos={cursos}></Tabela>
        </div>
    );
}
