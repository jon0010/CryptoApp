from flask import Flask, request, render_template, redirect, url_for,jsonify,send_file
import psycopg2

app = Flask(__name__)

# Configura la conexión a la base de datos
conn = psycopg2.connect(
    dbname='CryptoApp',
    user='postgres',
    password='123456',
    host='localhost',
    port= 5432
)

@app.post("/api/register") #Funciona generando el post con Thunder Client
def register():
    data = request.get_json()
    nombre = data['name']
    apellido = data['lname']
    correo = data['email']
    password = data['pass']
    user = data['user']

    try:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users_crypto (usuario, nombre, apellido, email, password) VALUES (%s,%s, %s, %s, %s) RETURNING *", (user, nombre, apellido, correo, password))
        conn.commit()
        cursor.close()
        return jsonify(message="Registro exitoso")
    except Exception as e:
        return jsonify(message=str(e)), 400
    

@app.get("/")
def home():
    return send_file("static/index.html")

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='localhost')
