const matriculas = [
  { id: 1, curso: "JavaScript Avançado", aluno: "Alice" },
  { id: 2, curso: "React do Zero", aluno: "Bob" },
  { id: 3, curso: "JavaScript Avançado", aluno: "Carlos" },
  { id: 4, curso: "Node.js para Backend", aluno: "Daniela" },
  { id: 5, curso: "React do Zero", aluno: "Eduardo" },
];

function getTotalAlunosPorCurso(matriculas) {
  const totalMatriculas = matriculas.reduce((total, matricula) => {
    if(total[matricula.curso] === undefined) {
        total[matricula.curso] = 0;
    }
    total[matricula.curso] += 1;
    return total;
  }, {});
  return totalMatriculas;
}

export default {
  getTotalAlunosPorCurso,
};

const total = getTotalAlunosPorCurso(matriculas);
console.log(total)
