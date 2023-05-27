from .db import db, enviroment, SCHEMA
import re


class Server(db.Model): 
    __tablename__ = 'servers'

    if enviroment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_name = db.Column(db.String(25), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.users.id'))
    type = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.String(255), nullable=True, default="https://i.imgur.com/YnEnRlg.jpg")
    server_details = db.Column(db.String(255), nullable=True)
    private = db.Column(db.Boolean, nullable=True, default=False)
    direct_message = db.Column(db.Boolean, nullable=True, default=False)

    @db.validates('avatar')
    def validate_avatar(self, key, avatar):
        if not validate_url_format(avatar):
            raise AssertionError(f'{avatar} is not a valid url')
        return avatar
    



    owner = db.relationship('User', back_populates='servers')


def validate_url_format(url) -> bool:
    url_pattern = re.compile(r'^https?://[\w\-]+(\.[\w\-]+)+[/#?]?.*$')
    return bool(url_pattern.match(url))