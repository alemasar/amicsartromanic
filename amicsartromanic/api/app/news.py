from flask import jsonify
from app import db_session, app
import orm
import logging
import json
from collections import namedtuple
import connexion
import os
from werkzeug.utils import secure_filename
from PIL import Image

def addNew(news_summary, news_body, news_image):
  path = os.getcwd()  

  images_path = os.path.join(path, app.app.config['UPLOAD_FOLDER'])
  logging.info("The current working directory is %s" % images_path)
  access_rights = 0o755
  if not os.path.exists(images_path):
    try:
        os.mkdir(images_path, access_rights)
    except OSError:  
        logging.info("Creation of the directory %s failed" % images_path)
    else:  
        logging.info("Successfully created the directory %s" % images_path)

  file = connexion.request.files['news_image']
  filename = os.path.join(images_path, secure_filename(file.filename))
  file.save(filename)
  logging.info(filename)
  newsImage = orm.Images(image_path = secure_filename(file.filename), image_footer = "Image footer")
  newNew = orm.News(news_summary = connexion.request.form['news_summary'], news_body = connexion.request.form['news_body'], news_image = [newsImage])

  db_session.add(newsImage)
  db_session.add(newNew)
  db_session.commit()

  return jsonify(news_summary = connexion.request.form['news_summary'], news_body = connexion.request.form['news_body'], news_image = secure_filename(file.filename)), 200