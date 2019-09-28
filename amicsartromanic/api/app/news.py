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

def addNew(new=None):

#  newsImage = list()
#  for image in new.get('news_image'):
#    logging.info("FILES: %s" % image.get("images_path"))
#    tempImage = orm.Images(image_path = image.get("images_path"), image_footer = image.get("images_footer"))
#    newsImage.append(tempImage)
#news_image = newsImage

  newNew = orm.News(news_summary = new.get('news_summary'), news_body = new.get('news_body'))

  logging.info("FILES: %s" % newNew)
  #db_session.add_all(newsImage)
  db_session.add(newNew)
  db_session.commit()

  return jsonify(news_summary = new.get('news_summary'), news_body = new.get('news_body')), 200

def addImage():
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

  file = connexion.request.files['image']
  logging.info("FILES: %s" % connexion.request.files)
  filename = os.path.join(images_path, secure_filename(file.filename))
  file.save(filename)
  logging.info(filename)
 # newsImage = orm.Images(image_path = secure_filename(file.filename), image_footer = "Image footer")
 # newImage = orm.Images(image_path = secure_filename(file.filename), image_footer = "Image footer")
 # logging.info("FILES: %s" % newsImage)
#
#  db_session.add(newsImage)
#  db_session.add(newsImage)
#  db_session.commit()

  return jsonify(image_path = secure_filename(file.filename)), 200
  #return "HOLA", 200