from flask import jsonify, session, request
from app import db_session
import orm
import logging
import json
from collections import namedtuple



def basic_auth(username, password, required_scopes=None):
  logging.info('username %s..', request.headers.get('Authorization').replace('Basic ', '', 1))
  logging.info('password %s..', password)
  if username == 'alemasar@gmail.com' and password == 'Meridiana_123':
    logging.info('Super admin')
    session['TOKEN'] = request.headers.get('Authorization').replace('Basic ', '', 1)
    return {'sub': 'superadmin'}
  return None

def getToken():
  logging.info('Get token %s..', session)
  return jsonify({'token': session.get('TOKEN')}), 200

def getRole():
  logging.info('Get role %s..', session)
  return jsonify({'role': session.get('ROLE')}), 200

def login(user):

  logging.info('Logging user %s..', user)
  #newComponent = orm.Component(component_name = component.get("component_name"), component_base_path = component.get("component_base_path"), component_scss_path = component.get("component_scss_path"), component_js_path = component.get("component_js_path"), component_template_path = component.get("component_template_path"))

  #db_session.add(newComponent)
  #db_session.commit()
  session['ROLE'] = user
  #session.modified = True
  logging.info('Get role %s..', session)
  return jsonify({'role': user}), 200

def hello_world(component):
  
  logging.info('Creating component %s..', component)
  newComponent = orm.Component(component_name = component.get("component_name"), component_base_path = component.get("component_base_path"), component_scss_path = component.get("component_scss_path"), component_js_path = component.get("component_js_path"), component_template_path = component.get("component_template_path"))

  db_session.add(newComponent)
  db_session.commit()

  return jsonify(component), 200