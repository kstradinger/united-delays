from splinter import Browser
from bs4 import BeautifulSoup as bs
import pandas as pd

def init_browser():
    # Path to the chromedriver
    executable_path = {"executable_path": "chromedriver.exe"}
    return Browser("chrome", **executable_path, headless=False)

# scraping the list of United Airlines Major Hubs from:
# https://www.united.com/ual/en/us/fly/travel/airport/maps.html

def scrape_hubs():
    browser = init_browser()

    url = "https://www.united.com/ual/en/us/fly/travel/airport/maps.html"
    browser.visit(url)

    # Scrape page into Soup
    html = browser.html
    soup = bs(html, "html.parser")

    browser.quit()

    # Get the airports text

    airports = soup.select('div.region-main ul:nth-of-type(1) li a')

    IATA_codes=[]

    for hub in airports:
        hub = hub.text
        IATA = hub.split("(",2)[1]
        IATA = IATA[:-1]
        IATA_codes.append(IATA)
    
    return IATA_codes