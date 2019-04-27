FROM mysql:5.7

WORKDIR /var/lib/mysql

COPY ./amicsartromanic/database/config.cnf /var/lib/mysql/conf.d

ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=amicsartromanic
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password
ENV MYSQL_HOST=localhost
ENV MYSQL_PORT=3306

RUN ls -la /var/lib/mysql

EXPOSE 3306