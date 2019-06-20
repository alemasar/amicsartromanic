from flask import Flask
from config import Config
import connexion
from flask_cors import CORS
import orm
import logging

#import sys

#sys.path.append(r'C:\Users\john')
db_session = None

logging.basicConfig(level=logging.INFO)
db_session = orm.init_db(Config.SQLALCHEMY_DATABASE_URI)
app = connexion.App(__name__, specification_dir='swagger/', debug=True)
app.add_api('my_super_app.yaml')
# set the WSGI application callable to allow using uWSGI:
# uwsgi --http :8080 -w app
application = app.app
application.config['UPLOAD_FOLDER'] = Config.NEWS_IMAGE_UPLOAD_FOLDER
CORS(application)

@application.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


#g.db = db
   # return g.db

app.run(port=5000)
