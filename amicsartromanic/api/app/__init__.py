from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
import connexion
import components
from flask_cors import CORS


app = connexion.App(__name__, specification_dir='swagger/', debug=True)
CORS(app.app)
app.add_api('my_super_app.yaml')
db = SQLAlchemy(app.app)

from app import models
app.app.config.from_object(Config)
db.create_all()
db.session.commit()

app.run(port=5000)