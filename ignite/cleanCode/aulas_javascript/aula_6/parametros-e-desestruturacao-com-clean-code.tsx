//Todas as funções devem ter de forma clara o que está sendo enviado para a próxima função pois
//as funções podem ir para outros arquivos e podem acabar ficando complicadas de se entender

function updateUserRoute({ body, params }) {
  const { name, email, password } = body;
  const { id } = params;

  updateUserController({
    data: { name, email, password },
    params: { id },
  });
}

function updateUserController({ data, params }) {
  const { name, email, password } = data;
  const { id } = params;

  userRepository.update({
    data: { name, email, password },
    params: { id },
  });
}

const userRepository = {
  update: ({ data, params }) => {
    const { name, email, password } = data;
    const { id } = params;

    const user = updateUserOnDatabase({
      data: { name, email, password },
      params: { id },
    });
    
    //Retornar sempre um objeto para que caso seja necessário retornar mais propriedades
    //as outras partes do código não quebrem e estejam preparadas para receber mais de 
    //uma propriedade no retorno da função sem problemas
    return { 
      user: user 
    };
  },
};

const updateUserOnDatabase = ({ data, params }) => {};
