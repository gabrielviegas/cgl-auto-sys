from flask import Flask, jsonify, request, render_template
import sqlite3
import webbrowser
import threading
import sys
import os

if getattr(sys, 'frozen', False):
    base_dir = sys._MEIPASS
    exe_dir = os.path.dirname(sys.executable)
    db_path = os.path.join(exe_dir, 'banco_oficina.db')
else:
    base_dir = os.path.abspath(os.path.dirname(__file__))
    db_path = os.path.join(base_dir, 'banco_oficina.db')

template_dir = os.path.join(base_dir, 'templates')
static_dir = os.path.join(base_dir, 'static')

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

def iniciar_banco():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS controle (id INTEGER PRIMARY KEY, ultimo_numero INTEGER)')
    cursor.execute('SELECT COUNT(*) FROM controle')
    if cursor.fetchone()[0] == 0:
        cursor.execute('INSERT INTO controle (ultimo_numero) VALUES (0)')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_numero')
def get_numero():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('SELECT ultimo_numero FROM controle WHERE id = 1')
    resultado = cursor.fetchone()
    conn.close()
    return jsonify({"numero": resultado[0]})

@app.route('/salvar_numero', methods=['POST'])
def salvar_numero():
    dados = request.json
    novo_numero = dados.get('numero')
    conn = sqlite3.connect(db_path)
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