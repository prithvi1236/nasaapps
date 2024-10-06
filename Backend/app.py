import matplotlib
matplotlib.use('Agg')  # Use a non-interactive backend
import matplotlib.pyplot as plt

from flask import Flask, request, jsonify, render_template, send_file
import pandas as pd
from io import BytesIO
app = Flask(__name__)

# Load the dataset
file_path = 'dataset_nasa.xlsx'
dfs = pd.read_excel(file_path, sheet_name=None)

# Access each DataFrame by its sheet name
df1 = dfs['CO Population-Weighted (ppm)']
df2 = dfs['VOCs Population-Weighted (ppm)']
df3 = dfs['SO2 Population-Weighted (ppm)']

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/country', methods=['POST'])
def country():
    country = request.form.get('country').lower()  # Get country from form, convert to lowercase
    matched_countries = df1['country'].str.lower().str.startswith(country)  # Match with lowercase countries
    result = df1[matched_countries]['country'].unique()  # Get unique matched countries
    # list(result)[:6]
    return jsonify(["India"])  # Return maximum 6 matches as JSON


@app.route('/co2_plot', methods=['POST'])
def plot_graph():
    country = request.form.get('country')

    if country not in df1['country'].values:
        return jsonify({"error": "Country not found in the dataset"}), 404
    
    # Filter the row for the inputted country
    country_data = df1[df1['country'] == country].iloc[0, 1:]  # Exclude the country column
    
    # Convert the index (years) to strings
    years = country_data.index.astype(str)
    
    # Convert the data values to float, ensuring correct numeric format
    values = country_data.values.astype(float)
    
    # Plotting
    plt.figure(figsize=(10, 6))
    plt.plot(years, values, marker='o', linestyle='-', color='b')
    plt.title(f'Data for {country}', fontsize=16)
    plt.xlabel('Year')
    plt.ylabel('Values')
    plt.grid(True)
    
    # Save plot to a BytesIO object
    img = BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()
    
    # Insights (Example: provide some basic description of the data)
    insights = {
        "Country": country,
        "Years Covered": list(years),
        "Max Value": values.max(),
        "Min Value": values.min(),
        "Average Value": values.mean()
    }

    # Return both the plot image and insights as JSON
    return jsonify({
        "image": "/carbon_image?country=" + country,
        "insights": insights
    })

@app.route('/co2_img')
def return_img():
    country = request.form.get('country')
    if country not in df1['country'].values:
        return jsonify({"error": "Country not found in the dataset"}), 404
    
    country_data = df1[df1['country'] == country].iloc[0, 1:]
    years = country_data.index.astype(str)  # Convert years to strings
    values = country_data.values.astype(float)  # Ensure values are float

    # Plotting
    plt.figure(figsize=(10, 6))
    plt.plot(years, values, marker='o', linestyle='-', color='b')
    plt.title(f'Data for {country}', fontsize=16)
    plt.xlabel('Year')
    plt.ylabel('Values')
    plt.grid(True)

    img = BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()

    return send_file(img, mimetype='image/png')

@app.route('/voc_plot', methods=['POST'])
def voc_plot():
    country = request.form.get('country')

    if country not in df2['country'].values:
        return jsonify({"error": "Country not found in the dataset"}), 404
    
    # Filter the row for the inputted country
    country_data = df1[df1['country'] == country].iloc[0, 1:]  # Exclude the country column
    
    # Convert the index (years) to strings
    years = country_data.index.astype(str)
    
    # Convert the data values to float, ensuring correct numeric format
    values = country_data.values.astype(float)
    
    # Plotting
    plt.figure(figsize=(10, 6))
    plt.plot(years, values, marker='o', linestyle='-', color='b')
    plt.title(f'Data for {country}', fontsize=16)
    plt.xlabel('Year')
    plt.ylabel('VOC Population-Weighted (ppm)')
    plt.grid(True)
    
    # Save plot to a BytesIO object
    img = BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()
    
    # Insights (Example: provide some basic description of the data)
    insights = {
        "Country": country,
        "Years Covered": list(years),
        "Max Value": values.max(),
        "Min Value": values.min(),
        "Average Value": values.mean()
    }

    # Return both the plot image and insights as JSON
    return jsonify({
        "image": "/voc_img?country=" + country,
        "insights": insights
    })

@app.route('/voc_img')
def voc_img():
    country = request.form.get('country')
    if country not in df2['country'].values:
        return jsonify({"error": "Country not found in the dataset"}), 404
    
    country_data = df1[df1['country'] == country].iloc[0, 1:]
    years = country_data.index.astype(str)  # Convert years to strings
    values = country_data.values.astype(float)  # Ensure values are float

    # Plotting
    plt.figure(figsize=(8, 5))
    plt.plot(years, values, marker='o', linestyle='-', color='b')
    plt.title(f'Data for {country}', fontsize=16)
    plt.xlabel('Year')
    plt.ylabel('VOC Population-Weighted (ppm)')
    plt.grid(True)

    img = BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()

    return send_file(img, mimetype='image/png')

@app.route('/so2_plot', methods=['POST'])
def so2_plot():
    country = request.form.get('country')

    if country not in df3['country'].values:
        return jsonify({"error": "Country not found in the dataset"}), 404
    
    # Filter the row for the inputted country
    country_data = df1[df1['country'] == country].iloc[0, 1:]  # Exclude the country column
    
    # Convert the index (years) to strings
    years = country_data.index.astype(str)
    
    # Convert the data values to float, ensuring correct numeric format
    values = country_data.values.astype(float)
    
    # Plotting
    plt.figure(figsize=(10, 6))
    plt.plot(years, values, marker='o', linestyle='-', color='b')
    plt.title(f'Data for {country}', fontsize=16)
    plt.xlabel('Year')
    plt.ylabel('SO2 Population-Weighted (ppm)')
    plt.grid(True)
    
    # Save plot to a BytesIO object
    img = BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()
    
    # Insights (Example: provide some basic description of the data)
    insights = {
        "Country": country,
        "Years Covered": list(years),
        "Max Value": values.max(),
        "Min Value": values.min(),
        "Average Value": values.mean()
    }

    # Return both the plot image and insights as JSON
    return jsonify({
        "image": "/so2_img?country=" + country,
        "insights": insights
    })

@app.route('/so2_img')
def so2_img():
    country = request.form.get('country')
    if country not in df3['country'].values:
        return jsonify({"error": "Country not found in the dataset"}), 404
    
    country_data = df1[df1['country'] == country].iloc[0, 1:]
    years = country_data.index.astype(str)  # Convert years to strings
    values = country_data.values.astype(float)  # Ensure values are float

    # Plotting
    plt.figure(figsize=(10, 6))
    plt.plot(years, values, marker='o', linestyle='-', color='b')
    plt.title(f'Data for {country}', fontsize=16)
    plt.xlabel('Year')
    plt.ylabel('SO2 Population-Weighted (ppm)')
    plt.grid(True)

    img = BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()

    return send_file(img, mimetype='image/png')

if __name__ == '_main_':
    app.run(debug=True,threaded=False)