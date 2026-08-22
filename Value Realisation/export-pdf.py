"""Export vro-whitepaper.html to A4 PDF.

print_background is load-bearing: without it the accent rules, callout borders
and the chassis diagram's wash all come out white. Zero margins here because the
stylesheet already owns the 18mm/16mm gutter via @page.
"""
import os, sys
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "vro-whitepaper.html")
OUT = os.path.join(HERE, "value-realisation-office-v1.0.pdf")

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    pg.goto("file:///" + SRC.replace("\\", "/"), wait_until="networkidle")
    pg.emulate_media(media="print")
    pg.pdf(path=OUT, format="A4", print_background=True,
           margin={"top": "0", "right": "0", "bottom": "0", "left": "0"})
    b.close()

print("wrote", OUT, os.path.getsize(OUT), "bytes")
