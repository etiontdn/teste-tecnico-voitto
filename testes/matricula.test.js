const { getTotalAlunosPorCurso } = require("../matricula.js");

test("inicial", () => {
    let matriculas = [
        { id: 1, curso: "JavaScript Avançado", aluno: "Alice" },
        { id: 2, curso: "React do Zero", aluno: "Bob" },
        { id: 3, curso: "JavaScript Avançado", aluno: "Carlos" },
        { id: 4, curso: "Node.js para Backend", aluno: "Daniela" },
        { id: 5, curso: "React do Zero", aluno: "Eduardo" },
    ];

    expect(getTotalAlunosPorCurso(matriculas)).toEqual({
        "JavaScript Avançado": 2,
        "React do Zero": 2,
        "Node.js para Backend": 1,
    });

    matriculas = [
        { id: 1, curso: "Python para Iniciantes", aluno: "Alice" },
        { id: 2, curso: "Python para Iniciantes", aluno: "Bob" },
        { id: 3, curso: "Banco de Dados SQL", aluno: "Carlos" },
        { id: 4, curso: "Banco de Dados SQL", aluno: "Daniela" },
        { id: 5, curso: "JavaScript Avançado", aluno: "Eduardo" },
    ];

    expect(getTotalAlunosPorCurso(matriculas)).toEqual({
        "Python para Iniciantes": 2,
        "Banco de Dados SQL": 2,
        "JavaScript Avançado": 1,
    });
});
