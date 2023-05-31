from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .server import Server


class ServerMembers(db.Model):
    __tablename__ = 'servermembers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')))

    server = db.relationship('Server', back_populates='members')
    user = db.relationship('User', back_populates='s_memberships')

    def to_dict(self):
        return {
            'id': self.id,
            'member_id': self.member_id,
            'server_id': self.server_id
        }
