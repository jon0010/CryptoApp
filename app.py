from base64 import b64encode
import random
import psycopg2
from flask import Flask, jsonify, request, send_file
from psycopg2 import connect, extras
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)



def get_connection():
    return psycopg2.connect(
        host="localhost",
        port=5432,
        database="CryptoApp",
        user="postgres",
        password="123456",
    )


@app.post("/api/register") #Funciona generando el post con Thunder Client
def register():
    
    data = request.get_json()
    nombre = data['name']
    apellido = data['lname']
    correo = data['email']
    password2 = data['pass']
    user = data['user']

    # conectar a la bbdd
    conn = get_connection()
    # crear un cursor -- se encarga de ejecutar las queries
    cursor = conn.cursor(cursor_factory=extras.RealDictCursor)
    # ejecutar la query para obtener registros
    query = """
    INSERT INTO users_crypto (usuario, nombre, apellido, email, password)
    VALUES (%s, %s, %s, %s, %s)
    RETURNING *
    """
    cursor.execute(
        query=query,
        vars=(
            user,
            nombre,
            apellido,
            correo,
            password2,            
        ),
    )
    usuario_bd = cursor.fetchone()
    conn.commit()
    # cerrar el cursor y la conexión
    cursor.close()
    conn.close()
    if usuario_bd is None:
        return jsonify({"message": "Usuario no creado"}),400
    
    return jsonify({"message": usuario_bd}),201

@app.get("/")
def connect():
    return send_file("index.html")

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='localhost')
