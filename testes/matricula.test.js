const { getTotalAlunosPorCurso } = require("../matricula.js");


const matriculas = [
  { id: 1, curso: "JavaScript Avançado", aluno: "Alice" },
  { id: 2, curso: "React do Zero", aluno: "Bob" },
  { id: 3, curso: "JavaScript Avançado", aluno: "Carlos" },
  { id: 4, curso: "Node.js para Backend", aluno: "Daniela" },
  { id: 5, curso: "React do Zero", aluno: "Eduardo" },
];

test("inicial", () => {
  expect(getTotalAlunosPorCurso(matriculas), {
    "JavaScript Avançado": 2,
    "React do Zero": 2,
    "Node.js para Backend": 1,
  });
});

