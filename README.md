# 📚 Double Pizzaria

# 🧾 Descrição
O nosso trabalho consiste em um sistema de pizzaria, com as seguintes funcionalidades:

- Possibilidade de login e cadastro de usuários.
- Cadastro de pizzas, contendo nome, descrição e valor.
- Funções de editar e excluir pizzas.
- Listagem completa de todas as pizzas na página de administrador.
- Cardápio dinâmico, que exibe todas as pizzas cadastradas no banco de dados na aba "Cardápio", permitindo que os clientes possam visualizar as opções disponíveis.

# 👥 Integrantes da Dupla
- Igor Mateus Mordaski - @igormordaski7
- Pedro Nagel Alves - @Nagel-P

# 🛠️ Tecnologias Utilizadas

# Back-end:
Linguagem: C# (.NET 8)
Framework: ASP.NET Core
ORM: Entity Framework Core
Banco de Dados: MySQL
Autenticação: JWT
Documentação: Swagger (Swashbuckle)

# Front-end:
Framework: Next.js
Linguagem: TypeScript (.tsx)
Estilização: CSS Modules (*.module.css)

# Versionamento:
Git + GitHub
Visual Studio Code (VS Code)

# 📦 Principais Pacotes Utilizados no Back-end
Microsoft.AspNetCore.Authentication.JwtBearer
Microsoft.EntityFrameworkCore
Pomelo.EntityFrameworkCore.MySql
Swashbuckle.AspNetCore

# 🔐 Observação:
O projeto utiliza autenticação via JWT para segurança das rotas e autenticação dos usuários.

# 🚀 Como Executar o Projeto

# ✅ Pré-requisitos
.NET SDK 8.0+
Node.js 18+ 
MySQL 8.0+
Git
Visual Studio Code (VS Code)

# Passos
# 1. Clone o repositório
git clone https://github.com/Nagel-P/API-pizzaria-next

# 2. Acesse a pasta do projeto
cd API-pizzaria-next

# 3. Configure o Banco de Dados
# - Crie um banco de dados no MySQL:
     CREATE DATABASE pizzaria_db;

# - No arquivo appsettings.json, configure a string de conexão:
     "ConnectionStrings": {
        "DefaultConnection": "Server=localhost;Database=pizzaria_db;User=root;Password=sua_senha;"
      }

# 4. Restaure os pacotes do back-end
dotnet restore

# 5. Aplique as migrations para criar as tabelas no banco
dotnet ef database update

# 6. Execute a aplicação back-end
dotnet run
