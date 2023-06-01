from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
import re

class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_name = db.Column(db.String, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), name='fk_server_owner_id', ondelete='CASCADE'))
    server_type = db.Column(db.String, nullable=False)
    avatar = db.Column(db.String, nullable=True, default='https://i.imgur.com/YnEnRlg.jpg')
    server_details = db.Column(db.String(100), nullable=True)
    private = db.Column(db.Boolean, nullable=True, default=False)
    direct_message = db.Column(db.Boolean, nullable=True, default=False)

    owner = db.relationship('User', back_populates='servers')
    members = db.relationship('ServerMembers', back_populates='server')

    @db.validates('avatar')
    def validate_avatar(self, key, avatar):
        if not validate_url_format(avatar):
            raise AssertionError('Invalid URL format for avatar')
        return avatar

    def to_dict(self):
        return {
            'id': self.id,
            'server_name': self.server_name,
            'owner_id': self.owner_id,
            'server_type': self.server_type,
            'avatar': self.avatar,
            'server_details': self.server_details,
            'private': self.private,
            'direct_message': self.direct_message
        }


def validate_url_format(url) -> bool:
    url_pattern = re.compile(r'^https?://[\w\-]+(\.[\w\-]+){1,2}\.[\w\-]{2,3}[/#?]?.*$')
    return bool(url_pattern.match(url))
