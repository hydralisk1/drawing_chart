from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Symbol(db.Model):
    __tablename__ = 'symbols'
    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(10), nullable=False)
    name = db.Column(db.String(100), nullable=False)
