from .db import db, enviroment, SCHEMA


class ServerMembers(db.Model):
    __tablename__ = 'servermembers'

    if enviroment == "production":
        __table_args__ = {'schema': SCHEMA}

    member_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.users.id'), primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.servers.id'), primary_key=True)

    users = db.relationship('User', back_populates='servermembers')
    server = db.relationship('Server', back_populates='members')