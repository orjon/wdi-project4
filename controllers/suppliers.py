from flask import Blueprint, request, jsonify
from models.supplier import Supplier, SupplierSchema

supplier_schema = SupplierSchema()

api = Blueprint('suppliers', __name__)

@api.route('/suppliers', methods=['GET'])
def index():
    suppliers = Supplier.query.all()
    return supplier_schema.jsonify(suppliers, many=True), 200 #OK

@api.route('/suppliers/<int:supplier_id>', methods=['GET'])
def show(supplier_id):
    supplier = Supplier.query.get(supplier_id)
    return supplier_schema.jsonify(supplier), 200 #OK

@api.route('/suppliers', methods=['POST'])
def create():
    supplier, errors = supplier_schema.load(request.get_json())
    if errors:
        return jsonify(errors), 422 #Unprocessable Entity
    supplier.save()
    return supplier_schema.jsonify(supplier), 201 #Created

@api.route('/suppliers/<int:supplier_id>', methods=['PUT'])
def update(supplier_id):
    supplier = Supplier.query.get(supplier_id)
    supplier, errors = supplier_schema.load(request.get_json(), instance=supplier, partial=True)
    if errors:
        return jsonify(errors), 422 #Unprocessable Entity
    supplier.save()
    return supplier_schema.jsonify(supplier), 202 #Accepted

@api.route('/suppliers/<int:supplier_id>', methods=['DELETE'])
def delete(supplier_id):
    supplier = Supplier.query.get(supplier_id)
    supplier.remove()
    return '', 204 #No Content
