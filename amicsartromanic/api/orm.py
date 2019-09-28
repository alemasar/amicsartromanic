from sqlalchemy import create_engine, Column, DateTime, String, Integer, Table, ForeignKey
from sqlalchemy.orm import scoped_session, sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from werkzeug.security import generate_password_hash, check_password_hash

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
        if component_scss_path is not None:
            self.component_scss_path = component_scss_path
        if component_js_path is not None:
            self.component_js_path = component_js_path
        if component_template_path is not None:
            self.component_template_path = component_template_path
                    
    def dump(self):
        return dict([(k,v) for k,v in self.__dict__.items() if k[0] != '_'])

images_news_association = Table('news_images', Base.metadata,
    Column('news_id', Integer, ForeignKey('news.id')),
    Column('images_id', Integer, ForeignKey('images.id'))
)

class News(Base):
    __tablename__ = 'news'
    id = Column(Integer, primary_key=True)
    news_summary = Column(String(128))
    news_body = Column(String(128))
    news_image = relationship("Images", secondary=images_news_association)
    
    def update(self, id=None, news_summary=None, news_body=None, news_image=None):
        if news_summary is not None:
            self.news_summary = news_summary
        if news_body is not None:
            self.news_body = news_body
        if news_image is not None:
            self.news_image = news_image
                    
    def dump(self):
        return dict([(k,v) for k,v in self.__dict__.items() if k[0] != '_'])

class Images(Base):
    __tablename__ = 'images'
    id = Column(Integer, primary_key=True)
    image_path = Column(String(128))
    image_footer = Column(String(128))
   
    def update(self, id=None, image_path=None, image_footer=None):
        if image_path is not None:
            self.image_path = image_path
        if image_footer is not None:
            self.image_footer = image_footer
                    
    def dump(self):
        return dict([(k,v) for k,v in self.__dict__.items() if k[0] != '_'])

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    users_email = Column(String(255))
    users_password = Column(String(128))
    users_name = Column(String(255))
    users_surname = Column(String(255))
    users_role = Column(String(128))
    #below our user model, we will create our hashing functions

    def set_password(self, password):
        self.users_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.users_password, password) 
  
    def update(self, id=None, users_email=None, users_password=None, users_name=None, users_role=None):
        if users_email is not None:
            self.users_email = users_email
        if users_password is not None:
            self.users_password = self.set_password(self, users_password)
        if users_name is not None:
            self.users_name = users_name
        if users_surname is not None:
            self.users_surname = users_surname
        if users_role is not None:
            self.users_role = users_role
                    
    def dump(self):
        return dict([(k,v) for k,v in self.__dict__.items() if k[0] != '_'])

def init_db(uri):
    engine = create_engine(uri, convert_unicode=True)
    db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False,
                                             bind=engine))
    Base.query = db_session.query_property()
    Base.metadata.create_all(bind=engine)
    return db_session