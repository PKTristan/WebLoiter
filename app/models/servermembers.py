from .db import db, environment, SCHEMA


class ServerMembers(db.Model):
    __tablename__ = 'servermembers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'))

    server = db.relationship('Server', backref='servermembers')
    user = db.relationship('User', backref='servermembers')

    def to_dict(self):
        return {
            'id': self.id,
            'member_id': self.member_id,
            'server_id': self.server_id
        }
