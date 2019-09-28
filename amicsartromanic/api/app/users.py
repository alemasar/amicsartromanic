from flask import jsonify, request
from app import db_session, app
import orm
import logging
import json

def addUser():
  logging.info("FILES: %s" % request.json.get('users_email'))
  user = request.json;
  newUser = orm.User(users_email = user.get('users_email'), users_password = user.get('users_password'), users_name = user.get('users_name'), users_surname = user.get('users_surname'), users_role = user.get('users_role'))
  
  #db_session.add_all(newsImage)
  db_session.add(newUser)
  db_session.commit()

  return jsonify(users_email = user.get('users_email'), users_password = user.get('users_password'), users_name = user.get('users_name'), users_surname = user.get('users_surname'), users_role = user.get('users_role')), 200