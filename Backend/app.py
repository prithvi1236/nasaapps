import matplotlib
matplotlib.use('Agg')  # Use a non-interactive backend
import matplotlib.pyplot as plt

from flask import Flask, request, jsonify, render_template, send_file
import pandas as pd
from flask_cors import CORS
from io import BytesIO

app = Flask(__name__)
CORS(app)

# Load the dataset
file_path = 'dataset_nasa.xlsx'
dfs = pd.read_excel(file_path, sheet_name=None)

# Access each DataFrame by its sheet name
df1 = dfs['CO Population-Weighted (ppm)']
df2 = dfs['VOCs Population-Weighted (ppm)']
df3 = dfs['SO2 Population-Weighted (ppm)']

def get_gas_data(country):
    """Helper function to extract gas data for a country"""
    if country not in df1['country'].values:
        return None
    co_data = df1[df1['country'] == country].iloc[0, 1:].to_dict()
    voc_data = df2[df2['country'] == country].iloc[0, 1:].to_dict()
    so2_data = df3[df3['country'] == country].iloc[0, 1:].to_dict()
    return {
        "country": country,
        "co_data": co_data,
        "voc_data": voc_data,
        "so2_data": so2_data
    }

def calculate_avg_gas_for_country(country):
    """Helper function to calculate average gas data for a specific country"""
    co_avg = df1[df1['country'] == country].iloc[:, 1:].mean(axis=1).values[0]
    voc_avg = df2[df2['country'] == country].iloc[:, 1:].mean(axis=1).values[0]
    so2_avg = df3[df3['country'] == country].iloc[:, 1:].mean(axis=1).values[0]
    return {
        "country": country,
        "co_avg": co_avg,
        "voc_avg": voc_avg,
        "so2_avg": so2_avg
    }

def calculate_world_avg_gas():
    """Helper function to calculate the world average gas data"""
    co_world_avg = df1.iloc[:, 1:].mean().mean()
    voc_world_avg = df2.iloc[:, 1:].mean().mean()
    so2_world_avg = df3.iloc[:, 1:].mean().mean()
    return {
        "world_co_avg": co_world_avg,
        "world_voc_avg": voc_world_avg,
        "world_so2_avg": so2_world_avg
    }

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/countries', methods=['GET'])
def countries():
    try:
        query = request.form.get('query', '').lower()  # Get the user input (query)
        if not query:
            return jsonify({"data": []})  # Return an empty list if no query is provided

        # Filter country names based on the user query (case-insensitive)
        countries = df1['country'].dropna()  # Keep original case
        filtered_countries = countries[countries.str.lower().str.startswith(query)].tolist()

        # Return the first 5 results
        return jsonify({"data": filtered_countries[:5]})
    except Exception as e:
        print(e)
        return jsonify({"error": "Invalid request"}), 400

@app.route('/gases_data', methods=['GET'])
def gases_data():
    country = request.form.get('country')
    gas_data = get_gas_data(country)
    if gas_data:
        return jsonify(gas_data)
    else:
        return jsonify({"error": "Country not found"}), 404

@app.route('/average_gases', methods=['GET'])
def average_gases():
    country = request.form.get('country')
    if not country:
        return jsonify({"error": "Country not provided"}), 400

    avg_data = calculate_avg_gas_for_country(country)
    if avg_data:
        return jsonify(avg_data)
    else:
        return jsonify({"error": "Country not found"}), 404

@app.route('/compare_2countries', methods=['GET'])
def compare_2countries():
    country1 = request.form.get('country1')
    country2 = request.form.get('country2')

    data_country1 = get_gas_data(country1)
    data_country2 = get_gas_data(country2)

    if not data_country1 or not data_country2:
        return jsonify({"error": "One or both countries not found"}), 404

    result = {
        "country1_data": data_country1,
        "country2_data": data_country2
    }
    return jsonify(result)

@app.route('/country_vs_world', methods=['GET'])
def country_vs_world():
    country = request.form.get('country')
    if not country:
        return jsonify({"error": "Country not provided"}), 400

    country_avg_data = calculate_avg_gas_for_country(country)
    if not country_avg_data:
        return jsonify({"error": "Country not found"}), 404

    world_avg_data = calculate_world_avg_gas()

    result = {
        "country_avg_data": country_avg_data,
        "world_avg_data": world_avg_data
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, threaded=False)
