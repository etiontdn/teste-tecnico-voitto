"use client"
import TabelaDeCursos from "./tabela.jsx";
import Matricula from "./matricula.jsx";
import Detalhes from "./detalhes.jsx"
import { useState } from "react";

export default function Page() {
    const [cursoSelecionado, setCursoSelecionado] = useState("");

    return (
        <div>
            <TabelaDeCursos setCursoSelecionado={setCursoSelecionado}></TabelaDeCursos>
            <Matricula></Matricula>
            <Detalhes cursoSelecionado={cursoSelecionado}></Detalhes>
        </div>
    );
}
