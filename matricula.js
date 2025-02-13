function getTotalAlunosPorCurso(matriculas) {
  // Usando reduce para criar o objeto { "curso": totalAlunos}
  const totalMatriculas = matriculas.reduce((total, matricula) => {
    const { curso } = matricula;

    // Se ainda não achamos nenhuma matrícula desse curso antes começamos com 0
    if (total[curso] === undefined) {
      total[curso] = 0;
    }

    // Adiciona +1 ao total do curso atual
    total[curso]++;
    return total;
  }, {});
  return totalMatriculas;
}

export default {
  getTotalAlunosPorCurso,
};