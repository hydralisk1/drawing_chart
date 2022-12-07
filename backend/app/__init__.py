from flask import Flask
from .config import Config
from .models import db, Symbol
from sqlalchemy import case

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

@app.route('/api/search/<keyword>')
def index(keyword):
    result = [{'symbol': item.symbol, 'name': item.name} for item in Symbol.query.filter(Symbol.symbol.like(f'%{keyword}%') | Symbol.name.like(f'%{keyword}%')).order_by(case((Symbol.symbol.startswith(keyword), 0), (Symbol.name.startswith(keyword), 1), else_=2)).limit(7)]

    return result
