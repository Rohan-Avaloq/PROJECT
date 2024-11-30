import os
from flask import Flask, request, jsonify, abort
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import check_password_hash

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Flask-JWT-Extended setup
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "your_jwt_secret_key")  # Secret key for JWT token
jwt = JWTManager(app)

# MySQL configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'  # Replace with your MySQL username
app.config['MYSQL_PASSWORD'] = ''  # Replace with your MySQL password
app.config['MYSQL_DB'] = 'player_db'  # Replace with your MySQL database name

# Initialize MySQL
mysql = MySQL(app)

# Helper function to get player by ID from DB
def get_player_by_id(player_id):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM players WHERE id = %s", (player_id,))
    player = cursor.fetchone()
    cursor.close()
    return player

# Helper function to validate user credentials (you should integrate with your user DB)
def validate_user(username, password):
    # For now, we're just checking hardcoded credentials. You can replace this with DB checks.
    if username == "admin" and check_password_hash(password, os.getenv("USER_PASSWORD_HASH")):
        return True
    return False

# Route to log in and get JWT token
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username', None)
    password = data.get('password', None)

    if username is None or password is None:
        abort(400, description="Username and password are required.")

    if validate_user(username, password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token)

    abort(401, description="Invalid username or password.")

# CREATE: Add a new player
@app.route("/players", methods=["POST"])
@jwt_required()  # Protect this route with JWT authentication
def add_player():
    data = request.get_json()
    if not data or not data.get("name") or not data.get("age") or not data.get("team") or not data.get("position"):
        abort(400, description="Missing required player data.")
    
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO players (name, age, team, position) VALUES (%s, %s, %s, %s)", 
                   (data["name"], data["age"], data["team"], data["position"]))
    mysql.connection.commit()
    cursor.close()
    
    return jsonify({"message": "Player added successfully!"}), 201

# READ: Get a list of all players
@app.route("/players", methods=["GET"])
@jwt_required()  # Protect this route with JWT authentication
def get_players():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM players")
    players = cursor.fetchall()
    cursor.close()
    
    return jsonify(players)

# READ: Get a specific player by ID
@app.route("/players/<int:player_id>", methods=["GET"])
@jwt_required()  # Protect this route with JWT authentication
def get_player(player_id):
    player = get_player_by_id(player_id)
    if not player:
        abort(404, description=f"Player with ID {player_id} not found.")
    
    return jsonify(player)

# UPDATE: Update player details by ID
@app.route("/players/<int:player_id>", methods=["PUT"])
@jwt_required()  # Protect this route with JWT authentication
def update_player(player_id):
    player = get_player_by_id(player_id)
    if not player:
        abort(404, description=f"Player with ID {player_id} not found.")
    
    data = request.get_json()
    cursor = mysql.connection.cursor()
    cursor.execute(""" 
        UPDATE players 
        SET name = %s, age = %s, team = %s, position = %s 
        WHERE id = %s
    """, (data.get("name", player[1]), data.get("age", player[2]), data.get("team", player[3]), 
          data.get("position", player[4]), player_id))
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": f"Player with ID {player_id} updated successfully."})

# DELETE: Delete a player by ID
@app.route("/players/<int:player_id>", methods=["DELETE"])
@jwt_required()  # Protect this route with JWT authentication
def delete_player(player_id):
    player = get_player_by_id(player_id)
    if not player:
        abort(404, description=f"Player with ID {player_id} not found.")
    
    cursor = mysql.connection.cursor()
    cursor.execute("DELETE FROM players WHERE id = %s", (player_id,))
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": f"Player with ID {player_id} has been deleted."}), 200

# Error handling
@app.errorhandler(400)
def bad_request(error):
    return jsonify({"error": str(error)}), 400

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": str(error)}), 404

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({"error": "Method Not Allowed"}), 405

if __name__ == "__main__":
    app.run(debug=True)

