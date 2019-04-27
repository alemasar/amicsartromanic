from sqlalchemy import create_engine, Column, DateTime, String, Integer
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

class Component(Base):
    __tablename__ = 'components'
    id = Column(Integer, primary_key=True)
    component_name = Column(String(64), index=True, unique=True)
    component_base_path = Column(String(120), index=True, unique=True)
    component_scss_path = Column(String(128))
    component_js_path = Column(String(128))
    component_template_path = Column(String(128))
    
    def update(self, id=None, component_name=None, component_base_path=None, component_scss_path=None, component_js_path=None, component_template_path=None):
        if component_name is not None:
            self.component_name = component_name
        if component_base_path is not None:
            self.component_base_path = component_base_path
#        if tags is not None:
#            self.tags = tags
        if component_scss_path is not None:
            self.component_scss_path = component_scss_path
        if component_js_path is not None:
            self.component_js_path = component_js_path
        if component_template_path is not None:
            self.component_template_path = component_template_path
                    
    def dump(self):
        return dict([(k,v) for k,v in self.__dict__.items() if k[0] != '_'])


def init_db(uri):
    engine = create_engine(uri, convert_unicode=True)
    db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False,
                                             bind=engine))
    Base.query = db_session.query_property()
    Base.metadata.create_all(bind=engine)
    return db_session