import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc

from flask import Flask, jsonify

import datetime as dt
from datetime import datetime


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///./Resources/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Measurement = Base.classes.measurement
Station = Base.classes.station

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation <br/>"
        f"/api/v1.0/stations <br/>"
        f"/api/v1.0/tobs <br/>"
        f"/api/v1.0/<start> <br/>"
        f'provide start date of trip as YYYY-MM-DD <br/>'
        f"/api/v1.0/<start>/<end> <br/>"
        f'provide start date of trip as YYYY-MM-DD then "/" and end date of trip at YYY-MM-DD'
    )


@app.route("/api/v1.0/precipitation")
def precipitation():
    """Returns precipitation for the last year of data in the database"""
    results = session.query(Measurement.date, Measurement.station, Measurement.prcp).\
    filter(Measurement.date > "2016-08-22").all()

       
    # Create a dictionary from the row data and append to a list of station_precipitation
    station_precipitation = []
    for Measurement.date, Measurement.station, Measurement.prcp in results:
        precipitation_dict = {}
        precipitation_dict["date"] = Measurement.date
        precipitation_dict["station"] = Measurement.station
        precipitation_dict["prcp"] = Measurement.prcp
        station_precipitation.append(precipitation_dict)



    #return jsonify(station_precipitation)
    return jsonify(station_precipitation)



@app.route("/api/v1.0/stations")
def station():
    """Return a JSON list of stations from the dataset"""
    # Query all passengers
    results = session.query(Station.id, Station.station, Station.name, Station.latitude, Station.longitude, Station.elevation).all()
 
    # Create a dictionary from the row data and append to a list of all_stations
    all_stations = []
    for Station.id, Station.station, Station.name, Station.latitude, Station.longitude, Station.elevation in results:
        station_dict = {}
        station_dict["id"] = Station.id
        station_dict["name"] = Station.name
        station_dict["latitude"] = Station.latitude
        station_dict["longitude"] = Station.longitude
        station_dict["elevation"] = Station.elevation
        all_stations.append(station_dict)

    return jsonify(all_stations)


@app.route("/api/v1.0/tobs")
def temperature():
    """Return a JSON list of Temperature Observations (tobs) for the previous year"""
    results = results = session.query(Measurement.date, Measurement.station, Measurement.tobs).\
    filter(Measurement.date > "2016-08-22")
    
       
    # Create a dictionary from the row data and append to a list of station_temps
    station_temps = []
    for Measurement.date, Measurement.station, Measurement.tobs in results:
        temp_dict = {}
        temp_dict["date"] = Measurement.date
        temp_dict["station"] = Measurement.station
        temp_dict["temp"] = Measurement.tobs
        station_temps.append(temp_dict)



    #return jsonify(station_temps)
    return jsonify(station_temps)

@app.route("/api/v1.0/<start>")
def temp_start(start):
    """When given the start only, calculate `TMIN`, `TAVG`, and `TMAX` 
    for all dates greater than and equal to the start date."""

    #start_string = dt.strptime(start,'%Y-%m-%d' )

    trip_start_data = calc_temps_start(start)
    trip_start_list = trip_start_data[0]
    temp_min = trip_start_list[0]
    temp_avg = trip_start_list[1]
    temp_max = trip_start_list[2]
    temp_dict = dict({'Min': temp_min, 'Avg': temp_avg, 'Max': temp_max }, index=[0])
    
    #return jsonify(temp_dict)
    return jsonify(temp_dict)

def calc_temps_start(start_date):
      
    return session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
        filter(Measurement.date >= start_date).all()

@app.route("/api/v1.0/<start>/<end>")
def temp_start_end(start, end):
    """When given the start only, calculate `TMIN`, `TAVG`, and `TMAX` 
    for all dates greater than and equal to the start date."""

    #start_string = dt.strptime(start,'%Y-%m-%d' )
    start_end_temps = []
    trip_start_end_data = calc_temps_start_end(start, end)
    trip_start_end_list = trip_start_end_data[0]
    temp_min = trip_start_end_list[0]
    temp_avg = trip_start_end_list[1]
    temp_max = trip_start_end_list[2]
    temp_dict = dict({'Min': temp_min, 'Avg': temp_avg, 'Max': temp_max }, index=[0])
    start_end_temps.append(dict(temp_dict))
    
    #return jsonify(temp_dict)
    return jsonify(temp_dict)

def calc_temps_start_end(start_date, end_date):
      
    return session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
        filter(Measurement.date >= start_date).filter(Measurement.date <= end_date).all()




if __name__ == '__main__':
    app.run(debug=True)
