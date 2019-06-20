FROM python:3.6

# Coping source in current directory into the image
# python:3-onbuild expects the source in /usr/src/app
WORKDIR /usr/src/api
COPY . /usr/src/api
RUN pip install -r requirements.txt
EXPOSE 5000
ENV FLASK_APP=app.py
ENV DATABASE_URL='mysql+pymysql://user:password@mysql:3306/amicsartromanic'

CMD flask run --host=0.0.0.0
