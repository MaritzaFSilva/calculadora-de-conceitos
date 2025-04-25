# Gerador de Conceito Final com base em agregação

- Faça o download do seu arquivo .xlsx e adicione na pasta do projeto.
- Esse script vai considerar que a primeira coluna é a matricula e a segunda é o nome, e que a planilha possui cabeçalho
- Execute o comando para instalar as dependencias:
`
   npm install
`

Para rodar, execute o comando abaixo adicionando os parametros com o nome do seu arquivo inicial e o seu arquivo final.
Use `--debug=true` para exibir no console os dados de cada aluno e seu cálculo de conceitos.

`
   node .\index.js --file="notas" --finalFile="notas-info25" --debug=true
`

### A agregação dos conceitos seguirá o seguinte esquema.

operador de agregação = #

Conceito 1 # Conceito 2 = Conceito resultante
- A # A = A
- B # A = A
- C # A = B
- D # A = C
- A # B = B
- B # B = B
- C # B = C
- D # B = C
- A # C = C
- B # C = C
- C # C = C
- D # C = C
- A # D = C
- B # D = C
- C # D = D
- D # D = D
