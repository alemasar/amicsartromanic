from flask import jsonify
from app import db_session
import orm
import logging
import json
from collections import namedtuple


def hello_world(component):
  
  logging.info('Creating component %s..', component)
  newComponent = orm.Component(component_name = component.get("component_name"), component_base_path = component.get("component_base_path"), component_scss_path = component.get("component_scss_path"), component_js_path = component.get("component_js_path"), component_template_path = component.get("component_template_path"))

  db_session.add(newComponent)
  db_session.commit()

  return jsonify(component), 200