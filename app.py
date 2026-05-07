from flask import Flask, jsonify, request
import sqlite3
import webbrowser
import threading

app = Flask(__name__, static_folder='.', static_url_path='')

def iniciar_banco():
    conn = sqlite3.connect('banco_oficina.db')
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS controle (id INTEGER PRIMARY KEY, ultimo_numero INTEGER)')
    cursor.execute('SELECT COUNT(*) FROM controle')
    if cursor.fetchone()[0] == 0:
        cursor.execute('INSERT INTO controle (ultimo_numero) VALUES (0)')
    
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/get_numero')
def get_numero():
    conn = sqlite3.connect('banco_oficina.db')
    cursor = conn.cursor()
    cursor.execute('SELECT ultimo_numero FROM controle WHERE id = 1')
    numero = cursor.fetchone()[0]
    conn.close()
    return jsonify({"numero": numero})

@app.route('/salvar_numero', methods=['POST'])
def salvar_numero():
    dados = request.json
    novo_numero = dados.get('numero')
    
    conn = sqlite3.connect('banco_oficina.db')
    cursor = conn.cursor()
    cursor.execute('UPDATE controle SET ultimo_numero = ? WHERE id = 1', (novo_numero,))
    conn.commit()
    conn.close()
    
    return jsonify({"status": "sucesso"})

def abrir_navegador():
    webbrowser.open('http://127.0.0.1:5000')

if __name__ == '__main__':
    iniciar_banco()
    threading.Timer(1.25, abrir_navegador).start()
    app.run(port=5000)