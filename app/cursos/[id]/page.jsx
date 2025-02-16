import Form from "./form.jsx"
import Alunos from "./alunos.jsx"

async function getServerSideProps(id) {
    let res = await fetch("http://localhost:8080/cursos/" + id);
    const curso = await res.json();
    res = await fetch("http://localhost:8080/matriculas/" + id);
    const matriculas = await res.json();
    return { curso, matriculas };
}

export default async function Page({ params }) {
    const id = (await params).id
    const {curso, matriculas} = await getServerSideProps(id)
    return (
        <div>
            <h1>{curso.nome}</h1>
            <p>{curso.descricao}</p>
            <p>{curso.cargaHoraria}</p>
            <Alunos nome={curso.nome} matriculas={matriculas}></Alunos>
            <Form curso={curso} id={id}></Form>
        </div>
    );
}
