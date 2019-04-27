from flask import jsonify
from app import db_session
import orm
import logging
import json
from collections import namedtuple

class Struct:
    def __init__(self, **entries):
        self.__dict__.update(entries)

def hello_world(component):
  #from app import db
  #c = db_session.query(orm.Component)
  
  logging.info('Creating component %s..', component)
  #c = json.loads(json_data)
  newComponent = orm.Component(component_name = component.get("component_name"), component_base_path = component.get("component_base_path"), component_scss_path = component.get("component_scss_path"), component_js_path = component.get("component_js_path"), component_template_path = component.get("component_template_path"))

  db_session.add(newComponent)
  db_session.commit()

  #insert_element(component)
  return jsonify(component), 200