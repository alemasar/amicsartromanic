FROM python:3.6

# Coping source in current directory into the image
# python:3-onbuild expects the source in /usr/src/app
WORKDIR /usr/src/backend-api
COPY . /usr/src/backend-api
RUN ls -la
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["python", "api.py"]
