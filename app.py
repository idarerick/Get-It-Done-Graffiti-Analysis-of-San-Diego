import pandas as pd

from flask import (
    Flask,
    render_template,
    jsonify)

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# The database URI
app.config['SQLALCHEMY_DATABASE_PieChart_URI'] = "sqlite:///db/PieChart.sqlite3"
app.config['SQLALCHEMY_DATABASE_SDGraffiti3_URI'] = "sqlite:///db/SDGraffiti3.sqlite3"

db = SQLAlchemy(app)


@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)