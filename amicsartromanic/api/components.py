from flask import jsonify

def hello_world(component):
    # do something
 #   resp = flask.Response("Foo bar baz")
 #   resp.headers['Content-Type'] = 'application/json'
    component_name = component.get("component_name", None)
    component_tag = component.get("component_tag", None)
    component_base_path = component.get("component_base_path", None)
    component_scss_path = component.get("component_scss_path", None)
    component_js_path = component.get("component_js_path", None)
    component_template_path = component.get("component_template_path", None)
    return jsonify(component), 200