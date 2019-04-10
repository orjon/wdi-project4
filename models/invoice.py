from app import db, mllo
from marshmallow import fields
from models.base import BaseModel, BaseSchema
from models.project import Project
from models.client import Client


class Invoice(db.Model, BaseModel):

    __tablename__ = 'invoices'

    number = db.Column(db.String(10), nullable=False)

    # date_issued = db.Column(db.DateTime, default=datetime.utcnow)
    # date_due = db.Column(db.DateTime, default=datetime.utcnow)
    # date_paid = db.Column(db.DateTime, default=datetime.utcnow)
    # pdf_link = db.Column(db.Text)
    amount = db.Column(db.Integer, nullable=False)
    # vat - = db.Column(db.Integer, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    project = db.relationship('Project', backref='invoices')

    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    client = db.relationship('Client', backref='invoices')

class InvoiceSchema(mllo.ModelSchema, BaseSchema):
    project = fields.Nested('ProjectSchema', only=('id', 'code'))
    client = fields.Nested('ClientSchema', only=('id', 'name'))
    class Meta:
        model = Invoice
        exclude = ('created', 'updated')