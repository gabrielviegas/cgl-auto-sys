# 🏎️ CGL-Auto-Sys

O **CGL-Auto-Sys** é um sistema desktop leve e eficiente para emissão de Ordens de Serviço (O.S.), desenvolvido sob medida para a **CGL Mecânica Automotiva**. O projeto combina uma interface web intuitiva com a robustez de um banco de dados local para garantir que a numeração das O.S. seja sequencial e persistente.

## 🚀 Funcionalidades

- **Gerenciamento de O.S.:** Geração automática e sequencial de números de Ordem de Serviço via banco de dados.
- **Integração com API de CEP:** Preenchimento automático de endereço (Rua, Bairro, Cidade) ao digitar o CEP.
- **Tabela Dinâmica de Serviços:** Adição/remoção de itens em tempo real com cálculo automático de valores (Peças + Mão de Obra).
- **Interface Responsiva:** Visual profissional e limpo, otimizado para preenchimento rápido no dia a dia da oficina.
- **Impressão Profissional:** Layout formatado para impressão em A4 ou salvamento em PDF.
- **Banco de Dados Local:** Uso de SQLite para armazenamento seguro da numeração, sem necessidade de servidores externos.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3 (Variáveis modernas) e JavaScript (Vanilla).
- **Backend:** Python com [Flask](https://flask.palletsprojects.com/).
- **Banco de Dados:** SQLite (nativo do Python).
- **Empacotamento:** [PyInstaller](https://pyinstaller.org/) para criação do executável (.exe).

## 📂 Estrutura de Pastas

O projeto segue o padrão de arquitetura MVC para Flask:

```text
CGL-AUTO-SYS/
├── app.py                 # Servidor Flask e lógica do banco de dados
├── requirements.txt       # Dependências do projeto
├── templates/
│   └── index.html         # Estrutura HTML do sistema
└── static/
    ├── css/
    │   └── style.css      # Estilização e Temática (CGL Red)
    ├── js/
    │   └── script.js      # Máscaras, cálculos e chamadas de API
    └── img/
        └── logo.png       # Identidade visual da oficina