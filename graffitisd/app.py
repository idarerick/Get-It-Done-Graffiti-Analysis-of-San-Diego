import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data/SDGraffiti3.sqlite"
# db = SQLAlchemy(app)

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# v = Base.prepare(db.engine, reflect=True)
# print('stuff')
# # Save references to each table
# Graffiti_table = Base.classes


@app.route("/")
def index():
	return render_template("index.html")

# @app.route("/districts")
# def districts():
# 	"""Return a list of sample names."""

# 	# Use Pandas to perform the sql query
# 	districts = pd.read_sql_table(table_name = "SDGraffiti3Table", con = "sqlite:///./data/SDGraffiti3.sqlite3")
# 	sel = [
# 		districts.district
# 	]

# 	results = districts.session.query(*sel).filter(districts.district == district).all()

# 	for result in results:
# 		district_df["district"] = result[0]

# 	print(district_df)
# 	return jsonify()

#     # Return a list of the column names (sample names)
# 	return jsonify(list(districts.district)[2:])

@app.route("/data")
def data():

    # Use Pandas to perform the sql query
	df = pd.read_sql_table(table_name = "SDGraffiti3Table", con = "sqlite:///./data/SDGraffiti3.sqlite3")
	print(df)
    # Return df
	return df.to_json()


@app.route("/piechartdf")
def piechartdf():
	chartdf = pd.read_sql_table(table_name = "PieChartTable", con = "sqlite:///data/pieChart.sqlite3")    
	return chartdf.to_json()


# @app.route("/piechart/<district>")
# def piechart(district):
# 	piechartdf = pd.read_sql_table(table_name = "PieChartTable", con = "sqlite:///data/pieChart.sqlite3")    

# 	sel = [
# 		piechartdf.district,
# 		piechartdf.Count1,
# 		piechartdf.Count2,
# 		piechartdf.Count3,
# 	]

# 	results = piechartdf.session.query(*sel).filter(piechartdf.district == district).all()

# 	chart_df = {}
# 	for result in results:
# 		chart_df["district"] = result[0]
# 		chart_df["count1"] = result[1]
# 		chart_df["count2"] = result[2]
# 		chart_df["count3"] = result[3]

# 	print(chart_df)
# 	return jsonify(chart_df)


if __name__ == "__main__":
    app.run(debug=True)
