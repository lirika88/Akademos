from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    # Имитация данных пользователя
    users = {
        1: {"id": 1, "name": "Иван Петров", "role": "student", "email": "ivan@example.com"},
        2: {"id": 2, "name": "Мария Сидорова", "role": "tutor", "email": "maria@example.com"}
    }
    user = users.get(user_id, {"error": "User not found"})
    return jsonify(user)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "service": "user-service"})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port)