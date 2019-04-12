# https://hub.docker.com/r/library/python/tags/
FROM python:3-onbuild  

# Coping source in current directory into the image
# python:3-onbuild expects the source in /usr/src/app
COPY . /usr/src/backend-api
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["python", "api.py"]


# Commands in a list
#CMD ["python", "api.py"]