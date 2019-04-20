from app import db

class Component(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    component_name = db.Column(db.String(64), index=True, unique=True)
    component_base_path = db.Column(db.String(120), index=True, unique=True)
    component_scss_path = db.Column(db.String(128))
    component_js_path = db.Column(db.String(128))
    component_template_path = db.Column(db.String(128))

    def __repr__(self):
        return '<Component {}>'.format(self.component_name)