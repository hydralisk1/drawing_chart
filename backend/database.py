from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import Symbol

with app.app_context():
    db.drop_all()
    db.create_all()

    with open('nasdaq.csv', 'r') as readfile:
        for line in readfile.readlines()[1:]:
            symbol, name = line.split(',')[:2]
            name = name.replace(' Common Stock', '')
            if '^' not in symbol:
                db.session.add(Symbol(symbol=symbol, name=name))

    db.session.commit()
