from flask import Flask
from .config import Config
from .models import db, Symbol

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

@app.route('/api/search/<keyword>')
def index(keyword):
    result = [{'symbol': item.symbol, 'name': item.name} for item in Symbol.query.filter(Symbol.symbol.like(f'%{keyword}%') | Symbol.name.like(f'%{keyword}%')).limit(7)]

    return result
