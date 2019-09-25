import os

from splinter import Browser
from bs4 import BeautifulSoup as bs
import pandas as pd
from flask import Flask, jsonify, render_template

app = Flask(__name__)

def init_browser():
    # Path to the chromedriver
    executable_path = {"executable_path": "chromedriver.exe"}
    return Browser("chrome", **executable_path, headless=False)

# scraping the list of United Airlines Major Hubs from:
# "https://ellowe.github.io/united_hubs.html"

def scrape_hubs():
    browser = init_browser()

    url = "https://ellowe.github.io/united_hubs.html"
    browser.visit(url)

    # Scrape page into Soup
    html = browser.html
    soup = bs(html, "html.parser")

    # Get the airports text

    airports = soup.select('ul li')

    IATA_codes=[]
    browser.quit()

    for hub in airports:
        hub = hub.text
        IATA_NS = float(hub.split(",")[0])
        IATA_EW = float(hub.split(",")[1])
        IATA_name = hub.split(",")[2]
        city = hub.split(",")[3]
        IATA = [IATA_NS,IATA_EW,IATA_name,city]
        IATA_codes.append(IATA)
    
    return IATA_codes

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/coordinates")
def coordinates():
    IATA_codes = scrape_hubs()
    """Return coordinates jsonified as a route for an app.js to grab."""

    # Format the data to send as json
    data = {
        "coordinates": IATA_codes
    }
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)