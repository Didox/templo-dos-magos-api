#!/bin/bash

# # Carrega as variáveis do arquivo .env
# if [ -f .env ]; then
#     export $(cat .env | grep -v '^#' | xargs)
#     echo "Variáveis de ambiente carregadas com sucesso!"
# else
#     echo "Arquivo .env não encontrado!"
#     exit 1
# fi

# # Verifica se as variáveis essenciais estão definidas
# if [ -z "$PORT" ] || [ -z "$HOST" ] || [ -z "$APP_KEY" ]; then
#     echo "Erro: Variáveis essenciais não encontradas no arquivo .env"
#     exit 1
# fi

# echo "Iniciando aplicação na porta $PORT..."
# npm run build
# npm start

node ace serve --watch