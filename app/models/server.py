from .db import db, environment, SCHEMA
import re

class Server(db.model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    server_name = db.Column(db.String, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        f'{SCHEMA}.users.id'
    ))
    owner = db.relationship('User', back_populates='servers')
    type = db.Column(db.String, nullable=False)
    avatar = db.Column(db.String, nullable=True, default='https://i.imgur.com/YnEnRlg.jpg')
    server_details = db.Column(db.String(100), nullable=True)
    private = db.Column(db.Boolean, nullable=True, default=False)
    direct_message = db.Column(db.Boolean, nullable=True, default=False)


    @db.validates('avatar')
    def validate_avatar(self, key, avatar):
        if not validate_url_format(avatar):
            raise AssertionError('Invalid URL format for avatar')
        return avatar


def validate_url_format(url) -> bool:
    url_pattern = re.compile(r'^https?://[\w\-]+(\.[\w\-]+){1,2}\.[\w\-]{2,3}[/#?]?.*$')
    return bool(url_pattern.match(url))