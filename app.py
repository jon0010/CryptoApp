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

@app.post('/api/login')
def login():
    data = request.get_json()
    correo = data.get('email')
    password = data.get('pass')

    try:
       # conectar a la bbdd
        conn = get_connection()
        # crear un cursor -- se encarga de ejecutar las queries
        cursor = conn.cursor(cursor_factory=extras.RealDictCursor)
        cursor.execute('SELECT * FROM users_crypto WHERE email = %s OR usuario = %s', (correo,correo,))
        user = cursor.fetchone()
        cursor.close()
        
        if user and user['password'] == password:  # Habría que implementar algo sobre cifrado de contraseñas pero por ahora esto
            return jsonify(message="Login exitoso", usuario=user) 
        else:
            return jsonify(message="Correo o contraseña incorrectos"), 401
    except Exception as e:
        return jsonify(message=str(e)), 400


#Obtener crypto ficticias
@app.get("/api/crypto")
def get_crypto():

    # conectar a la bbdd
    conn = get_connection()
    # crear un cursor -- se encarga de ejecutar las queries
    cursor = conn.cursor(cursor_factory=extras.RealDictCursor)

    # ejecutar la query para obtener registros
    cursor.execute("SELECT * FROM crypto_values")
    crypto_fic = cursor.fetchall()

    # cerrar el cursor y la conexión
    cursor.close()
    conn.close()

    # retornar los resultados
    return jsonify(crypto_fic)

#Crear crypto ficticias
#Funciona pero no hay verificación de duplicado
@app.post("/api/crypto")
def create_crypto():

    crypto_data = request.get_json()

    # conectar a la bbdd
    conn = get_connection()
    # crear un cursor -- se encarga de ejecutar las queries
    cursor = conn.cursor(cursor_factory=extras.RealDictCursor)

    # ejecutar la query cargar
    query = """
    INSERT INTO crypto_values (name, symbol, price_usd, last_updated)
    VALUES (%s, %s, %s, %s)
    RETURNING *
    """
    cursor.execute(
        query=query,
        vars=(
            crypto_data["name"],
            crypto_data["symbol"],
            crypto_data["price_usd"],
            crypto_data["last_updated"],
        ),
    )
    crypto = cursor.fetchone()
    conn.commit()
    
    # cerrar el cursor y la conexión
    cursor.close()
    conn.close()

    if crypto is None:
        return jsonify({"message": "Crypto no creada"}), 400

    # retornar los resultados
    return jsonify({"message": "éxito"}), 201

#Funciona
@app.get("/api/crypto/<crypto_id>") #Con el símbolo
def obt_crypto(crypto_id):
    # conectar a la bbdd
    conn = get_connection()
    # crear un cursor -- se encarga de ejecutar las queries
    cursor = conn.cursor(cursor_factory=extras.RealDictCursor)

    # ejecutar la query para obtener registros
    cursor.execute(
        query="SELECT * FROM crypto_values WHERE symbol = %s", vars=(crypto_id,)
    )
    crypto = cursor.fetchone()
    # cerrar el cursor y la conexión
    cursor.close()
    conn.close()
    
    if crypto is None:
        return jsonify({"message": "No se encontró la crypto."}), 404

    # retornar los resultados
    return jsonify(crypto)

#Funciona
@app.delete("/api/crypto/<crypto_id>")
def delete_crypto(crypto_id):
    # conectar a la bbdd
    conn = get_connection()
    # crear un cursor -- se encarga de ejecutar las queries
    cursor = conn.cursor(cursor_factory=extras.RealDictCursor)

    # ejecutar la query para obtener registros
    cursor.execute(
        query="DELETE FROM crypto_values WHERE symbol = %s RETURNING *", vars=(crypto_id,)
    )
    crypto = cursor.fetchone()
    conn.commit()
    # cerrar el cursor y la conexión
    cursor.close()
    conn.close()
    
    if crypto is None:
        return jsonify({"message": "No se encontró la crypto."}), 404

    # retornar los resultados
    return jsonify({"message": "Eliminado exitosamente."})

'''
# PUT / PATCH
@app.patch("/api/movies/<movie_id>")
def update_movie(movie_id):
    return {"title": "Spiderman 2", "year": 2002, "id": movie_id}


@app.put("/api/movies/<movie_id>")
def update_movie_put(movie_id):
    return {"title": "Spiderman 2", "year": 2002, "id": movie_id}
'''


@app.get("/")
def connect():
    return send_file("index.html")


if __name__ == '__main__':
    app.run(debug=True, port=5000, host='localhost')
