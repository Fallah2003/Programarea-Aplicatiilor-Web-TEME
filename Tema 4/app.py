from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'  # Conectare la o bază de date SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)

def create_database():
    with app.app_context():
        db.create_all()

@app.route('/products', methods=['POST']) 
def add_product():
    data = request.get_json()

    new_product = Product(name=data['name'], price=data['price'])

    db.session.add(new_product)
    db.session.commit()

    return jsonify({'message': 'Product added successfully'}), 201

@app.route('/products', methods=['GET'])
def get_all_products():
    products = Product.query.all()
    output = []

    for product in products:
        product_data = {'id': product.id, 'name': product.name, 'price': product.price}
        output.append(product_data)

    return jsonify({'products': output})

@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    product_data = {'id': product.id, 'name': product.name, 'price': product.price}

    return jsonify({'product': product_data})

@app.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product = Product.query.get_or_404(product_id)
    data = request.get_json()

    product.name = data['name']
    product.price = data['price']

    db.session.commit()

    return jsonify({'message': 'Product updated successfully'})

@app.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)

    db.session.delete(product)
    db.session.commit()

    return jsonify({'message': 'Product deleted successfully'})

if __name__ == '__main__':
    create_database()  # Creare tabele în baza de date la pornirea aplicației
    app.run(debug=True)

