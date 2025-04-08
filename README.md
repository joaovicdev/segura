Criar um componente React que ira:  
    - [✅] Consumir a API https://jsonplaceholder.typicode.com/users usando axios.  
        -[✅]  Exibir os usuários em uma lista (mostrando os campos name e email).  
        - [✅] Implemente paginação:  
            - [✅] Mostre 5 usuários por página.  
            - [✅] Adicione botões para navegar entre páginas.  
        - [✅] Adicione um campo de busca que filtre usuários por nome (client-side, sem chamar a API novamente).  
        - [✅] Ordenar a lista por nome.  
        - [✅] Adicionar um botão para recarregar os dados da API.  

## Observação: 
Como mencionado na entrevista, esse código pode (e deveria) ser componentizado e separado,
porém para me manter o mais fiel possível ao que foi proposto na entrevista, deixei no mesmo componente  
  
## Observação 2:  
No botão "recarregar", ele faz o fetch das informações novamente, porém como um dos desafios da páginação era não fazer a requisição na api, fiz um outro botão também, que volta as informações "padrões", sem filtros, já que os dados "brutos" da requisição fica armazenado sem alteração no "users"  
  
  
  
wsantana@segura.security