from .db import db, enviroment, SCHEMA


class ServerMembers(db.Model):
    __tablename__ = 'servermembers'

    if enviroment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.users.id'))
    server_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.servers.id'))

    users = db.relationship('User', back_populates='servermembers')
    server = db.relationship('Server', back_populates='members')

    def to_dict(self):
        return {
            'id': self.id,
            'member_id': self.member_id,
            'server_id': self.server_id
        }
