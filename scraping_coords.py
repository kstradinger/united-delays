import time
from splinter import Browser
from bs4 import BeautifulSoup as bs
from selenium import webdriver
import pandas as pd
import scraping_hubs

def test():
    IATA_codes = scraping_hubs.scrape_hubs()
    # IATA_coordinates = []

    # # define the chromedriver path
    # executable_path = {"executable_path": "chromedriver.exe"}
    # # set options on browser for no notifications
    # options = webdriver.ChromeOptions()
    # options.add_argument("--disable-notifications")
    # # create a new broswer object
    # browser = Browser("chrome", **executable_path, headless=False, options = options)

    # for hub in IATA_codes:
        
    #     locations_url = "https://www.latlong.net/"
    #     browser.visit(locations_url)
    #     # find textbox to fill (you can also search for it with .find_by_id())
    #     # inputbox = browser.find_by_name('place')
    #     # print(inputbox)
    #     # fill in the textbox
    #     browser.fill(hub)
    #     # click
    #     browser.find_by_id('btnfind').first.click()
    #     coords_html = browser.html
    #     coords_soup = bs(coords_html, "html.parser")

        
        
    #     coordinates = soup.find('span', class_="coordinatetxt")
    #     IATA_coordinates.append(coordinates.text)

    # browser.quit()

    IATA_coordinates = []
    executable_path = {"executable_path": "chromedriver.exe"}
    browser = Browser("chrome", **executable_path, headless=False)

    for hub in IATA_codes:
        locations_url = "https://www.google.com/maps"
        browser.visit(locations_url)
        time.sleep(10)
        # with open("test_html.txt", "w") as text_file:
        #     text_file.write(browser.html)
        # test_id = browser.find_by_id('searchboxinput')
        # print(test_id)
        browser.fill('q', hub)
        # browser.has_class('.searchbox-searchbutton').first.click()
        # browser.click_link_by_id('searchbox-searchbutton')
        browser.find_by_id('searchbox-searchbutton').first.click()
        coords_html = str(browser.html).split("@",2)[1]
        coordinates = coords_html.split(",17z/",2)[0]
        IATA_coordinates.append(coordinates)
        
    browser.quit()

test()