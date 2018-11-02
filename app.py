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

# @app.route("/barpie")
# def index():
# 	return render_template("barpie.html")

@app.route("/data")
def data():
    """Return the homepage."""
    # return render_template("index2.html")

    # Use Pandas to perform the sql query
    df = pd.read_sql_table(table_name = "SDGraffiti3Table", con = "sqlite:///data/SDGraffiti3.sqlite")
    print(df)

    # Return a list of the column names (sample names)
    return df.to_json()


# @app.route("/metadata/<sample>")
# def graffiti_data(sample):
#     """Return the MetaData for a given sample."""
#     sel = [
#         graffiti_table.sample,
#         graffiti_table.ETHNICITY,
#         graffiti_table.GENDER,
#         graffiti_table.AGE,
#         graffiti_table.LOCATION,
#         graffiti_table.BBTYPE,
#         graffiti_table.WFREQ,
#     ]

#     results = db.session.query(*sel).filter(graffiti_table.sample == sample).all()

#     # Create a dictionary entry for each row of metadata information
#     graffiti_data = {}
#     for result in results:
#         graffiti_data["graffiti_number"] = pk_column
#         graffiti_data["requested_datetime"] = requested_datetime
#         graffiti_data["closed_date"] = closed_date
#         graffiti_data["coordinates"] = coordinates
#         graffiti_data["district"] = district
#         graffiti_data["day_count"] = deltaDate

#     print(graffiti_data)
#     return jsonify(graffiti_data)


# @app.route("/samples/<sample>")
# def samples(sample):
#     """Return `otu_ids`, `otu_labels`,and `sample_values`."""
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Filter the data based on the sample number and
#     # only keep rows with values above 1
#     sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]
#     # Format the data to send as json
#     data = {
#         "otu_ids": sample_data.otu_id.values.tolist(),
#         "sample_values": sample_data[sample].values.tolist(),
#         "otu_labels": sample_data.otu_label.tolist(),
#     }
#     return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
