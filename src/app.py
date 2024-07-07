from base64 import b64encode
import random
import psycopg2
from flask import Flask, jsonify, request, send_file
from psycopg2 import connect, extras
from flask_cors import CORS
from datetime import datetime, timezone 
app = Flask(__name__)
cors = CORS(app)

'''
Datos conexión BDD Render
postgresql://postgresql:z7qjWOD4WwKGdMfbkHIIuaFMOrJLHMgh@dpg-cq4k8otds78s73clmer0-a.oregon-postgres.render.com/cryptoapp

database="cryptoapp",
user="postgresql",
password="z7qjWOD4WwKGdMfbkHIIuaFMOrJLHMgh"
host="dpg-cq4k8otds78s73clmer0-a.oregon-postgres.render.com"
port=5432

postgresql://cryptoapp_xy7t_user:SDm6c7R9RwwMhX45ROh4fKNRubKbbjqd@dpg-cq5121mehbks73bhvgng-a/cryptoapp_xy7t INTERNO

postgresql://cryptoapp_xy7t_user:SDm6c7R9RwwMhX45ROh4fKNRubKbbjqd@dpg-cq5121mehbks73bhvgng-a.oregon-postgres.render.com/cryptoapp_xy7t EXTERNO
'''

def get_connection():
    return psycopg2.connect(
        host="dpg-cq5121mehbks73bhvgng-a.oregon-postgres.render.com",
        port=5432,
        database="cryptoapp_xy7t",
        user="cryptoapp_xy7t_user",
        password="SDm6c7R9RwwMhX45ROh4fKNRubKbbjqd",
    )

@app.get("/api/countries")
def get_countries():

    # conectar a la bbdd
    conn = get_connection()
    # crear un cursor -- se encarga de ejecutar las queries
    cursor = conn.cursor(cursor_factory=extras.RealDictCursor)

    # ejecutar la query para obtener registros
    cursor.execute("SELECT id, nicename FROM country")
    list_countries = cursor.fetchall()

    # cerrar el cursor y la conexión
    cursor.close()
    conn.close()

    # retornar los resultados
    return jsonify(list_countries)



@app.post("/api/register") #Funciona generando el post con Thunder Client
def register():
    
    data = request.get_json()
    nombre = data['name']
    apellido = data['lname']
    correo = data['email']
    password2 = data['pass']
    user = data['user']
    countryv=data['country']

    # conectar a la bbdd
    conn = get_connection()
    # crear un cursor -- se encarga de ejecutar las queries
    cursor = conn.cursor(cursor_factory=extras.RealDictCursor)
    # ejecutar la query para obtener registros
    query = """
    INSERT INTO users_crypto (usuario, nombre, apellido, email, password,country)
    VALUES (%s, %s, %s, %s, %s,%s)
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
            countryv,            
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
@app.post("/api/new_crypto")
def create_crypto():
    
    crypto_data = request.get_json()

    # conectar a la bbdd
    conn = get_connection()
    # crear un cursor -- se encarga de ejecutar las queries
    cursor = conn.cursor(cursor_factory=extras.RealDictCursor)

    #fecha
    dt= datetime.now(timezone.utc)
    # ejecutar la query cargar
    query = """
    INSERT INTO crypto_values (name, symbol, price_usd)
    VALUES (%s, %s, %s)
    RETURNING *
    """
    cursor.execute(
        query=query,
        vars=(
            crypto_data["name"],
            crypto_data["symbol"],
            crypto_data["price_usd"],
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
    return jsonify(crypto), 201

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
        query="DELETE FROM crypto_values WHERE id = %s RETURNING *", vars=(crypto_id,)
    )
    crypto = cursor.fetchone()
    conn.commit()
    # cerrar el cursor y la conexión
    cursor.close()
    conn.close()
    
    if crypto is None:
        return jsonify({"message": "No se encontró la crypto."}), 404

    # retornar los resultados
    return jsonify(crypto)


# PUT / PATCH

@app.patch("/api/change_pass")
def update_password():
    password_new = request.get_json()

    # conectar a la bbdd
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=extras.RealDictCursor)

    try:
        identificador=password_new["identificador"]
        # verificar si el registro existe
        cursor.execute("SELECT * FROM users_crypto WHERE email = %s or usuario = %s", (identificador,identificador))
        contra = cursor.fetchone()
        if contra is None:
            return jsonify({"message": "Usuario no encontrado"}), 404

        # ejecutar la query para actualizar
        query = """
        UPDATE users_crypto
        SET password = %s
        WHERE email = %s or usuario=%s
        RETURNING *
        """
        cursor.execute(
            query,
            (
                password_new["password"],
                identificador,
                identificador,
            ),
        )
        updated_password = cursor.fetchone()
        conn.commit()

    except Exception as e:
        conn.rollback()
        return jsonify({"message": "Error al actualizar la contraseña", "error": str(e)}), 500
    finally:
        # cerrar el cursor y la conexión
        cursor.close()
        conn.close()

    # retornar los resultados
    return jsonify({"message": "Contraseña cambiada con éxito.","updated_password":updated_password}), 200

    


#Funciona OK
@app.put("/api/crypto/<crypto_id>/put")
def update_crypto_put(crypto_id):
    crypto_data = request.get_json()

    # conectar a la bbdd
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=extras.RealDictCursor)

    # fecha
    timestamp = datetime.now()

    try:
        # verificar si el registro existe
        cursor.execute("SELECT * FROM crypto_values WHERE id = %s", (crypto_id,))
        crypto = cursor.fetchone()
        if crypto is None:
            return jsonify({"message": "Crypto no encontrada"}), 404

        # ejecutar la query para actualizar
        query = """
        UPDATE crypto_values
        SET name = %s, symbol = %s, price_usd = %s, last_updated = %s
        WHERE id = %s
        RETURNING *
        """
        cursor.execute(
            query,
            (
                crypto_data["name"],
                crypto_data["symbol"],
                crypto_data["price_usd"],
                timestamp,
                crypto_id,
            ),
        )
        updated_crypto = cursor.fetchone()
        conn.commit()

    except Exception as e:
        conn.rollback()
        return jsonify({"message": "Error al actualizar la crypto", "error": str(e)}), 500
    finally:
        # cerrar el cursor y la conexión
        cursor.close()
        conn.close()

    # retornar los resultados
    return jsonify(updated_crypto), 200


@app.get("/")
def home():
    return send_file("static/index.html")

@app.get("/portal-crypto.html")
def portal():
    return send_file("static/portal-crypto.html")

@app.get("/portal-crypto-sapi.html")
def portalsapi():
    return send_file("static/portal-crypto-sapi.html")

@app.get("/about-us.html")
def aboutus():
    return send_file("static/about-us.html")

@app.get("/contact.html")
def contact():
    return send_file("static/contact.html")


@app.get("/login.html")
def loginpag():
    return send_file("static/login.html")

@app.get("/register.html")
def registerpag():
    return send_file("static/register.html")

@app.get("/recuperoContra.html")
def recuperoContra():
    return send_file("static/recuperoContra.html")

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='localhost')
