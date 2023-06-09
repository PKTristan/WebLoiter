from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import re


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    display_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255), default='https://i.imgur.com/PdTFRoE.jpg', nullable=True)
    bio = db.Column(db.String(1000), nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    servers = db.relationship('Server', back_populates='owner')
    s_memberships = db.relationship('ServerMembers', back_populates='user')
    c_memberships = db.relationship('ChannelMembers', back_populates='user')

    @db.validates('email')
    def validate_email(self, key, email):
        if not validate_email_format(email):
            raise AssertionError('Invalid email format')
        return email

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'display_name': self.display_name,
            'profile_pic': self.profile_pic,
            'bio': self.bio
        }



def validate_email_format(email) -> bool:
    email_pattern = re.compile(r'^[\w\.-]+@[\w\.-]+\.\w+$')
    return bool(email_pattern.match(email))
