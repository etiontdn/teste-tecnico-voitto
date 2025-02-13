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
});

test("novos", () => {
    let matriculas = [
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

    matriculas = [
        { id: 1, curso: "HTML e CSS", aluno: "Fernanda" },
        { id: 2, curso: "HTML e CSS", aluno: "Gabriel" },
        { id: 3, curso: "Node.js para Backend", aluno: "Hugo" },
        { id: 4, curso: "React Avançado", aluno: "Isabela" },
        { id: 5, curso: "React Avançado", aluno: "João" },
        { id: 6, curso: "HTML e CSS", aluno: "Karina" },
    ];

    expect(getTotalAlunosPorCurso(matriculas)).toEqual({
        "HTML e CSS": 3,
        "Node.js para Backend": 1,
        "React Avançado": 2,
    });

    matriculas = [
        { id: 1, curso: "Vue.js Essencial", aluno: "Lucas" },
        { id: 2, curso: "Vue.js Essencial", aluno: "Mariana" },
        { id: 3, curso: "Vue.js Essencial", aluno: "Nicolas" },
        { id: 4, curso: "Django com Python", aluno: "Olívia" },
        { id: 5, curso: "Django com Python", aluno: "Pedro" },
        { id: 6, curso: "Django com Python", aluno: "Quésia" },
        { id: 7, curso: "Banco de Dados NoSQL", aluno: "Rafael" },
    ];

    expect(getTotalAlunosPorCurso(matriculas)).toEqual({
        "Vue.js Essencial": 3,
        "Django com Python": 3,
        "Banco de Dados NoSQL": 1,
    });
});
