from app import db, mllo
from marshmallow import fields
from models.base import BaseModel, BaseSchema
from models.user import User, UserSchema


class Supplier(db.Model, BaseModel):
    __tablename__ = 'suppliers'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref='suppliers')

    name = db.Column(db.String(40), nullable=False)
    # contact = db.Column(db.Srting)
    # email

class SupplierSchema(mllo.ModelSchema, BaseSchema):
    user = fields.Nested('UserSchema', only=('id', 'username'))

    expenses = fields.Nested('ExpenseSchema', many=True, only=('id', 'description', 'project.code', 'amount', 'project.name', 'project.id', 'project.client.name'))
    class Meta:
        model = Supplier
        exclude = ('created', 'updated')
